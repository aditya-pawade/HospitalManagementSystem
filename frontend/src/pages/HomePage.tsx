import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Users,
  Stethoscope,
  Calendar,
  CreditCard,
  ArrowRight,
  Shield,
  Clock,
  Award
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Patient Management',
      description: 'Comprehensive patient records and medical history management'
    },
    {
      icon: Stethoscope,
      title: 'Doctor Profiles',
      description: 'Manage doctor information, specializations, and schedules'
    },
    {
      icon: Calendar,
      title: 'Appointment Scheduling',
      description: 'Easy appointment booking and calendar management'
    },
    {
      icon: CreditCard,
      title: 'Billing System',
      description: 'Streamlined billing and payment tracking'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'HIPAA compliant with robust security measures'
    },
    {
      icon: Clock,
      title: '24/7 Access',
      description: 'Access your hospital data anytime, anywhere'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-medical-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary-600 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HMS</h1>
                <p className="text-xs text-gray-500">Hospital Management</p>
              </div>
            </div>
            <div>
              <Link
                to="/login"
                className="btn-primary mr-3"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn-secondary"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-primary-600 rounded-2xl">
                <Heart className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Modern Hospital
              <span className="text-primary-600"> Management</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your healthcare operations with our comprehensive hospital management system. 
              Designed for efficiency, security, and ease of use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-3"
              >
                <span>Login</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/signup"
                className="btn-secondary inline-flex items-center space-x-2 text-lg px-8 py-3"
              >
                <span>Sign Up</span>
              </Link>
              <a
                href="#features"
                className="btn-outline inline-flex items-center space-x-2 text-lg px-8 py-3"
              >
                <span>Learn More</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to manage your hospital efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-lg mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trusted by Healthcare Professionals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-primary-100">Hospitals Using HMS</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-primary-100">Healthcare Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1M+</div>
              <div className="text-primary-100">Patients Managed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-medical-100 rounded-full mb-8">
            <Award className="w-10 h-10 text-medical-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Hospital?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of healthcare professionals who trust HMS for their daily operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="btn-success inline-flex items-center space-x-2 text-lg px-8 py-3"
            >
              <span>Sign Up Today</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/login"
              className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-3"
            >
              <span>Login</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="w-6 h-6 text-primary-400" />
              <span className="text-xl font-bold">Hospital Management System</span>
            </div>
            <div className="text-gray-400">
              © {new Date().getFullYear()} HMS. All rights reserved.
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>Providing quality healthcare management solutions worldwide</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;