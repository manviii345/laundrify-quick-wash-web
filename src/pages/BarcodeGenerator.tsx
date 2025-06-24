
import { useEffect, useState, useRef } from 'react';
import { Download, Share2, CheckCircle, Clock, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Import JsBarcode
declare global {
  interface Window {
    JsBarcode: any;
  }
}

const BarcodeGenerator = () => {
  const { toast } = useToast();
  const [booking, setBooking] = useState<any>(null);
  const [barcodeGenerated, setBarcodeGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Load JsBarcode from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js';
    script.onload = () => {
      console.log('JsBarcode loaded successfully');
      // Get booking data from localStorage
      const storedBooking = localStorage.getItem('currentBooking');
      if (storedBooking) {
        const bookingData = JSON.parse(storedBooking);
        setBooking(bookingData);
        // Small delay to ensure canvas is rendered
        setTimeout(() => {
          generateBarcode(bookingData.orderId);
        }, 100);
      }
    };
    script.onerror = () => {
      console.error('Failed to load JsBarcode');
      toast({
        title: "Error",
        description: "Failed to load barcode library",
        variant: "destructive"
      });
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const generateBarcode = (orderId: string) => {
    if (window.JsBarcode && canvasRef.current) {
      try {
        console.log('Generating barcode for:', orderId);
        window.JsBarcode(canvasRef.current, orderId, {
          format: "CODE128",
          width: 2,
          height: 100,
          displayValue: true,
          fontSize: 20,
          textMargin: 10
        });
        setBarcodeGenerated(true);
        console.log('Barcode generated successfully');
      } catch (error) {
        console.error('Error generating barcode:', error);
        toast({
          title: "Error",
          description: "Failed to generate barcode",
          variant: "destructive"
        });
      }
    } else {
      console.error('JsBarcode not loaded or canvas not available');
    }
  };

  const downloadBarcode = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `laundrify-${booking.orderId}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
      
      toast({
        title: "Downloaded!",
        description: "Barcode saved to your device",
      });
    }
  };

  const shareBarcode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Laundrify Booking',
          text: `My laundry booking - Order ID: ${booking.orderId}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`Laundrify Order ID: ${booking.orderId}`);
      toast({
        title: "Copied!",
        description: "Order ID copied to clipboard",
      });
    }
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 font-inter">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Booking Found</h1>
          <p className="text-gray-600 mb-8">Please make a booking first to generate your barcode.</p>
          <Button 
            onClick={() => window.location.href = '/book-slot'}
            className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-8"
          >
            Book a Slot
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Your laundry slot has been booked successfully. Use the barcode below for pickup and drop-off.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Details */}
          <Card className="rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Booking Details</CardTitle>
              <CardDescription>Order ID: {booking.orderId}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{booking.name}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{booking.phone}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{booking.hostelName}, Room {booking.roomNo}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-medium">{booking.date} at {booking.timeSlot}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Service Type:</span>
                <span className="font-medium">{booking.laundryType}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Status:</span>
                <span className="flex items-center text-green-600 font-medium">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {booking.status}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Barcode Section */}
          <Card className="rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Your Barcode</CardTitle>
              <CardDescription>Show this barcode to the vendor for pickup and drop-off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 text-center mb-6">
                {barcodeGenerated ? (
                  <canvas ref={canvasRef} className="mx-auto"></canvas>
                ) : (
                  <div className="py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Generating barcode...</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={downloadBarcode}
                  disabled={!barcodeGenerated}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white rounded-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button 
                  onClick={shareBarcode}
                  disabled={!barcodeGenerated}
                  variant="outline"
                  className="flex-1 rounded-full border-primary-500 text-primary-600 hover:bg-primary-50"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Timeline */}
        <Card className="rounded-2xl shadow-lg border-0 mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Order Status</CardTitle>
            <CardDescription>Track your laundry progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 overflow-x-auto pb-4">
              <div className="flex flex-col items-center min-w-max">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mb-2">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-green-600">Booked</span>
              </div>
              
              <div className="flex-1 h-1 bg-gray-200 min-w-[40px]"></div>
              
              <div className="flex flex-col items-center min-w-max">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-2">
                  <Package className="h-6 w-6" />
                </div>
                <span className="text-sm text-gray-500">Pickup</span>
              </div>
              
              <div className="flex-1 h-1 bg-gray-200 min-w-[40px]"></div>
              
              <div className="flex flex-col items-center min-w-max">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-2">
                  <Clock className="h-6 w-6" />
                </div>
                <span className="text-sm text-gray-500">Washing</span>
              </div>
              
              <div className="flex-1 h-1 bg-gray-200 min-w-[40px]"></div>
              
              <div className="flex flex-col items-center min-w-max">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-2">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <span className="text-sm text-gray-500">Ready</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="rounded-2xl shadow-lg border-0 mt-8 bg-primary-50 border-primary-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-primary-800 mb-4">Important Instructions</h3>
            <ul className="space-y-2 text-primary-700">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Present this barcode to the vendor during pickup and collection</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Arrive within your selected time slot for faster service</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>You'll receive SMS updates on your laundry status</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Contact support if you face any issues with your booking</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default BarcodeGenerator;
