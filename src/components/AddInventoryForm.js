import React, { useState } from 'react';

// This list should ideally be managed in a central place, but for now, we define it here.
// It matches the list from the AddOrderForm for consistency.
const allInventoryItems = [
  { name: 'Film White', unit: 'kg' },
  { name: 'Film Blue', unit: 'kg' },
  { name: 'Patti Role', unit: 'kg' },
  { name: 'Packing Clip', unit: 'kg' },
  { name: 'Angle Board 24', unit: 'pcs' },
  { name: 'Angle Board 32', unit: 'pcs' },
  { name: 'Angle Board 36', unit: 'pcs' },
  { name: 'Angle Board 39', unit: 'pcs' },
  { name: 'Angle Board 48', unit: 'pcs' },
  { name: 'Cap Hit', unit: 'pcs' },
  { name: 'Cap Simple', unit: 'pcs' },
  { name: 'Firmshit', unit: 'pcs' },
  { name: 'Thermocol', unit: 'pcs' },
  { name: 'Mettle Angle', unit: 'pcs' },
  { name: 'Black Cover', unit: 'pcs' },
  { name: 'Patiya', unit: 'pcs' },
  { name: 'Plypatia', unit: 'pcs' },
];

const AddInventoryForm = ({ onSave, onClose }) => {
  const [inventoryData, setInventoryData] = useState({});

  const handleInputChange = (itemName, value) => {
    // Store values as numbers, or remove if empty
    const numericValue = value ? parseFloat(value) : undefined;
    setInventoryData(prev => ({
      ...prev,
      [itemName]: numericValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out any undefined or empty entries before saving
    const finalData = Object.entries(inventoryData)
      .filter(([key, value]) => value !== undefined && value > 0)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    if (Object.keys(finalData).length === 0) {
        alert("Please enter a quantity for at least one item.");
        return;
    }

    onSave(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-md font-medium text-gray-800">Add Stock Quantities</h3>
        <p className="text-sm text-gray-500">Enter the amount to add for each item. All fields are optional.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5 mt-4 max-h-96 overflow-y-auto pr-2">
          {allInventoryItems.map(item => (
            <div key={item.name}>
              <label className="block text-sm font-medium text-gray-700">{item.name}</label>
              <div className="relative mt-1">
                <input
                  type="number"
                  step="any" // Allows for decimal inputs for kg
                  placeholder="0"
                  onChange={(e) => handleInputChange(item.name, e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 text-sm">{item.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-end space-x-3 border-t">
        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
          Add to Stock
        </button>
      </div>
    </form>
  );
};

export default AddInventoryForm;
