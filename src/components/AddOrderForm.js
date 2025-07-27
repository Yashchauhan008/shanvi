import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

// --- DUMMY DATA (Unchanged) ---
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

const AddOrderForm = ({ onClose }) => {
  // --- State for main details ---
  const [productionHouse, setProductionHouse] = useState('');
  const [selectedPartyId, setSelectedPartyId] = useState('');
  const [availableFactories, setAvailableFactories] = useState([]);
  const [vehicle, setVehicle] = useState(''); // <-- New state for Vehicle
  const [vehicleNumber, setVehicleNumber] = useState(''); // <-- New state for Vehicle Number
  
  // --- State for dynamic pallet rows ---
  const [palletRows, setPalletRows] = useState([{ id: 1, size: '', quantity: '' }]);

  // --- State for optional inventory items ---
  const [inventory, setInventory] = useState({});

  // --- Effect to update available factories (Unchanged) ---
  useEffect(() => {
    if (selectedPartyId) {
      setAvailableFactories(allFactories.filter(f => f.partyId === selectedPartyId));
    } else {
      setAvailableFactories([]);
    }
  }, [selectedPartyId]);

  // --- Pallet Row Handlers (Unchanged) ---
  const addPalletRow = () => {
    setPalletRows([...palletRows, { id: Date.now(), size: '', quantity: '' }]);
  };
  const removePalletRow = (id) => {
    setPalletRows(palletRows.filter(row => row.id !== id));
  };
  const handlePalletChange = (id, field, value) => {
    setPalletRows(palletRows.map(row => (row.id === id ? { ...row, [field]: value } : row)));
  };

  // --- Inventory Handler (Unchanged) ---
  const handleInventoryChange = (itemName, value) => {
    setInventory(prev => ({ ...prev, [itemName]: value }));
  };

  // --- Form Submission (Updated to include vehicle details) ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      productionHouse,
      partyId: selectedPartyId,
      factoryId: e.target.factory.value,
      vehicle,
      vehicleNumber,
      pallets: palletRows.filter(p => p.size && p.quantity),
      inventory: inventory,
    };
    console.log('Order Submitted:', orderData);
    alert('Order submitted! Check the console for the data.');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* --- Main Details --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Production House</label>
          <input
            type="text"
            value={productionHouse}
            onChange={(e) => setProductionHouse(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Party Name</label>
          <select
            value={selectedPartyId}
            onChange={(e) => setSelectedPartyId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
            disabled={!selectedPartyId}
            required
          >
            <option value="">Select a Factory</option>
            {availableFactories.map(factory => <option key={factory.id} value={factory.id}>{factory.name}</option>)}
          </select>
        </div>
      </div>

      {/* --- Vehicle Details (NEW SECTION) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-6">
        <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle</label>
            <input
                type="text"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., Truck, Van"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
            <input
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., MH-12-AB-1234"
            />
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

      {/* --- Inventory Items (Optional) --- */}
      <div className="border-t pt-6">
        <h3 className="text-md font-medium text-gray-800">Inventory Items (Optional)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5 mt-2">
          {allInventoryItems.map(item => (
            <div key={item.name}>
              <label className="block text-sm font-medium text-gray-700">{item.name}</label>
              <div className="relative mt-1">
                <input
                  type="number"
                  placeholder="Quantity"
                  onChange={(e) => handleInventoryChange(item.name, e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 text-sm">{item.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Form Actions --- */}
      <div className="pt-6 flex justify-end space-x-3 border-t">
        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          Create Order
        </button>
      </div>
    </form>
  );
};

export default AddOrderForm;
