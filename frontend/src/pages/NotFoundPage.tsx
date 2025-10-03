import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {/* 404 illustration */}
            <div className="mx-auto flex items-center justify-center h-32 w-32 rounded-full bg-red-100 mb-6">
              <Search className="h-16 w-16 text-red-600" />
            </div>
            
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="space-y-4">
              <Link
                to="/dashboard"
                className="w-full btn-primary inline-flex items-center justify-center space-x-2"
              >
                <Home size={18} />
                <span>Go to Dashboard</span>
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="w-full btn-secondary inline-flex items-center justify-center space-x-2"
              >
                <ArrowLeft size={18} />
                <span>Go Back</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          If you think this is an error, please contact support.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;