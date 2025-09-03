// src/components/EditInventoryForm.js

import React, { useState, useEffect } from 'react';

const allInventoryItems = [
    { name: 'Film White', unit: 'kg', schemaKey: 'film_white' }, { name: 'Film Blue', unit: 'kg', schemaKey: 'film_blue' },
    { name: 'Patti Role', unit: 'kg', schemaKey: 'patti_role' }, { name: 'Packing Clip', unit: 'kg', schemaKey: 'packing_clip' },
    { name: 'Angle Board 24', unit: 'pcs', schemaKey: 'angle_board_24' }, { name: 'Angle Board 32', unit: 'pcs', schemaKey: 'angle_board_32' },
    { name: 'Angle Board 36', unit: 'pcs', schemaKey: 'angle_board_36' }, { name: 'Angle Board 39', unit: 'pcs', schemaKey: 'angle_board_39' },
    { name: 'Angle Board 48', unit: 'pcs', schemaKey: 'angle_board_48' }, { name: 'Cap Hit', unit: 'pcs', schemaKey: 'cap_hit' },
    { name: 'Cap Simple', unit: 'pcs', schemaKey: 'cap_simple' }, { name: 'Firmshit', unit: 'pcs', schemaKey: 'firmshit' },
    { name: 'Thermocol', unit: 'pcs', schemaKey: 'thermocol' }, { name: 'Mettle Angle', unit: 'pcs', schemaKey: 'mettle_angle' },
    { name: 'Black Cover', unit: 'pcs', schemaKey: 'black_cover' }, { name: 'Patiya', unit: 'pcs', schemaKey: 'patiya' },
    { name: 'Plypatia', unit: 'pcs', schemaKey: 'plypatia' },
];

const EditInventoryForm = ({ currentInventory, onSave, onClose, isSubmitting }) => {
  const [inventoryData, setInventoryData] = useState({});

  // Pre-fill the form with current inventory values when the component loads
  useEffect(() => {
    const initialData = {};
    allInventoryItems.forEach(item => {
      const inventoryItem = currentInventory.find(inv => inv.name === item.name);
      initialData[item.schemaKey] = inventoryItem ? inventoryItem.quantity : 0;
    });
    setInventoryData(initialData);
  }, [currentInventory]);

  const handleInputChange = (schemaKey, value) => {
    const numericValue = value ? parseFloat(value) : 0;
    setInventoryData(prev => ({ ...prev, [schemaKey]: numericValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(inventoryData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Set the exact current stock level for each item. This will overwrite the previous value.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5 mt-4 max-h-96 overflow-y-auto pr-2">
          {allInventoryItems.map(item => (
            <div key={item.schemaKey}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</label>
              <div className="relative mt-1">
                <input
                  type="number"
                  step="any"
                  placeholder="0"
                  value={inventoryData[item.schemaKey] || ''}
                  onChange={(e) => handleInputChange(item.schemaKey, e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{item.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-5 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700">
        <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800">
          {isSubmitting ? 'Saving...' : 'Save Stock Levels'}
        </button>
      </div>
    </form>
  );
};

export default EditInventoryForm;
