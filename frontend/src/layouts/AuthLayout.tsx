import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-medical-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="p-3 bg-primary-600 rounded-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HMS</h1>
              <p className="text-sm text-gray-600">Hospital Management System</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
          {children}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Hospital Management System. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;