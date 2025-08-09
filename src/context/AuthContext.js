
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext(null);

// // Helper function to get the base URL from environment variables
// const getApiBaseUrl = () => {
//   // Ensure this matches the variable in your .env file
//   return process.env.REACT_APP_API_BASE_URL || 'http://localhost:5500/api';
// };

// export const AuthProvider = ({ children } ) => {
//   // Initialize state from localStorage to keep the user logged in
//   const [token, setToken] = useState(localStorage.getItem('authToken'));
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // On initial load, set the axios auth header if a token exists
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }
//     // We can consider the initial loading done once the token is checked.
//     setIsLoading(false);
//   }, [token]);

//   // --- REAL LOGIN FUNCTION ---
//   const login = async (username, password) => {
//     const response = await axios.post(`${getApiBaseUrl()}/production-house/login`, {
//       username, // The backend controller expects 'username'
//       password,
//     });

//     if (response.data && response.data.token) {
//       const { token, productionHouse } = response.data;
      
//       // Store token and user info in state
//       setToken(token);
//       setUser(productionHouse);

//       // Persist token and user info in localStorage
//       localStorage.setItem('authToken', token);
//       localStorage.setItem('user', JSON.stringify(productionHouse));

//       // Set axios default header for all subsequent requests
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       return response.data;
//     } else {
//       throw new Error('Login failed: No token received.');
//     }
//   };

//   // --- REAL LOGOUT FUNCTION ---
//   const logout = () => {
//     // Clear state
//     setUser(null);
//     setToken(null);

//     // Clear localStorage
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('user');

//     // Remove axios default header
//     delete axios.defaults.headers.common['Authorization'];
//   };

//   const value = {
//     isAuthenticated: !!token, // User is authenticated if a token exists
//     user,
//     token,
//     isLoading,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the context easily
// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// Helper function to get the base URL from environment variables
const getApiBaseUrl = () => {
  // Ensure this matches the variable in your .env file
  return process.env.REACT_APP_API_BASE_URL || 'http://localhost:5500/api';
};

export const AuthProvider = ({ children }  ) => {
  // Initialize state from localStorage to keep the user logged in
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isLoading, setIsLoading] = useState(true);

  // ✅ 1. Add new state for the delete toggle
  // It reads the initial value from localStorage, defaulting to 'false' if not found.
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(
    localStorage.getItem('isDeleteEnabled') === 'true'
  );

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
    // ✅ Also clear the delete toggle state on logout for security
    localStorage.removeItem('isDeleteEnabled'); 
    setIsDeleteEnabled(false); // Reset state to false

    // Remove axios default header
    delete axios.defaults.headers.common['Authorization'];
  };

  // ✅ 2. Add the function to toggle the delete state
  const toggleDelete = () => {
    // Calculate the new state based on the current state
    const newDeleteState = !isDeleteEnabled;
    // Update the React state to trigger re-renders
    setIsDeleteEnabled(newDeleteState);
    // Update localStorage to persist the change across page loads
    localStorage.setItem('isDeleteEnabled', newDeleteState);
  };

  // ✅ 3. Add the new state and function to the context value
  const value = {
    isAuthenticated: !!token, // User is authenticated if a token exists
    user,
    token,
    isLoading,
    login,
    logout,
    isDeleteEnabled, // <-- Expose the state
    toggleDelete,    // <-- Expose the function
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Render children only when not loading to prevent flicker */}
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the context easily
export const useAuth = () => useContext(AuthContext);
