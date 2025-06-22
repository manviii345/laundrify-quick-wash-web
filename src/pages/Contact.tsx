
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      category: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      value: 'support@laundrify.com',
      description: 'Get help via email within 24 hours',
      action: 'mailto:support@laundrify.com'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      value: '+91 98765 43210',
      description: 'Call us for immediate assistance',
      action: 'tel:+919876543210'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      value: 'Available 9 AM - 9 PM',
      description: 'Chat with our support team',
      action: '#'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      value: 'Bangalore, Karnataka',
      description: 'Visit our main office',
      action: '#'
    }
  ];

  const faqs = [
    {
      question: 'How do I book a laundry slot?',
      answer: 'Simply visit our booking page, select your preferred date and time, fill in your details, and confirm your booking. You\'ll receive a barcode for pickup and drop-off.'
    },
    {
      question: 'Is the service really free for students?',
      answer: 'Yes! Our service is completely free for students. We are monetized through our vendor partnerships, so you don\'t pay anything.'
    },
    {
      question: 'What if my clothes get damaged?',
      answer: 'We have insurance coverage for all laundry items. In the rare case of damage, we provide full compensation based on the item\'s value.'
    },
    {
      question: 'Can I cancel or reschedule my booking?',
      answer: 'Yes, you can cancel or reschedule your booking up to 2 hours before your selected time slot through your dashboard.'
    },
    {
      question: 'How do I track my laundry status?',
      answer: 'You can track your laundry in real-time through your dashboard. We also send SMS updates at each stage of the process.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about Laundrify? We're here to help! Reach out to our friendly support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-base font-medium">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-2 rounded-xl border-gray-200"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-2 rounded-xl border-gray-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-base font-medium">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-2 rounded-xl border-gray-200"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category" className="text-base font-medium">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="mt-2 rounded-xl border-gray-200">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booking">Booking Issues</SelectItem>
                        <SelectItem value="payment">Payment & Billing</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-base font-medium">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your inquiry"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="mt-2 rounded-xl border-gray-200"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-base font-medium">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="mt-2 rounded-xl border-gray-200 min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-xl py-3 text-lg font-semibold"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Contact Information</CardTitle>
                <CardDescription>
                  Multiple ways to reach our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <method.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{method.title}</h3>
                      <p className="text-primary-600 font-medium">{method.value}</p>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Support Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">12:00 PM - 5:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg border-0 bg-primary-50 border-primary-200">
              <CardContent className="p-6 text-center">
                <Headphones className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary-800 mb-2">
                  Need Immediate Help?
                </h3>
                <p className="text-primary-700 mb-4">
                  For urgent issues, call our 24/7 emergency support line
                </p>
                <Button 
                  variant="outline" 
                  className="border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-full"
                >
                  Call Emergency Line
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="rounded-2xl shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Frequently Asked Questions</CardTitle>
            <CardDescription>
              Quick answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-8">
              Start Live Chat
            </Button>
            <Button variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50 rounded-full px-8">
              Browse Help Center
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
