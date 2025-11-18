import axios from 'axios';
import { LoginCredentials, RegisterCredentials, User } from '../types';

// Using DummyJSON for mock authentication
const API_BASE_URL = 'https://dummyjson.com';

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      // Mock authentication for demo purposes
      // Accept any email/password that meets basic requirements
      if (credentials.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const user: User = {
        id: Math.floor(Math.random() * 10000).toString(),
        username: credentials.email.split('@')[0],
        email: credentials.email,
        token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      };

      return user;
    } catch (error: any) {
      throw new Error(error.message || 'Login failed. Please check your credentials.');
    }
  },

  async register(credentials: RegisterCredentials): Promise<User> {
    try {
      // Mock registration for demo purposes
      const user: User = {
        id: Math.floor(Math.random() * 10000).toString(),
        username: credentials.username,
        email: credentials.email,
        token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      };

      return user;
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed. Please try again.');
    }
  },

  async logout(): Promise<void> {
    // In a real app, you might call an API to invalidate the token
    return Promise.resolve();
  },

  async verifyToken(token: string): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return !!response.data;
    } catch (error) {
      return false;
    }
  },
};
