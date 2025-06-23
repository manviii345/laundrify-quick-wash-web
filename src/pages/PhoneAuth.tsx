
import { useState } from 'react';
import { Phone, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PhoneAuth = () => {
  const { signInWithOTP, verifyOTP } = useAuth();
  const { toast } = useToast();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone) {
      toast({
        title: "Missing Information",
        description: "Please enter your phone number",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const { error } = await signInWithOTP(phone);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code",
      });
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp) {
      toast({
        title: "Missing Information",
        description: "Please enter the OTP code",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const { error } = await verifyOTP(phone, otp);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      setLoading(false);
    } else {
      toast({
        title: "Login Successful!",
        description: "Welcome to Laundrify",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />
      
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Laundrify
          </h1>
          <p className="text-lg text-gray-600">
            Sign in with your phone number
          </p>
        </div>

        <Card className="rounded-2xl shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {otpSent ? 'Verify OTP' : 'Phone Login'}
            </CardTitle>
            <CardDescription>
              {otpSent 
                ? 'Enter the 6-digit code sent to your phone'
                : 'Enter your phone number to receive an OTP'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div>
                  <Label htmlFor="phone" className="text-base font-medium">Phone Number</Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 rounded-xl border-gray-200"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-xl py-3 text-lg font-semibold"
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <Label htmlFor="otp" className="text-base font-medium">OTP Code</Label>
                  <div className="relative mt-2">
                    <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="pl-10 rounded-xl border-gray-200"
                      maxLength={6}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-xl py-3 text-lg font-semibold"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </Button>

                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setOtpSent(false)}
                  className="w-full rounded-xl"
                >
                  Back to Phone Number
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default PhoneAuth;
