
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

// const getTodayDateString = () => new Date().toISOString().split('T')[0];

// const FormInput = (props) => (
//   <input {...props} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50" />
// );

// const FormSelect = ({ children, ...props }) => (
//   <select {...props} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50">
//     {children}
//   </select>
// );

// const AddBillForm = ({ onSave, onClose, isSubmitting }) => {
//   const [parties, setParties] = useState([]);
//   const [associateCompanies, setAssociateCompanies] = useState([]);
//   const [palletSizes, setPalletSizes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();
//   const [source, setSource] = useState('');
//   const [sourceModel, setSourceModel] = useState('ProductionHouse');
//   const [selectedPartyId, setSelectedPartyId] = useState('');
//   const [selectedFactoryId, setSelectedFactoryId] = useState('');
//   const [availableFactories, setAvailableFactories] = useState([]);
//   const [billDate, setBillDate] = useState(getTodayDateString());
//   const [palletRows, setPalletRows] = useState([{ id: 1, size: '', quantity: '' }]);
  
//   // ✅ --- THIS IS THE FIX (Part 1) ---
//   // Add state for the new vehicle and vehicle number fields.
//   const [vehicle, setVehicle] = useState('');
//   const [vehicleNumber, setVehicleNumber] = useState('');
//   // ✅ --- END OF FIX (Part 1) ---

//   useEffect(() => {
//     const fetchFormData = async () => {
//       setLoading(true);
//       try {
//         const [partiesRes, associateCompaniesRes, palletsRes] = await Promise.all([
//           axios.get(`${process.env.REACT_APP_API_BASE_URL}/parties`),
//           axios.get(`${process.env.REACT_APP_API_BASE_URL}/associate-companies`),
//           axios.get(`${process.env.REACT_APP_API_BASE_URL}/pallets`),
//         ]);
//         setParties(partiesRes.data);
//         setAssociateCompanies(associateCompaniesRes.data);
//         setPalletSizes(palletsRes.data);
//         if (user?.id) setSource(user.id);
//       } catch (error) {
//         console.error("Failed to fetch form data", error);
//         alert("Error: Could not load necessary data for the form.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFormData();
//   }, [user]);

//   useEffect(() => {
//     const selectedParty = parties.find(p => p._id === selectedPartyId);
//     setAvailableFactories(selectedParty?.factory_ids || []);
//     setSelectedFactoryId('');
//   }, [selectedPartyId, parties]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validPalletRows = palletRows.filter(p => p.size && p.quantity && Number(p.quantity) > 0);
//     if (validPalletRows.length === 0) {
//       alert("Validation Error: You must add at least one pallet with a selected size and a quantity greater than 0.");
//       return;
//     }
    
//     // ✅ --- THIS IS THE FIX (Part 3) ---
//     // Add the new vehicle and vehicle_number fields to the data sent to the backend.
//     const billData = {
//       transactionType: 'bill',
//       vehicle: vehicle, // Add vehicle
//       vehicle_number: vehicleNumber, // Add vehicle number
//       source,
//       sourceModel,
//       party_id: selectedPartyId,
//       factory_id: selectedFactoryId,
//       date: billDate,
//       items: validPalletRows.map(({ size, quantity }) => ({ paletSize: size, quantity: parseInt(quantity, 10) })),
//     };
//     // ✅ --- END OF FIX (Part 3) ---
    
//     onSave(billData);
//   };

//   const addPalletRow = () => setPalletRows([...palletRows, { id: Date.now(), size: '', quantity: '' }]);
//   const removePalletRow = (id) => setPalletRows(palletRows.filter(row => row.id !== id));
//   const handlePalletChange = (id, field, value) => setPalletRows(palletRows.map(row => (row.id === id ? { ...row, [field]: value } : row)));
//   const handleSourceChange = (e) => {
//     const [model, id] = e.target.value.split(':');
//     setSource(id);
//     setSourceModel(model);
//   };

