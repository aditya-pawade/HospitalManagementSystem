import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const UnauthorizedPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {/* Unauthorized illustration */}
            <div className="mx-auto flex items-center justify-center h-32 w-32 rounded-full bg-red-100 mb-6">
              <Shield className="h-16 w-16 text-red-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Unauthorized Access</h2>
            <p className="text-gray-600 mb-2">
              You don't have permission to access this page.
            </p>
            {user && (
              <p className="text-sm text-gray-500 mb-8">
                Current role: <span className="font-medium capitalize">{user.role.toLowerCase()}</span>
              </p>
            )}
            
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
          If you believe you should have access to this page, please contact your administrator.
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;