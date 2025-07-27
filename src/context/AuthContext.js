// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   // Initialize state from localStorage to persist login across page refreshes
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem('isAuthenticated') === 'true'
//   );
//   const [isLoading, setIsLoading] = useState(true);

//   // Use useEffect to simulate the initial verification check
//   useEffect(() => {
//     // Check localStorage on component mount
//     const storedAuthState = localStorage.getItem('isAuthenticated') === 'true';
//     setIsAuthenticated(storedAuthState);
//     // Simulate loading delay (like a real API call)
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 500); // 0.5 second delay
//   }, []);

//   // Dummy login function
//   const login = async (email, password) => {
//     // Simulate an API call delay
//     await new Promise(resolve => setTimeout(resolve, 500));

//     // Dummy validation: accept any user with the password "password"
//     if (password === 'password') {
//       localStorage.setItem('isAuthenticated', 'true');
//       setIsAuthenticated(true);
//       return Promise.resolve(); // Indicate success
//     } else {
//       return Promise.reject(new Error('Invalid credentials')); // Indicate failure
//     }
//   };

//   // Dummy logout function
//   const logout = async () => {
//     // Simulate an API call delay
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     localStorage.removeItem('isAuthenticated');
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// Helper function to get the base URL from environment variables
const getApiBaseUrl = () => {
  // Ensure this matches the variable in your .env file
  return process.env.REACT_APP_API_BASE_URL || 'http://localhost:5500/api';
};

export const AuthProvider = ({ children } ) => {
  // Initialize state from localStorage to keep the user logged in
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On initial load, set the axios auth header if a token exists
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    // We can consider the initial loading done once the token is checked.
    setIsLoading(false);
  }, [token]);

  // --- REAL LOGIN FUNCTION ---
  const login = async (username, password) => {
    const response = await axios.post(`${getApiBaseUrl()}/production-house/login`, {
      username, // The backend controller expects 'username'
      password,
    });

    if (response.data && response.data.token) {
      const { token, productionHouse } = response.data;
      
      // Store token and user info in state
      setToken(token);
      setUser(productionHouse);

      // Persist token and user info in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(productionHouse));

      // Set axios default header for all subsequent requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return response.data;
    } else {
      throw new Error('Login failed: No token received.');
    }
  };

  // --- REAL LOGOUT FUNCTION ---
  const logout = () => {
    // Clear state
    setUser(null);
    setToken(null);

    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Remove axios default header
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    isAuthenticated: !!token, // User is authenticated if a token exists
    user,
    token,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the context easily
export const useAuth = () => useContext(AuthContext);
