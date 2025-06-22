
import { Clock, Smartphone, Shield, Users, BarChart3, Calendar, Bell, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Features = () => {
  const mainFeatures = [
    {
      icon: Clock,
      title: 'No More Waiting Queues',
      description: 'Book your laundry slot in advance and skip the long waiting lines. Our smart scheduling system ensures you never have to wait.',
      benefits: ['Save 2-3 hours weekly', 'Guaranteed time slots', 'No crowded laundry rooms']
    },
    {
      icon: Smartphone,
      title: 'Real-time Tracking',
      description: 'Track your laundry status in real-time with our barcode system. Know exactly when your clothes are ready for pickup.',
      benefits: ['Live status updates', 'SMS notifications', 'Barcode scanning']
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your clothes are handled by verified vendors with full accountability. We ensure safe and careful handling of your belongings.',
      benefits: ['Verified vendors', 'Insurance coverage', 'Quality guarantee']
    },
    {
      icon: Users,
      title: 'Student-Centric Design',
      description: 'Built specifically for hostel life with features that understand student schedules and requirements.',
      benefits: ['Flexible timings', 'Student-friendly pricing', 'Hostel integration']
    }
  ];

  const additionalFeatures = [
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Track your laundry patterns and get insights on optimal booking times'
    },
    {
      icon: Calendar,
      title: 'Advanced Scheduling',
      description: 'Book slots up to 7 days in advance with recurring booking options'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Get notified via SMS and push notifications at every step'
    },
    {
      icon: Star,
      title: 'Quality Assurance',
      description: 'Rate your experience and help us maintain high service standards'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Features That Make 
            <span className="text-primary-500"> Laundry Simple</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover how Laundrify transforms the traditional laundry experience with smart technology 
            and student-focused features.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for a hassle-free laundry experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{feature.title}</CardTitle>
                  <CardDescription className="text-lg text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              More Features
            </h2>
            <p className="text-xl text-gray-600">
              Additional capabilities that enhance your experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="text-center rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-7 w-7 text-primary-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to get your laundry done
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: 1, title: 'Sign Up', desc: 'Create your account with hostel details' },
                { step: 2, title: 'Book Slot', desc: 'Choose your preferred date and time' },
                { step: 3, title: 'Drop Clothes', desc: 'Use your barcode to drop clothes' },
                { step: 4, title: 'Pickup Fresh', desc: 'Collect your clean laundry' }
              ].map((item, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                  
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full">
                      <div className="w-full h-1 bg-primary-200"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Why Students Love Laundrify
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-100 mb-2">2-3 hrs</div>
              <div className="text-primary-100">Saved weekly</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-100 mb-2">50+</div>
              <div className="text-primary-100">Partner hostels</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-100 mb-2">10k+</div>
              <div className="text-primary-100">Happy students</div>
            </div>
          </div>

          <Link to="/book-slot">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold shadow-lg">
              Try It Now - It's Free!
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