//   if (loading) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading form data...</div>;

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bill Date</label>
//           <FormInput type="date" value={billDate} onChange={(e) => setBillDate(e.target.value)} required />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Source</label>
//           <FormSelect value={`${sourceModel}:${source}`} onChange={handleSourceChange} required>
//             {user && <option value={`ProductionHouse:${user.id}`}>{user.username} (You)</option>}
//             <optgroup label="Associate Companies">
//               {associateCompanies.map(comp => <option key={comp._id} value={`AssociateCompany:${comp._id}`}>{comp.name}</option>)}
//             </optgroup>
//           </FormSelect>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Party Name</label>
//           <FormSelect value={selectedPartyId} onChange={(e) => setSelectedPartyId(e.target.value)} required>
//             <option value="">Select a Party</option>
//             {parties.map(party => <option key={party._id} value={party._id}>{party.name}</option>)}
//           </FormSelect>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Factory Name</label>
//           <FormSelect value={selectedFactoryId} onChange={(e) => setSelectedFactoryId(e.target.value)} disabled={!selectedPartyId} required>
//             <option value="">Select a Factory</option>
//             {availableFactories.map(factory => <option key={factory._id} value={factory._id}>{factory.name}</option>)}
//           </FormSelect>
//         </div>
//       </div>

//       {/* ✅ --- THIS IS THE FIX (Part 2) --- */}
//       {/* Add the new input fields for vehicle information. */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle</label>
//           <FormInput type="text" value={vehicle} onChange={(e) => setVehicle(e.target.value)} placeholder="e.g., Truck, Van" required />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle Number</label>
//           <FormInput type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} placeholder="e.g., MH-12-AB-1234" required />
//         </div>
//       </div>
//       {/* ✅ --- END OF FIX (Part 2) --- */}

//       <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//         <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">Pallet Details</h3>
//         <div className="space-y-3 mt-2">
//           {palletRows.map((row) => (
//             <div key={row.id} className="flex items-center gap-2">
//               <FormSelect value={row.size} onChange={(e) => handlePalletChange(row.id, 'size', e.target.value)}><option value="">Select Pallet Size</option>{palletSizes.map(p => <option key={p._id} value={p.name}>{p.name}</option>)}</FormSelect>
//               <FormInput type="text" pattern="[0-9]*" inputMode="numeric" placeholder="Quantity" value={row.quantity} onChange={(e) => handlePalletChange(row.id, 'quantity', e.target.value.replace(/[^0-9]/g, ''))} className="w-48" />
//               {palletRows.length > 1 && <button type="button" onClick={() => removePalletRow(row.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"><TrashIcon className="h-5 w-5" /></button>}
//             </div>
//           ))}
//         </div>
//         <button type="button" onClick={addPalletRow} className="mt-3 flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"><PlusIcon className="h-4 w-4" /> Add More Pallets</button>
//       </div>

//       <div className="pt-6 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700">
//         <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">Cancel</button>
//         <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800">
//           {isSubmitting ? 'Creating...' : 'Create Bill'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddBillForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const FormInput = (props) => (
  <input {...props} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50" />
);

const FormSelect = ({ children, ...props }) => (
  <select {...props} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50">
    {children}
  </select>
);

