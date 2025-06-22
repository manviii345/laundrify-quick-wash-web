
import { useState } from 'react';
import { Calendar, Clock, Package, CheckCircle, Plus, BarChart3, Star, Shirt, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const [user] = useState({
    name: 'Rahul Sharma',
    hostel: 'Sunrise Hostel',
    roomNo: '204',
    joinedDate: 'January 2024'
  });

  // Mock data
  const quickStats = [
    { label: 'Total Orders', value: '23', icon: Package, color: 'bg-blue-500' },
    { label: 'This Month', value: '6', icon: Calendar, color: 'bg-green-500' },
    { label: 'Time Saved', value: '12 hrs', icon: Clock, color: 'bg-purple-500' },
    { label: 'Avg Rating', value: '4.8', icon: Star, color: 'bg-yellow-500' }
  ];

  const recentOrders = [
    {
      id: 'LDY1672234567890',
      date: '2024-06-22',
      type: 'Quick Wash',
      status: 'in-progress',
      stage: 'washing'
    },
    {
      id: 'LDY1672234567889',
      date: '2024-06-20',
      type: 'Regular Wash',
      status: 'completed',
      rating: 5
    },
    {
      id: 'LDY1672234567888',
      date: '2024-06-18',
      type: 'Delicate Care',
      status: 'completed',
      rating: 4
    }
  ];

  const upcomingSlots = [
    {
      date: '2024-06-24',
      time: '10:00 AM - 12:00 PM',
      type: 'Regular Wash'
    },
    {
      date: '2024-06-26',
      time: '02:00 PM - 04:00 PM',
      type: 'Delicate Care'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-gray-600">
                {user.hostel}, Room {user.roomNo} • Member since {user.joinedDate}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/book-slot">
                <Button className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-6">
                  <Plus className="h-5 w-5 mr-2" />
                  Book New Slot
                </Button>
              </Link>
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
                  <CardTitle className="text-xl font-semibold">Recent Orders</CardTitle>
                  <CardDescription>Your latest laundry bookings</CardDescription>
                </div>
                <Link to="/schedule">
                  <Button variant="outline" size="sm" className="rounded-full">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <Shirt className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Order #{order.id.slice(-6)}</p>
                          <p className="text-sm text-gray-600">{order.date} • {order.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(order.status)}
                        {order.rating && (
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{order.rating}/5</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Slots */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Upcoming Slots</CardTitle>
                <CardDescription>Your scheduled bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSlots.map((slot, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-primary-50 rounded-xl">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-primary-800">{slot.date}</p>
                        <p className="text-sm text-primary-600">{slot.time}</p>
                        <p className="text-sm text-primary-600">{slot.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/book-slot">
                  <Button variant="outline" className="w-full mt-4 rounded-full border-primary-500 text-primary-600 hover:bg-primary-50">
                    Book Another Slot
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
                  <h3 className="text-lg font-semibold mb-2">Laundry Champion!</h3>
                  <p className="text-primary-100 text-sm mb-4">
                    You've saved 12 hours this month by using Laundrify. Keep it up!
                  </p>
                  <Badge className="bg-white text-primary-600 hover:bg-white">
                    Eco-Friendly User
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="rounded-2xl border-0 shadow-lg mt-8 bg-gray-100">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Love using Laundrify? 
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Help us spread the word! Refer your friends and hostel mates to experience 
              the convenience of smart laundry booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-8">
                Refer Friends
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" className="rounded-full px-8">
                Share Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
