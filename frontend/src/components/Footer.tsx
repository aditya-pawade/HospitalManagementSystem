import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <Heart className="w-5 h-5 text-primary-600" />
            <span className="text-sm text-gray-600">
              Hospital Management System
            </span>
          </div>
          
          <div className="text-sm text-gray-500">
            © {currentYear} HMS. All rights reserved.
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            Providing quality healthcare management solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;