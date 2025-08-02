// import React from 'react';
// // Import Link from react-router-dom
// import { Outlet, useNavigate, Link, NavLink } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Layout = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate('/login');
//     } catch (error) {
//       console.error('Failed to logout');
//     }
//   };

//   // Style for the active NavLink
//   const activeLinkStyle = {
//     backgroundColor: '#eef2ff', // bg-indigo-50
//     color: '#4338ca', // text-indigo-700
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Constant Navigation Bar */}
//       <nav className="bg-white shadow-md">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo or App Name */}
//             <div className="flex-shrink-0">
//               <h1 className="text-2xl font-bold text-indigo-600">Shanvi</h1>
//             </div>
            
//             {/* Navigation Links - NOW USING <NavLink> */}
//             <div className="hidden md:block">
//               <div className="ml-10 flex items-baseline space-x-4">
//                 {/* Use NavLink for automatic active styling */}
//                 <NavLink 
//                   to="/dashboard" 
//                   className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
//                   style={({ isActive }) => isActive ? activeLinkStyle : undefined}
//                 >
//                   Dashboard
//                 </NavLink>
//                 <NavLink 
//                   to="/parties" 
//                   className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
//                   style={({ isActive }) => isActive ? activeLinkStyle : undefined}
//                 >
//                   Parties
//                 </NavLink>
//                 <NavLink 
//                   to="/factories" 
//                   className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
//                   style={({ isActive }) => isActive ? activeLinkStyle : undefined}
//                 >
//                   Factories
//                 </NavLink>
//                 <NavLink 
//                   to="/orders" 
//                   className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
//                   style={({ isActive }) => isActive ? activeLinkStyle : undefined}
//                 >
//                   Orders
//                 </NavLink>
//                 <NavLink 
//                   to="/master-admin" 
//                   className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
//                   style={({ isActive }) => isActive ? activeLinkStyle : undefined}
//                 >
//                   Master
//                 </NavLink>
//               </div>
//             </div>

//             {/* Logout Button */}
//             <div className="ml-4">
//               <button 
//                 onClick={handleLogout} 
//                 className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content Area */}
//       <main>
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Layout;

import React from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// ✅ It's good practice to add the toggle to the main layout as well
import ThemeToggle from './ThemeToggle'; 

const Layout = () => {
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

  // Style for the active NavLink
  const activeLinkStyle = {
    backgroundColor: '#eef2ff', // bg-indigo-50
    color: '#4338ca', // text-indigo-700
  };

  // ✅ Style for the active NavLink in DARK MODE
  const activeLinkDarkStyle = {
    backgroundColor: '#312e81', // A dark indigo color
    color: '#ffffff', // White text
  };

  return (
    // ✅ Add dark mode classes to the main container
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* ✅ Add dark mode classes to the Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Shanvi</h1>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* Use a function in the style prop to check for theme */}
                <NavLink 
                  to="/dashboard" 
                  // ✅ Add dark mode classes for text and hover states
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  style={({ isActive }) => 
                    isActive ? (document.documentElement.classList.contains('dark') ? activeLinkDarkStyle : activeLinkStyle) : undefined
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/parties" 
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  style={({ isActive }) => 
                    isActive ? (document.documentElement.classList.contains('dark') ? activeLinkDarkStyle : activeLinkStyle) : undefined
                  }
                >
                  Parties
                </NavLink>
                <NavLink 
                  to="/factories" 
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  style={({ isActive }) => 
                    isActive ? (document.documentElement.classList.contains('dark') ? activeLinkDarkStyle : activeLinkStyle) : undefined
                  }
                >
                  Factories
                </NavLink>
                <NavLink 
                  to="/orders" 
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  style={({ isActive }) => 
                    isActive ? (document.documentElement.classList.contains('dark') ? activeLinkDarkStyle : activeLinkStyle) : undefined
                  }
                >
                  Orders
                </NavLink>
                 <NavLink 
                  to="/master-admin" 
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  style={({ isActive }) => 
                    isActive ? (document.documentElement.classList.contains('dark') ? activeLinkDarkStyle : activeLinkStyle) : undefined
                  }
                >
                  Masters
                </NavLink>
              </div>
            </div>

            {/* Right side actions */}
            <div className="ml-4 flex items-center gap-4">
              {/* ✅ Add the ThemeToggle to the main navbar */}
              <ThemeToggle />
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main>
        {/* The <Outlet> will render the active page (e.g., Dashboard, Parties) */}
        {/* Those pages will also need dark mode classes applied to them. */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
