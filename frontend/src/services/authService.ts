import { LoginResponse, User, LoginFormData } from '../types';
import api from './api';

class AuthService {
  private readonly TOKEN_KEY = 'hms_token';
  private readonly USER_KEY = 'hms_user';

  async login(credentials: LoginFormData): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      
      if (response.data.success && response.data.user) {
        // Store user data (no token in this simple implementation)
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.data.user));
        // For now, just store a simple flag that user is logged in
        localStorage.setItem(this.TOKEN_KEY, 'logged_in');
      }
      
      return response.data;
    } catch (error: any) {
      // Handle error response from backend
      if (error.response?.data) {
        return error.response.data;
      }
      throw new Error('Login failed. Please try again.');
    }
  }

  async register(userData: User): Promise<User> {
    try {
      const response = await api.post<User>('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) === 'logged_in';
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Helper method to check if user has specific role
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  // Helper method to check if user has any of the specified roles
  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  clearAuthData(): void {
    this.logout();
  }
}

export const authService = new AuthService();
export default authService;