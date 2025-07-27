import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage to persist login across page refreshes
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [isLoading, setIsLoading] = useState(true);

  // Use useEffect to simulate the initial verification check
  useEffect(() => {
    // Check localStorage on component mount
    const storedAuthState = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(storedAuthState);
    // Simulate loading delay (like a real API call)
    setTimeout(() => {
      setIsLoading(false);
    }, 500); // 0.5 second delay
  }, []);

  // Dummy login function
  const login = async (email, password) => {
    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Dummy validation: accept any user with the password "password"
    if (password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      return Promise.resolve(); // Indicate success
    } else {
      return Promise.reject(new Error('Invalid credentials')); // Indicate failure
    }
  };

  // Dummy logout function
  const logout = async () => {
    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
