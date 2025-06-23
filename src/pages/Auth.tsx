
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Mail, Phone, MapPin, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    phone: '',
    hostelName: '',
    roomNumber: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have been logged in successfully",
      });
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupData.fullName || !signupData.email || !signupData.phone || 
        !signupData.hostelName || !signupData.roomNumber || !signupData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (signupData.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: signupData.fullName,
          phone: signupData.phone,
          hostel_name: signupData.hostelName,
          room_number: signupData.roomNumber
        }
      }
    });

    if (error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account",
      });
    }
    
    setLoading(false);
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
            Your smart laundry companion for hostel life
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 rounded-full bg-gray-100 p-1">
            <TabsTrigger value="login" className="rounded-full">Login</TabsTrigger>
            <TabsTrigger value="signup" className="rounded-full">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to your account to continue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <Label htmlFor="login-email" className="text-base font-medium">Email Address</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10 rounded-xl border-gray-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="login-password" className="text-base font-medium">Password</Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10 rounded-xl border-gray-200"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-xl py-3 text-lg font-semibold"
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create Account</CardTitle>
                <CardDescription>
                  Join thousands of students using Laundrify
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-6">
                  <div>
                    <Label htmlFor="signup-name" className="text-base font-medium">Full Name</Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-name"
                        placeholder="Enter your full name"
                        value={signupData.fullName}
                        onChange={(e) => setSignupData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="pl-10 rounded-xl border-gray-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-email" className="text-base font-medium">Email Address</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signupData.email}
                        onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10 rounded-xl border-gray-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-phone" className="text-base font-medium">Phone Number</Label>
                    <div className="relative mt-2">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-phone"
                        placeholder="Enter your phone number"
                        value={signupData.phone}
                        onChange={(e) => setSignupData(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10 rounded-xl border-gray-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="signup-hostel" className="text-base font-medium">Hostel Name</Label>
                      <div className="relative mt-2">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="signup-hostel"
                          placeholder="Hostel name"
                          value={signupData.hostelName}
                          onChange={(e) => setSignupData(prev => ({ ...prev, hostelName: e.target.value }))}
                          className="pl-10 rounded-xl border-gray-200"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signup-room" className="text-base font-medium">Room No.</Label>
                      <Input
                        id="signup-room"
                        placeholder="Room number"
                        value={signupData.roomNumber}
                        onChange={(e) => setSignupData(prev => ({ ...prev, roomNumber: e.target.value }))}
                        className="mt-2 rounded-xl border-gray-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-password" className="text-base font-medium">Password</Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={signupData.password}
                        onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10 rounded-xl border-gray-200"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-xl py-3 text-lg font-semibold"
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <p className="text-center text-sm text-gray-600 mt-8">
          <Link to="/" className="text-primary-600 hover:text-primary-500">
            ← Back to Home
          </Link>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
