import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  LogOut, 
  Settings, 
  Bell, 
  Menu, 
  X,
  Heart
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavbarProps {
  onMenuToggle?: () => void;
  showMenuToggle?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, showMenuToggle = true }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    setShowUserMenu(false);
    navigate('/profile');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and menu toggle */}
          <div className="flex items-center space-x-4">
            {showMenuToggle && (
              <button
                onClick={onMenuToggle}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
                aria-label="Toggle sidebar"
              >
                <Menu size={20} />
              </button>
            )}
            
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-primary-600 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">HMS</h1>
                <p className="text-xs text-gray-500">Hospital Management</p>
              </div>
            </Link>
          </div>

          {/* Right side - Notifications and user menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 transform translate-x-1/2 -translate-y-1/2"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName || user?.username}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role?.toLowerCase()}
                  </p>
                </div>
              </button>

              {/* User dropdown menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 md:hidden"
              aria-label="Toggle mobile menu"
            >
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setShowMobileMenu(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/patients"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setShowMobileMenu(false)}
            >
              Patients
            </Link>
            <Link
              to="/doctors"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setShowMobileMenu(false)}
            >
              Doctors
            </Link>
            <Link
              to="/appointments"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setShowMobileMenu(false)}
            >
              Appointments
            </Link>
            <Link
              to="/billing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setShowMobileMenu(false)}
            >
              Billing
            </Link>
          </div>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;