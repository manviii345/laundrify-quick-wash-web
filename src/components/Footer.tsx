
import { Link } from 'react-router-dom';
import { Shirt, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shirt className="h-8 w-8 text-primary-500" />
              <span className="font-bold text-xl text-gray-900">Laundrify</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Smart laundry service for hostels. No more waiting in queues, just book your slot and relax while we handle your laundry.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>contact@laundrify.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Available in 50+ hostels across India</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/book-slot" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Book a Slot
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link to="/barcode" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Barcode Generator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            © 2024 Laundrify. All rights reserved. Made with ❤️ for students.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
