
// import React from 'react';
// import PalletManager from '../components/PalletManager';
// import AssociateCompanyManager from '../components/AssociateCompanyManager';
// import ThemeToggle from '../components/ThemeToggle'; // ✅ Import the new component

// const MastersAdmin = () => {
//   return (
//     // ✅ Add dark mode classes for background and text colors
//     <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">MastersAdmin</h1>
//           <p className="mt-1 text-md text-gray-500 dark:text-gray-400">Manage core application data.</p>
//         </div>
//         {/* ✅ Add the ThemeToggle component here */}
//         <div>
//           <ThemeToggle />
//         </div>
//       </div>

//       <div className="flex flex-col gap-8">
//         <PalletManager />
//         <AssociateCompanyManager />
//       </div>
//     </div>
//   );
// };

// export default MastersAdmin;


import React from 'react';
import PalletManager from '../components/PalletManager';
import AssociateCompanyManager from '../components/AssociateCompanyManager';
// ✅ 1. Import the new ReportGenerator component
import ReportGenerator from '../components/ReportGenerator';

const Masters = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Admin & Master Controls</h1>
        <p className="mt-1 text-md text-gray-500 dark:text-gray-400">Manage core application data and generate reports.</p>
      </div>

      {/* The components are stacked vertically with a gap */}
      <div className="flex flex-col gap-8">
        {/* ✅ 2. Add the ReportGenerator component here */}
        <ReportGenerator />

        {/* The existing manager components */}
        <PalletManager />
        <AssociateCompanyManager />
      </div>
    </div>
  );
};

export default Masters;
