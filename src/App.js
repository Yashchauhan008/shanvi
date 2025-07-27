import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import Components
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Parties from './pages/Parties';             // <-- Import new page
import PartyDetail from './pages/PartyDetail';     // <-- Import new page
import Factories from './pages/Factories';         // <-- Import new page
import FactoryDetail from './pages/FactoryDetail'; // <-- Import new page

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes using the main layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/parties" element={<Parties />} />
              <Route path="/party/:id" element={<PartyDetail />} /> {/* Dynamic route for party details */}
              <Route path="/factories" element={<Factories />} />
              <Route path="/factory/:id" element={<FactoryDetail />} /> {/* Dynamic route for factory details */}
              {/* <Route path="/orders" element={<Orders />} /> */}
            </Route>
          </Route>
          
          {/* Redirect root to dashboard if logged in, otherwise to login */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
