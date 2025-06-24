import { useState, useEffect } from 'react';
import { Calendar, Clock, Package, CheckCircle, Plus, BarChart3, Star, Shirt, ArrowRight, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Dashboard mounted, user:', user);
    if (user) {
      fetchUserData();
    } else {
      console.log('No user found in Dashboard');
      setLoading(false);
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user?.id) {
      console.log('No user ID available');
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching user data for:', user.id);
      
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        // Don't fail completely if profile doesn't exist, just log it
        if (profileError.code !== 'PGRST116') { // Not found error
          throw profileError;
        }
      } else {
        console.log('Profile data:', profileData);
        setProfile(profileData);
      }

      // Fetch user bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (bookingsError) {
        console.error('Bookings fetch error:', bookingsError);
        throw bookingsError;
      }

      console.log('Bookings data:', bookingsData);
      setBookings(bookingsData || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load dashboard data');
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try refreshing.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been signed out successfully",
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-inter flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 font-inter flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <Package className="h-16 w-16 mx-auto mb-4" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-primary-500 hover:bg-primary-600">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const quickStats = [
    { label: 'Total Orders', value: bookings.length.toString(), icon: Package, color: 'bg-blue-500' },
    { label: 'This Month', value: bookings.filter(b => new Date(b.created_at).getMonth() === new Date().getMonth()).length.toString(), icon: Calendar, color: 'bg-green-500' },
    { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length.toString(), icon: CheckCircle, color: 'bg-purple-500' },
    { label: 'Active', value: bookings.filter(b => ['pending', 'confirmed', 'in_progress'].includes(b.status)).length.toString(), icon: Clock, color: 'bg-yellow-500' }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      'confirmed': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Confirmed' },
      'in_progress': { bg: 'bg-purple-100', text: 'text-purple-800', label: 'In Progress' },
      'completed': { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
      'cancelled': { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' }
    };
    
    const statusStyle = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    
    return (
      <Badge className={`${statusStyle.bg} ${statusStyle.text} hover:${statusStyle.bg}`}>
        {statusStyle.label}
      </Badge>
    );
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 font-inter">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {profile?.full_name || user?.email?.split('@')[0] || 'User'}! 👋
                </h1>
                <p className="text-gray-600">
                  {profile?.hostel_name && profile?.room_number ? 
                    `${profile.hostel_name}, Room ${profile.room_number}` : 
                    'Complete your profile to get started'
                  }
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <Link to="/book-slot">
                  <Button className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-6">
                    <Plus className="h-5 w-5 mr-2" />
                    Book New Slot
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="rounded-full px-6"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickStats.map((stat, index) => (
              <Card key={index} className="rounded-2xl border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold">Recent Bookings</CardTitle>
                    <CardDescription>Your latest laundry bookings</CardDescription>
                  </div>
                  <Link to="/schedule">
                    <Button variant="outline" size="sm" className="rounded-full">
                      View All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <Shirt className="h-5 w-5 text-primary-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {booking.laundry_type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                              </p>
                              <p className="text-sm text-gray-600">
                                {new Date(booking.booking_date).toLocaleDateString()} • {booking.time_slot}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(booking.status)}
                            <p className="text-sm text-gray-600 mt-1">{booking.total_items} items</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Shirt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No bookings yet</p>
                      <Link to="/book-slot">
                        <Button className="bg-primary-500 hover:bg-primary-600 text-white rounded-full">
                          Book Your First Slot
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="rounded-2xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/book-slot" className="block">
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <Plus className="h-4 w-4 mr-2" />
                      Book New Slot
                    </Button>
                  </Link>
                  <Link to="/barcode" className="block">
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <Package className="h-4 w-4 mr-2" />
                      Generate Barcode
                    </Button>
                  </Link>
                  <Link to="/schedule" className="block">
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <Clock className="h-4 w-4 mr-2" />
                      View Schedule
                    </Button>
                  </Link>
                  <Link to="/contact" className="block">
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Support Help
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Achievement */}
              <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Star className="h-12 w-12 text-primary-100 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {bookings.length > 0 ? 'Laundry Pro!' : 'Welcome to Laundrify!'}
                    </h3>
                    <p className="text-primary-100 text-sm mb-4">
                      {bookings.length > 0 
                        ? `You've completed ${bookings.filter(b => b.status === 'completed').length} orders. Keep it up!`
                        : 'Start your journey to hassle-free laundry management.'
                      }
                    </p>
                    <Badge className="bg-white text-primary-600 hover:bg-white">
                      {bookings.length > 5 ? 'Frequent User' : 'New Member'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
