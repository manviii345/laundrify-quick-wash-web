
-- Create enum types for better data integrity
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.laundry_type AS ENUM ('quick_wash', 'regular_wash', 'delicate_care', 'dry_cleaning');
CREATE TYPE public.clothing_type AS ENUM ('shirts', 'trousers', 'jeans', 't_shirts', 'dresses', 'skirts', 'jackets', 'underwear', 'socks', 'bedsheets', 'towels', 'others');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  hostel_name TEXT,
  room_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  laundry_type laundry_type NOT NULL,
  pickup_date DATE,
  pickup_time TEXT,
  status booking_status DEFAULT 'pending',
  special_instructions TEXT,
  total_items INTEGER DEFAULT 0,
  estimated_cost DECIMAL(10,2),
  barcode_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create booking_items table for clothing breakdown
CREATE TABLE public.booking_items (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  clothing_type clothing_type NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- Create user activity tracking
CREATE TABLE public.user_activity (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for bookings
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for booking_items
CREATE POLICY "Users can view their booking items" ON public.booking_items
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE bookings.id = booking_items.booking_id 
    AND bookings.user_id = auth.uid()
  ));
CREATE POLICY "Users can create booking items" ON public.booking_items
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE bookings.id = booking_items.booking_id 
    AND bookings.user_id = auth.uid()
  ));

-- Create RLS policies for user_activity
CREATE POLICY "Users can view their own activity" ON public.user_activity
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own activity" ON public.user_activity
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to generate unique barcode
CREATE OR REPLACE FUNCTION public.generate_barcode()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  barcode TEXT;
BEGIN
  barcode := 'LDY' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
  RETURN barcode;
END;
$$;
