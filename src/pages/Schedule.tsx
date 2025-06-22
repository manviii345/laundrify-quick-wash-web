
import { useState } from 'react';
import { Calendar, Clock, Package, CheckCircle, AlertCircle, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Schedule = () => {
  const [viewType, setViewType] = useState('upcoming');

  // Mock data for demonstration
  const scheduleData = {
    upcoming: [
      {
        id: 'LDY1672234567890',
        date: '2024-06-24',
        timeSlot: '10:00 AM - 12:00 PM',
        type: 'Regular Wash',
        status: 'confirmed',
        location: 'Sunrise Hostel, Room 204',
        pickupTime: '10:30 AM',
        estimatedCompletion: '2:00 PM'
      },
      {
        id: 'LDY1672234567891',
        date: '2024-06-26',
        timeSlot: '02:00 PM - 04:00 PM',
        type: 'Delicate Care',
        status: 'confirmed',
        location: 'Sunrise Hostel, Room 204',
        pickupTime: '2:30 PM',
        estimatedCompletion: '6:00 PM'
      }
    ],
    active: [
      {
        id: 'LDY1672234567888',
        date: '2024-06-22',
        timeSlot: '08:00 AM - 10:00 AM',
        type: 'Quick Wash',
        status: 'in-progress',
        location: 'Sunrise Hostel, Room 204',
        pickupTime: '8:30 AM',
        currentStage: 'washing',
        estimatedCompletion: '12:00 PM'
      }
    ],
    completed: [
      {
        id: 'LDY1672234567887',
        date: '2024-06-20',
        timeSlot: '04:00 PM - 06:00 PM',
        type: 'Regular Wash',
        status: 'completed',
        location: 'Sunrise Hostel, Room 204',
        pickupTime: '4:30 PM',
        completedAt: '8:00 PM',
        rating: 5
      },
      {
        id: 'LDY1672234567886',
        date: '2024-06-18',
        timeSlot: '12:00 PM - 02:00 PM',
        type: 'Heavy Duty',
        status: 'completed',
        location: 'Sunrise Hostel, Room 204',
        pickupTime: '12:30 PM',
        completedAt: '6:30 PM',
        rating: 4
      },
      {
        id: 'LDY1672234567885',
        date: '2024-06-15',
        timeSlot: '10:00 AM - 12:00 PM',
        type: 'Delicate Care',
        status: 'completed',
        location: 'Sunrise Hostel, Room 204',
        pickupTime: '10:30 AM',
        completedAt: '4:00 PM',
        rating: 5
      }
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Confirmed</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const currentData = scheduleData[viewType as keyof typeof scheduleData] || [];

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Laundry Schedule
          </h1>
          <p className="text-lg text-gray-600">
            Track your bookings and manage your laundry schedule
          </p>
        </div>

        {/* View Selector */}
        <div className="mb-8">
          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-48 mx-auto rounded-full">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming Bookings</SelectItem>
              <SelectItem value="active">Active Orders</SelectItem>
              <SelectItem value="completed">Completed Orders</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{scheduleData.upcoming.length}</div>
              <div className="text-gray-600">Upcoming Bookings</div>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{scheduleData.active.length}</div>
              <div className="text-gray-600">Active Orders</div>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{scheduleData.completed.length}</div>
              <div className="text-gray-600">Completed Orders</div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule List */}
        <div className="space-y-6">
          {currentData.length === 0 ? (
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No {viewType} orders
                </h3>
                <p className="text-gray-600 mb-6">
                  {viewType === 'upcoming' && "You don't have any upcoming bookings."}
                  {viewType === 'active' && "No orders are currently being processed."}
                  {viewType === 'completed' && "You haven't completed any orders yet."}
                </p>
                {viewType === 'upcoming' && (
                  <Button 
                    onClick={() => window.location.href = '/book-slot'}
                    className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-6"
                  >
                    Book Your First Slot
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            currentData.map((order) => (
              <Card key={order.id} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-900">
                        Order #{order.id.slice(-6)}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mt-1">
                        {order.type} • {order.date} at {order.timeSlot}
                      </CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(order.status)}
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{order.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Pickup: {order.pickupTime}</span>
                    </div>
                    
                    {order.status === 'completed' && order.completedAt && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Completed: {order.completedAt}</span>
                      </div>
                    )}
                    
                    {order.estimatedCompletion && order.status !== 'completed' && (
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Est. Ready: {order.estimatedCompletion}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress bar for active orders */}
                  {order.status === 'in-progress' && order.currentStage && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span className="capitalize">{order.currentStage}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: order.currentStage === 'washing' ? '50%' : 
                                   order.currentStage === 'drying' ? '75%' : '25%' 
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Rating for completed orders */}
                  {order.status === 'completed' && order.rating && (
                    <div className="mt-4 flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Your rating:</span>
                      <div className="flex">
                        {renderStars(order.rating)}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {order.status === 'confirmed' && (
                      <>
                        <Button variant="outline" size="sm" className="rounded-full">
                          View Barcode
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full text-red-600 border-red-200 hover:bg-red-50">
                          Cancel Booking
                        </Button>
                      </>
                    )}
                    
                    {order.status === 'in-progress' && (
                      <Button variant="outline" size="sm" className="rounded-full">
                        Track Progress
                      </Button>
                    )}
                    
                    {order.status === 'completed' && !order.rating && (
                      <Button variant="outline" size="sm" className="rounded-full">
                        Rate Experience
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Schedule;
