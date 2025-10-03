import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, User, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { FormInput, LoadingSpinner } from '../components';
import { LoginRequest } from '../types';
import toast from 'react-hot-toast';

interface LoginForm {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<LoginForm>();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location.state]);

  // Focus username field on mount
  useEffect(() => {
    setFocus('username');
  }, [setFocus]);

  const onSubmit = async (data: LoginForm) => {
    setIsSubmitting(true);
    
    try {
      const loginData: LoginRequest = {
        username: data.username,
        password: data.password,
      };

      const success = await login(loginData);
      
      if (success) {
        const from = (location.state as any)?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" message="Checking authentication..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back to home link */}
      <div className="text-center">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Login form header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to your hospital management account
        </p>
      </div>

      {/* Login form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          label="Username or Email"
          leftIcon={<User size={18} />}
          error={errors.username?.message}
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
          })}
        />

        <FormInput
          label="Password"
          type={showPassword ? 'text' : 'password'}
          leftIcon={<Lock size={18} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-primary-600 hover:text-primary-500"
              onClick={(e) => {
                e.preventDefault();
                toast('Please contact your administrator for password reset');
              }}
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" />
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign in</span>
          )}
        </button>
      </form>

      {/* Demo credentials */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Demo Credentials:</h3>
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Admin:</span>
            <span className="font-mono">admin / admin123</span>
          </div>
          <div className="flex justify-between">
            <span>Doctor:</span>
            <span className="font-mono">doctor / doctor123</span>
          </div>
          <div className="flex justify-between">
            <span>Receptionist:</span>
            <span className="font-mono">reception / reception123</span>
          </div>
        </div>
      </div>

      {/* Additional info */}
      <div className="text-center text-xs text-gray-500">
        <p>
          By signing in, you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;