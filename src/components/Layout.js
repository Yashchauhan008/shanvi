// import React from 'react';
// import { Outlet, useNavigate, NavLink } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// // ✅ It's good practice to add the toggle to the main layout as well
// import ThemeToggle from './ThemeToggle'; 

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

//   // ✅ Style for the active NavLink in DARK MODE
//   const activeLinkDarkStyle = {
//     backgroundColor: '#312e81', // A dark indigo color
//     color: '#ffffff', // White text
//   };

//   return (
//     // ✅ Add dark mode classes to the main container
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
//       {/* ✅ Add dark mode classes to the Navigation Bar */}
//       <nav className="bg-white dark:bg-gray-800 shadow-md">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex-shrink-0">
//               <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Shanvi</h1>
//             </div>
            
//             <div className="hidden md:block">
//               <div className="ml-10 flex items-baseline space-x-4">
//                 {/* Use a function in the style prop to check for theme */}
//                 <NavLink 
//                   to="/dashboard" 
//                   // ✅ Add dark mode classes for text and hover states
//                   className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
//                   style={({ isActive }) => 
//                     isActive ? (document.documentElement.classList.contains('dark') ? activeLinkDarkStyle : activeLinkStyle) : undefined
//                   }
//                 >
//                   Dashboard
//                 </NavLink>
//                 <NavLink 
//                   to="/parties" 
//                   className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
//                   style={({ isActive }) => 
//                     isActive ? (document.documentElement.classList.contains('dark') ? activeLinkDarkStyle : activeLinkStyle) : undefined
//                   }
//                 >
//                   Parties
//                 </NavLink>
//                 <NavLink 
//                   to="/factories" 
//                   className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
//                   style={({ isActive }) => 
//                     isActive ? (document.documentElement.classList.contains('dark') ? activeLinkDarkStyle : activeLinkStyle) : undefined
//                   }
//                 >
//                   Factories
//                 </NavLink>
//                 <NavLink 
//                   to="/orders" 
//                   className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
//                   style={({ isActive }) => 
//                     isActive ? (document.documentElement.classList.contains('dark') ? activeLinkDarkStyle : activeLinkStyle) : undefined
//                   }
//                 >
//                   Orders
//                 </NavLink>
//                  <NavLink 
//                   to="/master-admin" 
//                   className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
//                   style={({ isActive }) => 
//                     isActive ? (document.documentElement.classList.contains('dark') ? activeLinkDarkStyle : activeLinkStyle) : undefined
//                   }
//                 >
//                   Masters
//                 </NavLink>
//               </div>
//             </div>

//             {/* Right side actions */}
//             <div className="ml-4 flex items-center gap-4">
//               {/* ✅ Add the ThemeToggle to the main navbar */}
//               <ThemeToggle />
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
//         {/* The <Outlet> will render the active page (e.g., Dashboard, Parties) */}
//         {/* Those pages will also need dark mode classes applied to them. */}
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Layout;

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle'; // Assuming your ThemeToggle component is set up

// It's a good practice to define navigation links in an array
const navLinks = [
  { to: '/dashboard', text: 'Dashboard' },
  { to: '/parties', text: 'Parties' },
  { to: '/factories', text: 'Factories' },
  { to: '/orders', text: 'Orders' },
  { to: '/master-admin', text: 'Masters' },
];

// Icon for the mobile menu button (hamburger and close)
const MenuIcon = ({ open }) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {open ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
     ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    )}
  </svg>
);

const Layout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // --- Logout Handler ---
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  // --- Scroll effect for sticky nav background ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Modern NavLink Classes ---
  // We use functions to apply classes conditionally, which is cleaner than inline styles.
  const getNavLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive
        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
        : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
    }`;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* --- Sticky Floating Navigation Bar --- */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ease-in-out 
                    md:top-4 md:mx-auto md:max-w-5xl md:rounded-xl 
                    ${isScrolled 
                      ? 'bg-white/80 shadow-lg backdrop-blur-lg dark:bg-gray-800/50' 
                      : 'bg-white/50 dark:bg-gray-800/50 md:bg-transparent md:dark:bg-transparent'
                    }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* --- Logo / Brand Name --- */}
            <div className="flex-shrink-0">
              <NavLink to="/dashboard" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                Shanvi
              </NavLink>
            </div>

            {/* --- Desktop Navigation Links --- */}
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={getNavLinkClass}>
                  {link.text}
                </NavLink>
              ))}
            </div>

            {/* --- Right Side Actions (Desktop) --- */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
              >
                Logout
              </button>
            </div>

            {/* --- Mobile Menu Button --- */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <MenuIcon open={isMenuOpen} />
              </button>
            </div>
          </div>
        </div>

        {/* --- Mobile Menu (collapsible) --- */}
        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
                        : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {link.text}
                </NavLink>
              ))}
              <div className="pt-4 pb-2 border-t border-gray-200 dark:border-gray-700">
                 <button
                    onClick={handleLogout}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50"
                  >
                    Logout
                  </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* --- Main Content Area --- */}
      <main className="p-4 sm:p-6 lg:p-8">
        {/* The <Outlet> renders the active page content */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
