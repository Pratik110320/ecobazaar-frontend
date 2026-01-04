// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('ecobazaar_token'));

  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem('ecobazaar_token');
      const savedUser = localStorage.getItem('ecobazaar_user');
      
      if (savedToken && savedUser) {
        try {
          // Verify token is still valid
          const response = await authService.validateToken(savedToken);
          if (response.data.valid) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('ecobazaar_token');
            localStorage.removeItem('ecobazaar_user');
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          localStorage.removeItem('ecobazaar_token');
          localStorage.removeItem('ecobazaar_user');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      
      if (response.data.token && response.data.user) {
        const { token: newToken, user: userData } = response.data;
        
        // Store token and user data
        localStorage.setItem('ecobazaar_token', newToken);
        localStorage.setItem('ecobazaar_user', JSON.stringify(userData));
        
        setToken(newToken);
        setUser(userData);
        
        return { success: true, data: userData };
      } else {
        return { 
          success: false, 
          error: response.data.error || 'Login failed - no token received' 
        };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Login failed';
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      
      if (response.data.token && response.data.user) {
        // Auto-login after registration
        const { token: newToken, user: registeredUser } = response.data;
        
        localStorage.setItem('ecobazaar_token', newToken);
        localStorage.setItem('ecobazaar_user', JSON.stringify(registeredUser));
        
        setToken(newToken);
        setUser(registeredUser);
        
        return { success: true, data: registeredUser };
      } else {
        // Registration succeeded but no auto-login
        return { success: true, data: response.data };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Registration failed';
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ecobazaar_token');
    localStorage.removeItem('ecobazaar_user');
  };

  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    setUser(newUserData);
    localStorage.setItem('ecobazaar_user', JSON.stringify(newUserData));
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user && !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
