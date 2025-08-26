// import React, { useState, useEffect } from 'react';
// import { Outlet, useNavigate, NavLink } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import ThemeToggle from './ThemeToggle'; // Assuming your ThemeToggle component is set up

// // It's a good practice to define navigation links in an array
// const navLinks = [
//   { to: '/dashboard', text: 'Dashboard' },
//   { to: '/parties', text: 'Parties' },
//   { to: '/factories', text: 'Factories' },
//   { to: '/associate-companies', text: 'Companies' },
//   { to: '/orders', text: 'Orders' },
//   { to: '/master-admin', text: 'Masters' },
// ];

// // Icon for the mobile menu button (hamburger and close)
// const MenuIcon = ({ open }) => (
//   <svg
//     className="w-6 h-6"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     {open ? (
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//      ) : (
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//     )}
//   </svg>
// );

// const Layout = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   // --- Logout Handler ---
//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate('/login');
//     } catch (error) {
//       console.error('Failed to logout:', error);
//     }
//   };

//   // --- Scroll effect for sticky nav background ---
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // --- Modern NavLink Classes ---
//   // We use functions to apply classes conditionally, which is cleaner than inline styles.
//   const getNavLinkClass = ({ isActive }) =>
//     `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
//       isActive
//         ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
//         : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
//     }`;

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//       {/* --- Sticky Floating Navigation Bar --- */}
//       <nav
//         className={`sticky top-0 z-50 transition-all duration-300 ease-in-out 
//                     md:top-4 md:mx-auto md:max-w-5xl md:rounded-xl 
//                     ${isScrolled 
//                       ? 'bg-white/80 shadow-lg backdrop-blur-lg dark:bg-gray-800/50' 
//                       : 'bg-white/50 dark:bg-gray-800/50 md:bg-transparent md:dark:bg-transparent'
//                     }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* --- Logo / Brand Name --- */}
//             <div className="flex-shrink-0">
//               <NavLink to="/dashboard" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
//                 Shanvi Enterprice
//               </NavLink>
//             </div>

//             {/* --- Desktop Navigation Links --- */}
//             <div className="hidden md:flex items-center space-x-4">
//               <ThemeToggle />
//               {navLinks.map((link) => (
//                 <NavLink key={link.to} to={link.to} className={getNavLinkClass}>
//                   {link.text}
//                 </NavLink>
//               ))}
//             </div>

//             {/* --- Right Side Actions (Desktop) --- */}
//             <div className="hidden md:flex items-center gap-4">
//               {/* <ThemeToggle /> */}
//               {/* <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
//               >
//                 Logout
//               </button> */}
//             </div>

//             {/* --- Mobile Menu Button --- */}
//             <div className="md:hidden flex items-center gap-2">
//               <ThemeToggle />
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
//                 aria-controls="mobile-menu"
//                 aria-expanded={isMenuOpen}
//               >
//                 <span className="sr-only">Open main menu</span>
//                 <MenuIcon open={isMenuOpen} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* --- Mobile Menu (collapsible) --- */}
//         {isMenuOpen && (
//           <div className="md:hidden" id="mobile-menu">
//             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//               {navLinks.map((link) => (
//                 <NavLink
//                   key={link.to}
//                   to={link.to}
//                   className={({ isActive }) =>
//                     `block px-3 py-2 rounded-md text-base font-medium ${
//                       isActive
//                         ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
//                         : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
//                     }`
//                   }
//                   onClick={() => setIsMenuOpen(false)} // Close menu on click
//                 >
//                   {link.text}
//                 </NavLink>
//               ))}
//               {/* <div className="pt-4 pb-2 border-t border-gray-200 dark:border-gray-700">
//                  <button
//                     onClick={handleLogout}
//                     className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50"
//                   >
//                     Logout
//                   </button>
//               </div> */}
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* --- Main Content Area --- */}
//       <main className="p-4 sm:p-6 lg:p-8">
//         {/* The <Outlet> renders the active page content */}
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Layout;


import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { to: '/dashboard', text: 'Dashboard' },
  { to: '/parties', text: 'Parties' },
  { to: '/factories', text: 'Factories' },
  { to: '/associate-companies', text: 'Companies' },
  { to: '/orders', text: 'Orders' },
  { to: '/master-admin', text: 'Masters' },
];

const MenuIcon = ({ open }) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    {open ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
     ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    )}
  </svg>
);

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive
        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
        : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
    }`;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ease-in-out 
                    md:top-4 md:mx-auto md:max-w-5xl md:rounded-xl 
                    ${isScrolled 
                      ? 'bg-white/80 shadow-lg backdrop-blur-lg dark:bg-gray-800/80' 
                      : 'bg-white/50 dark:bg-gray-800/50 md:bg-transparent md:dark:bg-transparent'
                    }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              {/* ✅ --- THIS IS THE FIX --- */}
              {/* The NavLink now contains spans with responsive classes */}
              <NavLink to="/dashboard" className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                <span>Shanvi</span>
                {/* 
                  - `hidden`: Hidden by default on small screens.
                  - `md:inline`: Becomes visible at the 'md' breakpoint (768px).
                  - `lg:hidden`: Hides again at the 'lg' breakpoint (1024px).
                  - This creates the 768px-1024px visibility window.
                */}
                <span className="hidden md:inline lg:hidden">&nbsp;</span>
                <span className="hidden lg:inline"> Enterprise</span>
              </NavLink>
              {/* ✅ --- END OF FIX --- */}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={getNavLinkClass}>
                  {link.text}
                </NavLink>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
            </div>

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
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
