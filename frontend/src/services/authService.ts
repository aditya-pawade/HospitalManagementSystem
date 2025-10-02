import apiClient from './api';
import type { User } from '../types';

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
}

export const authService = {
  // Login user
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post('/auth/login', {
        username,
        password,
      });
      
      // Parse the response to extract role
      const message = response.data;
      if (typeof message === 'string' && message.includes('Login successful')) {
        const roleMatch = message.match(/Role: (\w+)/);
        const role = roleMatch ? roleMatch[1] : 'PATIENT';
        
        const user: User = {
          username,
          role: role as User['role'],
        };
        
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        
        return {
          success: true,
          message: 'Login successful',
          user,
        };
      }
      
      return {
        success: false,
        message: message || 'Login failed',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data || 'Login failed',
      };
    }
  },

  // Register new user
  register: async (user: User): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post('/auth/register', user);
      return {
        success: true,
        message: 'Registration successful',
        user: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data || 'Registration failed',
      };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },
};
