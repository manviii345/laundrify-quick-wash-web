import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Shield, Smartphone, Users, Star, CheckCircle, UserCheck, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-inter flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect to dashboard
  }

  const handleGetStarted = () => {
    setShowRoleSelection(true);
  };

  const handleRoleSelection = (role: string) => {
    // Store role preference in sessionStorage for the auth page
    sessionStorage.setItem('selectedRole', role);
    navigate('/auth');
  };

  const features = [
    {
      icon: Clock,
      title: 'No More Queues',
      description: 'Book your laundry slot in advance and skip the waiting lines'
    },
    {
      icon: Smartphone,
      title: 'Smart Tracking',
      description: 'Real-time updates on your laundry status with barcode tracking'
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Your clothes are handled with care by verified vendors'
    },
    {
      icon: Users,
      title: 'Student Friendly',
      description: 'Designed specifically for hostel life and student schedules'
    }
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Engineering Student',
      content: 'Laundrify saved me so much time! No more waiting in long queues.',
      rating: 5
    },
    {
      name: 'Priya Patel',
      role: 'Medical Student',
      content: 'The barcode system is genius. I always know where my clothes are.',
      rating: 5
    },
    {
      name: 'Arjun Reddy',
      role: 'MBA Student',
      content: 'Perfect for busy schedules. I can book slots between classes.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar />
      
      {/* Role Selection Modal */}
      {showRoleSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Role</h2>
              <p className="text-gray-600">Select how you want to access the platform</p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelection('customer')}
                className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-primary-100">
                    <UserCheck className="h-6 w-6 text-blue-600 group-hover:text-primary-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Student/User</h3>
                    <p className="text-sm text-gray-600">Book laundry slots and track orders</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => handleRoleSelection('admin')}
                className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-primary-100">
                    <Settings className="h-6 w-6 text-purple-600 group-hover:text-primary-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Admin/Staff</h3>
                    <p className="text-sm text-gray-600">Manage orders and operations</p>
                  </div>
                </div>
              </button>
            </div>
            
            <button
              onClick={() => setShowRoleSelection(false)}
              className="w-full mt-6 py-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Smart Laundry for
              <span className="text-primary-500"> Smart Students</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in">
              Skip the queues, book your slot, and get your laundry done hassle-free. 
              The future of hostel laundry is here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/features">
                <Button variant="outline" size="lg" className="border-primary-500 text-primary-600 hover:bg-primary-50 rounded-full px-8 py-4 text-lg font-semibold">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary-100 rounded-full opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-primary-200 rounded-full opacity-20"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Laundrify?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've revolutionized hostel laundry with smart technology and student-first approach
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get your laundry done in just 3 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Book Your Slot</h3>
              <p className="text-gray-600">
                Choose your preferred time slot and laundry type through our easy booking system
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Drop & Track</h3>
              <p className="text-gray-600">
                Drop your clothes with the generated barcode and track status in real-time
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pickup Fresh</h3>
              <p className="text-gray-600">
                Get notified when ready and pickup your clean, fresh laundry
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of happy students across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-2xl bg-white">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Revolutionize Your Laundry?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of students who've already made the smart choice
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="bg-white text-primary-600 hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
