// import React from 'react';
// import PalletManager from '../components/PalletManager';
// import AssociateCompanyManager from '../components/AssociateCompanyManager';
// // ✅ 1. Import the new ReportGenerator component
// import ReportGenerator from '../components/ReportGenerator';

// const Masters = () => {
//   return (
//     <div className="container mx-auto p-4 sm:p-6 lg:p-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Admin & Master Controls</h1>
//         <p className="mt-1 text-md text-gray-500 dark:text-gray-400">Manage core application data and generate reports.</p>
//       </div>

//       {/* The components are stacked vertically with a gap */}
//       <div className="flex flex-col gap-8">
//         {/* ✅ 2. Add the ReportGenerator component here */}
//         <ReportGenerator />

//         {/* The existing manager components */}
//         <PalletManager />
//         <AssociateCompanyManager />
//       </div>
//     </div>
//   );
// };

// export default Masters;
import React from 'react';
import AssociateCompanyManager from '../components/AssociateCompanyManager';
import PalletManager from '../components/PalletManager';
import ReportGenerator from '../components/ReportGenerator';
// ✅ 1. Import the new toggle component
import DeleteToggle from '../components/DeleteToggle';

const Masters = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Admin Masters</h1>
          <p className="mt-1 text-md text-gray-500 dark:text-gray-400">Manage core application data and generate reports.</p>
        </div>
        {/* ✅ 2. Add the DeleteToggle component to the header */}
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <DeleteToggle />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <ReportGenerator />
        <PalletManager />
        <AssociateCompanyManager />
      </div>
    </div>
  );
};

export default Masters;
