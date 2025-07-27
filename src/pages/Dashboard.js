import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="p-10 text-center bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">Welcome to the Dashboard</h1>
        <p className="mb-6 text-lg text-gray-600">You are successfully logged in!</p>
        <button 
          onClick={handleLogout} 
          className="px-6 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
