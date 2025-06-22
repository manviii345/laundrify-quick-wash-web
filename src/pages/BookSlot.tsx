
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Phone, MapPin, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BookSlot = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    hostelName: '',
    roomNo: '',
    date: '',
    timeSlot: '',
    laundryType: '',
    specialInstructions: ''
  });

  const timeSlots = [
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM'
  ];

  const laundryTypes = [
    { id: 'regular', name: 'Regular Wash', price: 'Free', description: 'Standard washing and drying' },
    { id: 'delicate', name: 'Delicate Care', price: 'Free', description: 'Gentle wash for delicate items' },
    { id: 'heavy', name: 'Heavy Duty', price: 'Free', description: 'For heavily soiled items' },
    { id: 'quick', name: 'Quick Wash', price: 'Free', description: '30-minute express wash' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.phone || !formData.hostelName || !formData.roomNo) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
    } else if (step === 2) {
      if (!formData.date || !formData.timeSlot) {
        toast({
          title: "Missing Information", 
          description: "Please select date and time slot",
          variant: "destructive"
        });
        return;
      }
    } else if (step === 3) {
      if (!formData.laundryType) {
        toast({
          title: "Missing Information",
          description: "Please select a laundry type",
          variant: "destructive"
        });
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = () => {
    // Generate order ID
    const orderId = `LDY${Date.now()}`;
    
    // Store booking data in localStorage for barcode generation
    localStorage.setItem('currentBooking', JSON.stringify({
      ...formData,
      orderId,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    }));

    toast({
      title: "Booking Confirmed!",
      description: "Your laundry slot has been booked successfully",
    });

    // Navigate to barcode page
    navigate('/barcode');
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Book Your Laundry Slot
          </h1>
          <p className="text-lg text-gray-600">
            Choose your preferred time and get your laundry done hassle-free
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNum 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNum ? 'bg-primary-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="rounded-2xl shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {step === 1 && "Personal Information"}
              {step === 2 && "Select Date & Time"}
              {step === 3 && "Choose Service Type"}
              {step === 4 && "Confirm Booking"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Tell us about yourself"}
              {step === 2 && "Pick your preferred slot"}
              {step === 3 && "Select laundry service"}
              {step === 4 && "Review your booking details"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-base font-medium">Full Name *</Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-10 rounded-xl border-gray-200"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-base font-medium">Phone Number *</Label>
                    <div className="relative mt-2">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10 rounded-xl border-gray-200"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="hostel" className="text-base font-medium">Hostel Name *</Label>
                    <div className="relative mt-2">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="hostel"
                        placeholder="Enter your hostel name"
                        value={formData.hostelName}
                        onChange={(e) => handleInputChange('hostelName', e.target.value)}
                        className="pl-10 rounded-xl border-gray-200"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="room" className="text-base font-medium">Room Number *</Label>
                    <Input
                      id="room"
                      placeholder="Enter your room number"
                      value={formData.roomNo}
                      onChange={(e) => handleInputChange('roomNo', e.target.value)}
                      className="mt-2 rounded-xl border-gray-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time Selection */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="date" className="text-base font-medium">Select Date *</Label>
                  <div className="relative mt-2">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="date"
                      type="date"
                      min={today}
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="pl-10 rounded-xl border-gray-200"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-base font-medium">Select Time Slot *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {timeSlots.map((slot) => (
                      <Card 
                        key={slot}
                        className={`cursor-pointer transition-all duration-200 rounded-xl border-2 ${
                          formData.timeSlot === slot
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                        onClick={() => handleInputChange('timeSlot', slot)}
                      >
                        <CardContent className="p-4 flex items-center">
                          <Clock className="h-5 w-5 text-primary-500 mr-3" />
                          <span className="font-medium">{slot}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Service Type Selection */}
            {step === 3 && (
              <div className="space-y-6">
                <RadioGroup 
                  value={formData.laundryType} 
                  onValueChange={(value) => handleInputChange('laundryType', value)}
                  className="space-y-4"
                >
                  {laundryTypes.map((type) => (
                    <Card key={type.id} className="rounded-xl border-2 hover:border-primary-300 transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <RadioGroupItem value={type.id} id={type.id} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={type.id} className="text-lg font-semibold cursor-pointer">
                                {type.name}
                              </Label>
                              <span className="text-primary-600 font-semibold">{type.price}</span>
                            </div>
                            <p className="text-gray-600 mt-1">{type.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </RadioGroup>
                
                <div>
                  <Label htmlFor="instructions" className="text-base font-medium">Special Instructions (Optional)</Label>
                  <Input
                    id="instructions"
                    placeholder="Any special care instructions..."
                    value={formData.specialInstructions}
                    onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                    className="mt-2 rounded-xl border-gray-200"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{formData.hostelName}, Room {formData.roomNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-medium">{formData.date} at {formData.timeSlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">
                        {laundryTypes.find(t => t.id === formData.laundryType)?.name}
                      </span>
                    </div>
                    {formData.specialInstructions && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Instructions:</span>
                        <span className="font-medium">{formData.specialInstructions}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-primary-50 rounded-xl p-6 text-center">
                  <Shirt className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-primary-700 mb-2">
                    Free Service for Students!
                  </h3>
                  <p className="text-primary-600">
                    Your laundry service is completely free. We're monetized through our vendor partners.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="rounded-full px-6"
              >
                Previous
              </Button>
              
              {step < 4 ? (
                <Button
                  onClick={handleNext}
                  className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-6"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-6"
                >
                  Confirm Booking
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default BookSlot;
