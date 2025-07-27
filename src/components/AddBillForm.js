import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

// --- DUMMY DATA (This would come from props or a global state) ---
const allParties = [
  { id: 'p1', name: 'Alpha Traders' },
  { id: 'p2', name: 'Beta Logistics' },
  { id: 'p3', name: 'Gamma Supplies' },
];
const allFactories = [
  { id: 'f1', name: 'Alpha Steel', partyId: 'p1' },
  { id: 'f2', name: 'Alpha Packaging', partyId: 'p1' },
  { id: 'f3', name: 'Beta Warehouse', partyId: 'p2' },
  { id: 'f4', name: 'Gamma Plastics', partyId: 'p3' },
];
const allPalletSizes = ['200x200', '800x800', '1200x600', '1000x1000', '1100x900'];

const AddBillForm = ({ onClose }) => {
  // State for the main dropdowns
  const [selectedPartyId, setSelectedPartyId] = useState('');
  const [availableFactories, setAvailableFactories] = useState([]);
  
  // State for the dynamic pallet rows
  const [palletRows, setPalletRows] = useState([{ id: 1, size: '', quantity: '' }]);

  // Effect to update available factories when a party is selected
  useEffect(() => {
    if (selectedPartyId) {
      setAvailableFactories(allFactories.filter(f => f.partyId === selectedPartyId));
    } else {
      setAvailableFactories([]);
    }
  }, [selectedPartyId]);

  // --- Pallet Row Handlers ---
  const addPalletRow = () => {
    setPalletRows([...palletRows, { id: Date.now(), size: '', quantity: '' }]);
  };

  const removePalletRow = (id) => {
    setPalletRows(palletRows.filter(row => row.id !== id));
  };

  const handlePalletChange = (id, field, value) => {
    setPalletRows(palletRows.map(row => (row.id === id ? { ...row, [field]: value } : row)));
  };

  // --- Form Submission ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const billData = {
      partyId: selectedPartyId,
      factoryId: e.target.factory.value,
      pallets: palletRows.filter(p => p.size && p.quantity), // Only include valid rows
    };
    console.log('Bill Submitted:', billData);
    alert('Bill submitted! Check the console for the data.');
    onClose(); // Close the modal on submit
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* --- Main Details --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Party Name</label>
          <select
            value={selectedPartyId}
            onChange={(e) => setSelectedPartyId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm"
            required
          >
            <option value="">Select a Party</option>
            {allParties.map(party => <option key={party.id} value={party.id}>{party.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Factory Name</label>
          <select
            name="factory"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm"
            disabled={!selectedPartyId}
            required
          >
            <option value="">Select a Factory</option>
            {availableFactories.map(factory => <option key={factory.id} value={factory.id}>{factory.name}</option>)}
          </select>
        </div>
      </div>

      {/* --- Pallet Details (Dynamic) --- */}
      <div className="border-t pt-6">
        <h3 className="text-md font-medium text-gray-800">Pallet Details</h3>
        <div className="space-y-3 mt-2">
          {palletRows.map((row) => (
            <div key={row.id} className="flex items-center gap-2">
              <select
                value={row.size}
                onChange={(e) => handlePalletChange(row.id, 'size', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
              >
                <option value="">Pallet Size</option>
                {allPalletSizes.map(size => <option key={size} value={size}>{size}</option>)}
              </select>
              <input
                type="number"
                placeholder="Quantity"
                value={row.quantity}
                onChange={(e) => handlePalletChange(row.id, 'quantity', e.target.value)}
                className="block w-48 px-3 py-2 border border-gray-300 rounded-md"
              />
              {palletRows.length > 1 && (
                <button type="button" onClick={() => removePalletRow(row.id)} className="text-red-500 hover:text-red-700 p-1">
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addPalletRow}
          className="mt-3 flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          <PlusIcon className="h-4 w-4" />
          Add More Pallets
        </button>
      </div>

      {/* --- Form Actions --- */}
      <div className="pt-6 flex justify-end space-x-3 border-t">
        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Create Bill
        </button>
      </div>
    </form>
  );
};

export default AddBillForm;
