import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import Components
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import { Analytics } from '@vercel/analytics/react';

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Parties from './pages/Parties';
import PartyDetail from './pages/PartyDetail';
import Factories from './pages/Factories';
import FactoryDetail from './pages/FactoryDetail';
import Orders from './pages/Orders'; // <-- Import the new Orders page
import MasterAdmin from './pages/MasterAdmin';

import { ThemeProvider } from './context/ThemeContext'; // ✅ Import the ThemeProvider
import AssociateCompanies from './pages/AssociateCompanies';
import AssociateCompanyDetail from './pages/AssociateCompanyDetail';


function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/op-register" element={<Register />} />

          {/* Protected routes using the main layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/parties" element={<Parties />} />
              <Route path="/party/:id" element={<PartyDetail />} />
              <Route path="/factories" element={<Factories />} />
              <Route path="/factory/:id" element={<FactoryDetail />} />
              <Route path="/associate-companies" element={<AssociateCompanies />} />
              <Route path="/associate-company/:id" element={<AssociateCompanyDetail />} />
              <Route path="/orders" element={<Orders />} /> {/* <-- Add the new route here */}
              <Route path="/master-admin" element={<MasterAdmin />} /> {/* <-- Add the new route */}
            </Route>
          </Route>
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
      <Analytics />
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
