import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

// Helper function to get today's date in YYYY-MM-DD format.
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const AddBillForm = ({ onSave, onClose, isSubmitting }) => {
  // --- State for Data Fetched from API ---
  const [parties, setParties] = useState([]);
  const [associateCompanies, setAssociateCompanies] = useState([]);
  const [palletSizes, setPalletSizes] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- State for Form Inputs ---
  const { user } = useAuth();
  const [source, setSource] = useState('');
  const [sourceModel, setSourceModel] = useState('ProductionHouse');
  const [selectedPartyId, setSelectedPartyId] = useState('');
  const [selectedFactoryId, setSelectedFactoryId] = useState('');
  const [availableFactories, setAvailableFactories] = useState([]);
  const [billDate, setBillDate] = useState(getTodayDateString());
  const [palletRows, setPalletRows] = useState([{ id: 1, size: '', quantity: '' }]);

  // --- Data Fetching Effect ---
  useEffect(() => {
    const fetchFormData = async () => {
      setLoading(true);
      try {
        const [partiesRes, associateCompaniesRes, palletsRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/parties`),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/associate-companies`),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/pallets`),
        ]);
        setParties(partiesRes.data);
        setAssociateCompanies(associateCompaniesRes.data);
        setPalletSizes(palletsRes.data);
        if (user?.id) {
          setSource(user.id);
        }
      } catch (error) {
        console.error("Failed to fetch form data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFormData();
  }, [user]);

  // --- Effect to Filter Factories ---
  useEffect(() => {
    if (selectedPartyId) {
      const selectedParty = parties.find(p => p._id === selectedPartyId);
      setAvailableFactories(selectedParty?.factory_ids || []);
      setSelectedFactoryId('');
    } else {
      setAvailableFactories([]);
    }
  }, [selectedPartyId, parties]);

  // --- Form Submission Handler ---
  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter to get only the valid, completed pallet rows
    const validPalletRows = palletRows.filter(p => p.size && p.quantity && Number(p.quantity) > 0);

    // Validation Check: Ensure at least one valid pallet row exists.
    if (validPalletRows.length === 0) {
      alert("Validation Error: You must add at least one pallet with a selected size and a quantity greater than 0.");
      return; // Stop the submission
    }

    // If validation passes, build the data object
    const billData = {
      transactionType: 'bill',
      vehicle: 'N/A',
      vehicle_number: 'N/A',
      source,
      sourceModel,
      party_id: selectedPartyId,
      factory_id: selectedFactoryId,
      date: billDate,
      items: validPalletRows.map(({ size, quantity }) => ({
        paletSize: size,
        quantity: parseInt(quantity, 10)
      })),
    };
    onSave(billData);
  };

  // --- Other Handlers ---
  const addPalletRow = () => setPalletRows([...palletRows, { id: Date.now(), size: '', quantity: '' }]);
  const removePalletRow = (id) => setPalletRows(palletRows.filter(row => row.id !== id));
  const handlePalletChange = (id, field, value) => {
    setPalletRows(palletRows.map(row => (row.id === id ? { ...row, [field]: value } : row)));
  };
  const handleSourceChange = (e) => {
    const [model, id] = e.target.value.split(':');
    setSource(id);
    setSourceModel(model);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading form data...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* --- Main Details Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Bill Date</label>
          <input type="date" value={billDate} onChange={(e) => setBillDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Source</label>
          <select value={`${sourceModel}:${source}`} onChange={handleSourceChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md" required>
            {user && <option value={`ProductionHouse:${user.id}`}>{user.username} (You)</option>}
            <optgroup label="Associate Companies">
              {associateCompanies.map(comp => <option key={comp._id} value={`AssociateCompany:${comp._id}`}>{comp.name}</option>)}
            </optgroup>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Party Name</label>
          <select value={selectedPartyId} onChange={(e) => setSelectedPartyId(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md" required>
            <option value="">Select a Party</option>
            {parties.map(party => <option key={party._id} value={party._id}>{party.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Factory Name</label>
          <select value={selectedFactoryId} onChange={(e) => setSelectedFactoryId(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md" disabled={!selectedPartyId} required>
            <option value="">Select a Factory</option>
            {availableFactories.map(factory => <option key={factory._id} value={factory._id}>{factory.name}</option>)}
          </select>
        </div>
      </div>

      {/* --- Pallet Details Section --- */}
      <div className="border-t pt-6">
        <h3 className="text-md font-medium text-gray-800">Pallet Details</h3>
        <div className="space-y-3 mt-2">
          {palletRows.map((row) => (
            <div key={row.id} className="flex items-center gap-2">
              <select value={row.size} onChange={(e) => handlePalletChange(row.id, 'size', e.target.value)} className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md">
                <option value="">Select Pallet Size</option>
                {palletSizes.map(pallet => <option key={pallet._id} value={pallet.name}>{pallet.name}</option>)}
              </select>
              <input type="text" pattern="[0-9]*" inputMode="numeric" placeholder="Quantity" value={row.quantity} onChange={(e) => handlePalletChange(row.id, 'quantity', e.target.value.replace(/[^0-9]/g, ''))} className="block w-48 px-3 py-2 border border-gray-300 rounded-md" />
              {palletRows.length > 1 && <button type="button" onClick={() => removePalletRow(row.id)} className="text-red-500 hover:text-red-700 p-1"><TrashIcon className="h-5 w-5" /></button>}
            </div>
          ))}
        </div>
        <button type="button" onClick={addPalletRow} className="mt-3 flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800"><PlusIcon className="h-4 w-4" /> Add More Pallets</button>
      </div>

      {/* --- Form Actions --- */}
      <div className="pt-6 flex justify-end space-x-3 border-t">
        <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? 'Creating...' : 'Create Bill'}
        </button>
      </div>
    </form>
  );
};

export default AddBillForm;