const AddBillForm = ({ onSave, onClose, isSubmitting }) => {
  const [parties, setParties] = useState([]);
  const [associateCompanies, setAssociateCompanies] = useState([]);
  const [palletSizes, setPalletSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [source, setSource] = useState('');
  const [sourceModel, setSourceModel] = useState('ProductionHouse');
  const [selectedPartyId, setSelectedPartyId] = useState('');
  const [selectedFactoryId, setSelectedFactoryId] = useState('');
  const [availableFactories, setAvailableFactories] = useState([]);
  const [billDate, setBillDate] = useState(getTodayDateString());
  
  // ✅ --- THIS IS THE FIX ---
  // The initial state for palletRows is now an array with two empty rows.
  const [palletRows, setPalletRows] = useState([
    { id: 1, size: '', quantity: '' },
    { id: 2, size: '', quantity: '' }
  ]);
  // ✅ --- END OF FIX ---

  const [vehicle, setVehicle] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');

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
        if (user?.id) setSource(user.id);
      } catch (error) {
        console.error("Failed to fetch form data", error);
        alert("Error: Could not load necessary data for the form.");
      } finally {
        setLoading(false);
      }
    };
    fetchFormData();
  }, [user]);

  useEffect(() => {
    const selectedParty = parties.find(p => p._id === selectedPartyId);
    setAvailableFactories(selectedParty?.factory_ids || []);
    setSelectedFactoryId('');
  }, [selectedPartyId, parties]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validPalletRows = palletRows.filter(p => p.size && p.quantity && Number(p.quantity) > 0);
    if (validPalletRows.length === 0) {
      alert("Validation Error: You must add at least one pallet with a selected size and a quantity greater than 0.");
      return;
    }
    const billData = {
      transactionType: 'bill',
      vehicle: vehicle,
      vehicle_number: vehicleNumber,
      source,
      sourceModel,
      party_id: selectedPartyId,
      factory_id: selectedFactoryId,
      date: billDate,
      items: validPalletRows.map(({ size, quantity }) => ({ paletSize: size, quantity: parseInt(quantity, 10) })),
    };
    onSave(billData);
  };

  const addPalletRow = () => setPalletRows([...palletRows, { id: Date.now(), size: '', quantity: '' }]);
  const removePalletRow = (id) => setPalletRows(palletRows.filter(row => row.id !== id));
  const handlePalletChange = (id, field, value) => setPalletRows(palletRows.map(row => (row.id === id ? { ...row, [field]: value } : row)));
  const handleSourceChange = (e) => {
    const [model, id] = e.target.value.split(':');
    setSource(id);
    setSourceModel(model);
  };

  if (loading) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading form data...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bill Date</label>
          <FormInput type="date" value={billDate} onChange={(e) => setBillDate(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Source</label>
          <FormSelect value={`${sourceModel}:${source}`} onChange={handleSourceChange} required>
            {user && <option value={`ProductionHouse:${user.id}`}>{user.username} (You)</option>}
            <optgroup label="Associate Companies">
              {associateCompanies.map(comp => <option key={comp._id} value={`AssociateCompany:${comp._id}`}>{comp.name}</option>)}
            </optgroup>
          </FormSelect>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Party Name</label>
          <FormSelect value={selectedPartyId} onChange={(e) => setSelectedPartyId(e.target.value)} required>
            <option value="">Select a Party</option>
            {parties.map(party => <option key={party._id} value={party._id}>{party.name}</option>)}
          </FormSelect>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Factory Name</label>
          <FormSelect value={selectedFactoryId} onChange={(e) => setSelectedFactoryId(e.target.value)} disabled={!selectedPartyId} required>
            <option value="">Select a Factory</option>
            {availableFactories.map(factory => <option key={factory._id} value={factory._id}>{factory.name}</option>)}
          </FormSelect>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle</label>
          <FormInput type="text" value={vehicle} onChange={(e) => setVehicle(e.target.value)} placeholder="e.g., Truck, Van" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle Number</label>
          <FormInput type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} placeholder="e.g., MH-12-AB-1234" required />
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">Pallet Details</h3>
        <div className="space-y-3 mt-2">
          {palletRows.map((row) => (
            <div key={row.id} className="flex items-center gap-2">
              <FormSelect value={row.size} onChange={(e) => handlePalletChange(row.id, 'size', e.target.value)}><option value="">Select Pallet Size</option>{palletSizes.map(p => <option key={p._id} value={p.name}>{p.name}</option>)}</FormSelect>
              <FormInput type="text" pattern="[0-9]*" inputMode="numeric" placeholder="Quantity" value={row.quantity} onChange={(e) => handlePalletChange(row.id, 'quantity', e.target.value.replace(/[^0-9]/g, ''))} className="w-48" />
              {palletRows.length > 1 && <button type="button" onClick={() => removePalletRow(row.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"><TrashIcon className="h-5 w-5" /></button>}
            </div>
          ))}
        </div>
        <button type="button" onClick={addPalletRow} className="mt-3 flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"><PlusIcon className="h-4 w-4" /> Add More Pallets</button>
      </div>

      <div className="pt-6 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700">
        <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800">
          {isSubmitting ? 'Creating...' : 'Create Bill'}
        </button>
      </div>
    </form>
  );
};

export default AddBillForm;
