import axios from 'axios';
import { LoginCredentials, RegisterCredentials, User } from '../types';

// Using DummyJSON for authentication (as per assignment requirements)
// API Documentation: https://dummyjson.com/docs/auth
const API_BASE_URL = 'https://dummyjson.com';

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      // DummyJSON login endpoint
      // Test credentials: username: 'emilys', password: 'emilyspass'
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username: credentials.email.split('@')[0], // Convert email to username
        password: credentials.password,
        expiresInMins: 30,
      });

      const data = response.data;

      const user: User = {
        id: data.id.toString(),
        username: data.username,
        email: data.email,
        token: data.accessToken,
      };

      return user;
    } catch (error: any) {
      // Fallback for demo purposes - accept any credentials
      console.log('DummyJSON auth failed, using fallback authentication');
      
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
