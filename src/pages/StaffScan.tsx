
import { useState, useEffect } from 'react';
import { QrCode, Package, CheckCircle, ArrowRight, MessageSquare, StickyNote } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';

const StaffScan = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [scannedId, setScannedId] = useState('');
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [feedback, setFeedback] = useState('');
  const [stickyNote, setStickyNote] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchOrderByLaundryId = async (laundryId: string) => {
    if (!laundryId.trim()) return;
    
    setLoading(true);
    try {
      const { data: order, error } = await supabase
        .from('laundry_orders')
        .select('*')
        .eq('laundry_id', laundryId.trim())
        .single();

      if (error) {
        toast({
          title: "Order Not Found",
          description: "No order found with this Laundry ID",
          variant: "destructive"
        });
        setCurrentOrder(null);
      } else {
        setCurrentOrder(order);
        setFeedback(order.feedback || '');
        setStickyNote(order.sticky_note || '');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      toast({
        title: "Error",
        description: "Failed to fetch order details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (newStatus: string) => {
    if (!currentOrder) return;

    setLoading(true);
    try {
      const updateData: any = { status: newStatus };
      
      // Add timestamp for specific statuses
      const now = new Date().toISOString();
      switch (newStatus) {
        case 'picked_up':
          updateData.pickup_date = now;
          break;
        case 'washing':
          updateData.washing_started_at = now;
          break;
        case 'drying':
          updateData.drying_started_at = now;
          break;
        case 'completed':
          updateData.completed_at = now;
          break;
        case 'delivered':
          updateData.delivered_at = now;
          break;
      }

      // Include feedback and sticky note if provided
      if (feedback) updateData.feedback = feedback;
      if (stickyNote) updateData.sticky_note = stickyNote;

      const { error } = await supabase
        .from('laundry_orders')
        .update(updateData)
        .eq('id', currentOrder.id);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Order marked as ${newStatus.replace('_', ' ')}`,
      });

      // Refresh order data
      fetchOrderByLaundryId(currentOrder.laundry_id);
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string; label: string } } = {
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      'picked_up': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Picked Up' },
      'washing': { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Washing' },
      'drying': { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Drying' },
      'completed': { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
      'delivered': { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Delivered' }
    };
    
    const statusStyle = statusMap[status] || statusMap.pending;
    
    return (
      <Badge className={`${statusStyle.bg} ${statusStyle.text} hover:${statusStyle.bg}`}>
        {statusStyle.label}
      </Badge>
    );
  };

  const getNextStatus = (currentStatus: string) => {
    const statusFlow = {
      'pending': 'picked_up',
      'picked_up': 'washing',
      'washing': 'drying',
      'drying': 'completed',
      'completed': 'delivered'
    };
    return statusFlow[currentStatus as keyof typeof statusFlow];
  };

  const getNextStatusLabel = (currentStatus: string) => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) return null;
    
    const labels: { [key: string]: string } = {
      'picked_up': 'Mark as Picked Up',
      'washing': 'Start Washing',
      'drying': 'Start Drying',
      'completed': 'Mark as Completed',
      'delivered': 'Mark as Delivered'
    };
    
    return labels[nextStatus];
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 font-inter">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Panel</h1>
              <p className="text-gray-600">Scan QR codes and update order status</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                variant="outline" 
                onClick={signOut}
                className="rounded-full px-6"
              >
                Sign Out
              </Button>
            </div>
          </div>

          {/* Scan Section */}
          <Card className="rounded-2xl border-0 shadow-lg mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2">
                <QrCode className="h-6 w-6" />
                Scan Laundry QR Code
              </CardTitle>
              <CardDescription>
                Enter the Laundry ID from the QR code to track the order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter Laundry ID (e.g., LND202501230001)"
                  value={scannedId}
                  onChange={(e) => setScannedId(e.target.value)}
                  className="rounded-xl"
                  onKeyPress={(e) => e.key === 'Enter' && fetchOrderByLaundryId(scannedId)}
                />
                <Button 
                  onClick={() => fetchOrderByLaundryId(scannedId)}
                  disabled={loading || !scannedId.trim()}
                  className="bg-primary-500 hover:bg-primary-600 text-white rounded-xl px-8"
                >
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          {currentOrder && (
            <Card className="rounded-2xl border-0 shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Package className="h-6 w-6" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Laundry ID</p>
                    <p className="text-lg font-semibold">{currentOrder.laundry_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Status</p>
                    <div className="mt-1">{getStatusBadge(currentOrder.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Wash Type</p>
                    <p className="text-lg">
                      {currentOrder.wash_type === 'normal' ? 'Normal Wash' : 'Stain/Warm Wash'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pickup Type</p>
                    <p className="text-lg">
                      {currentOrder.pickup_type === 'self_drop' ? 'Self Drop' : 'Pickup Service'}
                    </p>
                  </div>
                </div>

                {currentOrder.special_instructions && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Special Instructions</p>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {currentOrder.special_instructions}
                    </p>
                  </div>
                )}

                {/* Feedback Section */}
                <div>
                  <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Feedback (Optional)
                  </label>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Add any feedback about the order..."
                    className="rounded-xl"
                  />
                </div>

                {/* Sticky Note Section */}
                <div>
                  <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                    <StickyNote className="h-4 w-4" />
                    Sticky Note (Optional)
                  </label>
                  <Textarea
                    value={stickyNote}
                    onChange={(e) => setStickyNote(e.target.value)}
                    placeholder="Add a sticky note for this order..."
                    className="rounded-xl"
                  />
                </div>

                {/* Status Update Button */}
                {currentOrder.status !== 'delivered' && (
                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={() => updateOrderStatus(getNextStatus(currentOrder.status))}
                      disabled={loading}
                      className="bg-primary-500 hover:bg-primary-600 text-white rounded-xl px-8 py-3 text-lg font-semibold flex items-center gap-2"
                    >
                      {getNextStatusLabel(currentOrder.status)}
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>
                )}

                {currentOrder.status === 'delivered' && (
                  <div className="flex justify-center pt-4">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-6 w-6" />
                      <span className="text-lg font-semibold">Order Completed</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {!currentOrder && !loading && (
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardContent className="text-center py-12">
                <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Scan</h3>
                <p className="text-gray-600">
                  Enter a Laundry ID above to view and update order details
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default StaffScan;
