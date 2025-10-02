import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-600 text-white rounded-full p-8">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-5a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to Hospital Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Efficient healthcare management at your fingertips
          </p>
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-200"
            >
              Login to Get Started
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-200"
            >
              Go to Dashboard
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="card text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-2">Patient Management</h3>
            <p className="text-gray-600">
              Efficiently manage patient records, medical history, and treatment plans
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">👨‍⚕️</div>
            <h3 className="text-xl font-bold mb-2">Doctor Management</h3>
            <p className="text-gray-600">
              Organize doctor schedules, specializations, and availability
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2">Appointment Scheduling</h3>
            <p className="text-gray-600">
              Book and manage appointments with ease and efficiency
            </p>
          </div>
        </div>

        <div className="mt-16 card bg-primary-50">
          <h2 className="text-2xl font-bold mb-4 text-center">Our Services</h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <svg className="w-6 h-6 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>24/7 Patient Care and Support</span>
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Advanced Medical Equipment</span>
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Expert Medical Professionals</span>
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Easy Billing and Insurance Processing</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
