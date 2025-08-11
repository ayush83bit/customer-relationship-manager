// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('cryptina_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('cryptina_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Changed to send credentials in JSON body instead of Basic Auth
      const response = await api.post('/api/auth/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const userData = {
        id: response.data.id,
        email: response.data.email,
        fullName: response.data.fullName || '',
        token: response.data.token // Ensure you're storing the token
      };

      setUser(userData);
      localStorage.setItem('cryptina_user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      // Improved error handling
      const errorMessage = error.response?.data?.message ||
                         error.response?.data?.error ||
                         error.message ||
                         'Login failed';
      throw new Error(errorMessage);
    }
  };

  const register = async (fullName, email, password) => {
    try {
      const response = await api.post('/api/auth/register', {
        fullName,
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return {
        id: response.data.id,
        email: response.data.email,
        fullName: response.data.fullName || ''
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message ||
                         error.response?.data?.error ||
                         error.message ||
                         'Registration failed';
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cryptina_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);