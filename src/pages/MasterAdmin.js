import React from 'react';
import PalletManager from '../components/PalletManager'; // <-- Import the new component

const MastersAdmin = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Masters</h1>
          <p className="mt-1 text-md text-gray-500">Manage core application data like pallet sizes.</p>
        </div>
      </div>

      {/* 
        The main content area.
        We simply render the PalletManager component here.
        All the complex logic is now neatly contained within it.
      */}
      <div className="space-y-8">
        <PalletManager />

        {/* 
          FUTURE-PROOF: If you need to add another master editor, 
          you can just create another component like 'VehicleManager' 
          and place it here.
          
          <VehicleManager /> 
        */}
      </div>
    </div>
  );
};

export default MastersAdmin;
