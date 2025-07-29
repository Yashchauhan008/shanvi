import React from 'react';
import PalletManager from '../components/PalletManager';
import AssociateCompanyManager from '../components/AssociateCompanyManager'; // <-- Import the new component

const MastersAdmin = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Masters</h1>
          <p className="mt-1 text-md text-gray-500">Manage core application data.</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* The existing Pallet Manager */}
        <PalletManager />

        {/* The new Associate Company Manager */}
        <AssociateCompanyManager /> 
      </div>
    </div>
  );
};

export default MastersAdmin;
