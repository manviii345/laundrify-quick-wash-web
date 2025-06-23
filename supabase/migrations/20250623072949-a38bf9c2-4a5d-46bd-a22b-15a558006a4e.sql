
-- Create enum types for the new system
CREATE TYPE public.user_role AS ENUM ('admin', 'staff', 'customer');
CREATE TYPE public.pickup_type AS ENUM ('self_drop', 'pickup');
CREATE TYPE public.wash_type AS ENUM ('normal', 'stain_warm');
CREATE TYPE public.order_status AS ENUM ('pending', 'picked_up', 'washing', 'drying', 'completed', 'delivered');
CREATE TYPE public.batch_status AS ENUM ('created', 'washing', 'drying', 'completed');

-- Update profiles table to include role and phone verification
ALTER TABLE public.profiles ADD COLUMN role user_role DEFAULT 'customer';
ALTER TABLE public.profiles ADD COLUMN phone_verified BOOLEAN DEFAULT FALSE;

-- Create laundry_orders table (replacing bookings for the new system)
CREATE TABLE public.laundry_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  laundry_id TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wash_type wash_type NOT NULL DEFAULT 'normal',
  pickup_type pickup_type NOT NULL,
  status order_status DEFAULT 'pending',
  qr_code TEXT UNIQUE,
  pickup_address TEXT,
  special_instructions TEXT,
  feedback TEXT,
  sticky_note TEXT,
  batch_id UUID,
  estimated_cost DECIMAL(10,2),
  actual_cost DECIMAL(10,2),
  pickup_date TIMESTAMP WITH TIME ZONE,
  washing_started_at TIMESTAMP WITH TIME ZONE,
  drying_started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create batches table for bulk processing
CREATE TABLE public.batches (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  batch_number TEXT UNIQUE NOT NULL,
  wash_type wash_type NOT NULL,
  status batch_status DEFAULT 'created',
  total_orders INTEGER DEFAULT 0,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  washing_started_at TIMESTAMP WITH TIME ZONE,
  drying_started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Add foreign key for batch_id in laundry_orders
ALTER TABLE public.laundry_orders ADD CONSTRAINT fk_batch
  FOREIGN KEY (batch_id) REFERENCES public.batches(id) ON DELETE SET NULL;

-- Create order_status_history for tracking status changes
CREATE TABLE public.order_status_history (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.laundry_orders(id) ON DELETE CASCADE,
  previous_status order_status,
  new_status order_status NOT NULL,
  changed_by UUID NOT NULL REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable RLS on new tables
ALTER TABLE public.laundry_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;

-- RLS policies for laundry_orders
CREATE POLICY "Users can view their own orders" ON public.laundry_orders
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

CREATE POLICY "Staff and admins can update orders" ON public.laundry_orders
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

CREATE POLICY "Customers can create orders" ON public.laundry_orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS policies for batches
CREATE POLICY "Staff and admins can view batches" ON public.batches
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

CREATE POLICY "Staff and admins can create batches" ON public.batches
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

CREATE POLICY "Staff and admins can update batches" ON public.batches
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

-- RLS policies for order_status_history
CREATE POLICY "View order history" ON public.order_status_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.laundry_orders lo 
      WHERE lo.id = order_status_history.order_id 
      AND (lo.user_id = auth.uid() OR 
           EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'staff')))
    )
  );

CREATE POLICY "Staff and admins can create history" ON public.order_status_history
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

-- Function to generate unique laundry ID
CREATE OR REPLACE FUNCTION public.generate_laundry_id()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  laundry_id TEXT;
BEGIN
  laundry_id := 'LND' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 9999)::TEXT, 4, '0');
  RETURN laundry_id;
END;
$$;

-- Function to generate unique batch number
CREATE OR REPLACE FUNCTION public.generate_batch_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  batch_number TEXT;
BEGIN
  batch_number := 'B' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 999)::TEXT, 3, '0');
  RETURN batch_number;
END;
$$;

-- Function to automatically update order status history
CREATE OR REPLACE FUNCTION public.track_order_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.order_status_history (order_id, previous_status, new_status, changed_by)
    VALUES (NEW.id, OLD.status, NEW.status, auth.uid());
  END IF;
  
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create trigger for order status tracking
CREATE TRIGGER track_order_status_changes
  BEFORE UPDATE ON public.laundry_orders
  FOR EACH ROW EXECUTE FUNCTION public.track_order_status_change();

-- Function to update batch order count
CREATE OR REPLACE FUNCTION public.update_batch_order_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.batch_id IS NOT NULL THEN
    UPDATE public.batches 
    SET total_orders = total_orders + 1 
    WHERE id = NEW.batch_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.batch_id IS DISTINCT FROM NEW.batch_id THEN
      IF OLD.batch_id IS NOT NULL THEN
        UPDATE public.batches 
        SET total_orders = total_orders - 1 
        WHERE id = OLD.batch_id;
      END IF;
      IF NEW.batch_id IS NOT NULL THEN
        UPDATE public.batches 
        SET total_orders = total_orders + 1 
        WHERE id = NEW.batch_id;
      END IF;
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.batch_id IS NOT NULL THEN
    UPDATE public.batches 
    SET total_orders = total_orders - 1 
    WHERE id = OLD.batch_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create trigger for batch order count
CREATE TRIGGER update_batch_order_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.laundry_orders
  FOR EACH ROW EXECUTE FUNCTION public.update_batch_order_count();
