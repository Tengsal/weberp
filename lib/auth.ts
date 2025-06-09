import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from './api';

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'employee';
  profile: {
    firstName: string;
    lastName: string;
    phone?: string;
    address?: any;
    department?: string;
    position?: string;
    employeeId?: string;
  };
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = Cookies.get('auth_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      Cookies.remove('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      Cookies.set('auth_token', token, { expires: 7 });
      setUser(user);
      
      return { success: true, user };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const registerStep1 = async (email: string, password: string, role: string) => {
    try {
      const response = await api.post('/auth/register/step1', { email, password, role });
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const registerStep2 = async (profileData: any, tempToken: string) => {
    try {
      const response = await api.post('/auth/register/step2', { 
        ...profileData, 
        tempToken 
      });
      const { token, user } = response.data;
      
      Cookies.set('auth_token', token, { expires: 7 });
      setUser(user);
      
      return { success: true, user };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    Cookies.remove('auth_token');
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    registerStep1,
    registerStep2,
    logout,
    isAuthenticated: !!user,
  };
};