
// import React from 'react';
// import PalletManager from '../components/PalletManager';
// import ReportGenerator from '../components/ReportGenerator';
// // ✅ 1. Import the new toggle component
// import DeleteToggle from '../components/DeleteToggle';

// const Masters = () => {
//   return (
//     <div className="container mx-auto p-4 sm:p-6 lg:p-8">
//       <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Admin Masters</h1>
//           <p className="mt-1 text-md text-gray-500 dark:text-gray-400">Manage core application data and generate reports.</p>
//         </div>
//         {/* ✅ 2. Add the DeleteToggle component to the header */}
//         <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//           <DeleteToggle />
//         </div>
//       </div>

//       <div className="flex flex-col gap-8">
//         <ReportGenerator />
//         <PalletManager />
//       </div>
//     </div>
//   );
// };

// export default Masters;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PalletManager from '../components/PalletManager';
import ReportGenerator from '../components/ReportGenerator';
import DeleteToggle from '../components/DeleteToggle';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import VersionHistory from '../components/VersionHistory';

// The component name is changed to match the router if needed, or keep as Masters.
const MasterAdmin = () => {
  // 1. Import hooks for logout functionality
  const { logout } = useAuth();
  const navigate = useNavigate();

  // 2. Define the logout handler
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        await logout();
        navigate('/login');
      } catch (error) {
        console.error('Failed to logout', error);
        alert('Logout failed. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* ✅ YOUR EXACT UI - UNCHANGED */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Admin Masters</h1>
          <p className="mt-1 text-md text-gray-500 dark:text-gray-400">Manage core application data and generate reports.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <DeleteToggle />
        </div>
      </div>

      {/* ✅ YOUR EXACT UI - WITH THE MISSING COMPONENT ADDED */}
      <div className="flex flex-col gap-8">
        <ReportGenerator />
        <PalletManager />
        <VersionHistory />

        {/* This component was missing from your provided code but likely intended to be here */}
      </div>
      {/* ✅ END OF YOUR UI */}

      {/* ✅ 3. ADD THE LOGOUT BUTTON AT THE END */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex justify-center">
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg shadow-sm hover:bg-red-100 dark:hover:bg-red-900/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <span>Logout from Application</span>
        </button>
      </div>
    </div>
  );
};

export default MasterAdmin;
