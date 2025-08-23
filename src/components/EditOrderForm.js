// // src/components/EditOrderForm.js (Create this new file)

// import React, { useState, useEffect } from 'react';
// import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid';

// const allInventoryItems = [
//     { name: 'Film White', schemaKey: 'film_white', unit: 'kg' },
//     { name: 'Film Blue', schemaKey: 'film_blue', unit: 'kg' },
//     { name: 'Patti Role', schemaKey: 'patti_role', unit: 'kg' },
//     { name: 'Packing Clip', schemaKey: 'packing_clip', unit: 'kg' },
//     { name: 'Angle Board 24', schemaKey: 'angle_board_24', unit: 'pcs' },
//     { name: 'Angle Board 32', schemaKey: 'angle_board_32', unit: 'pcs' },
//     { name: 'Angle Board 36', schemaKey: 'angle_board_36', unit: 'pcs' },
//     { name: 'Angle Board 39', schemaKey: 'angle_board_39', unit: 'pcs' },
//     { name: 'Angle Board 48', schemaKey: 'angle_board_48', unit: 'pcs' },
//     { name: 'Cap Hit', schemaKey: 'cap_hit', unit: 'pcs' },
//     { name: 'Cap Simple', schemaKey: 'cap_simple', unit: 'pcs' },
//     { name: 'Firmshit', schemaKey: 'firmshit', unit: 'pcs' },
//     { name: 'Thermocol', schemaKey: 'thermocol', unit: 'pcs' },
//     { name: 'Mettle Angle', schemaKey: 'mettle_angle', unit: 'pcs' },
//     { name: 'Black Cover', schemaKey: 'black_cover', unit: 'pcs' },
//     { name: 'Patiya', schemaKey: 'patiya', unit: 'pcs' },
//     { name: 'Plypatia', schemaKey: 'plypatia', unit: 'pcs' },
// ];

// const EditOrderForm = ({ orderToEdit, onSave, onClose, isSubmitting }) => {
//   const [formData, setFormData] = useState({});
//   const [palletRows, setPalletRows] = useState([]);

//   useEffect(() => {
//     if (orderToEdit) {
//       setFormData({
//         date: new Date(orderToEdit.date).toISOString().split('T')[0],
//         vehicle: orderToEdit.vehicle || '',
//         vehicle_number: orderToEdit.vehicle_number || '',
//         ...allInventoryItems.reduce((acc, item) => {
//           acc[item.schemaKey] = orderToEdit[item.schemaKey] || '';
//           return acc;
//         }, {})
//       });
//       setPalletRows(orderToEdit.items.map((item, index) => ({ ...item, id: index })));
//     }
//   }, [orderToEdit]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePalletChange = (id, field, value) => {
//     setPalletRows(rows => rows.map(row => (row.id === id ? { ...row, [field]: value } : row)));
//   };

//   const addPalletRow = () => setPalletRows([...palletRows, { id: Date.now(), paletSize: '', quantity: '' }]);
//   const removePalletRow = (id) => setPalletRows(palletRows.filter(row => row.id !== id));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const finalData = {
//       ...formData,
//       items: palletRows.map(({ paletSize, quantity }) => ({ paletSize, quantity: Number(quantity) })),
//     };
//     onSave(orderToEdit._id, finalData);
//   };

//   if (!orderToEdit) return null;

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Date</label>
//           <input type="date" name="date" value={formData.date || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Vehicle</label>
//           <input type="text" name="vehicle" value={formData.vehicle || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
//           <input type="text" name="vehicle_number" value={formData.vehicle_number || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
//         </div>
//       </div>

//       <div className="border-t pt-6">
//         <h3 className="text-md font-medium text-gray-800">Pallet Details</h3>
//         <div className="space-y-3 mt-2">
//           {palletRows.map((row) => (
//             <div key={row.id} className="flex items-center gap-2">
//               <input type="text" placeholder="Pallet Size" value={row.paletSize} onChange={(e) => handlePalletChange(row.id, 'paletSize', e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md" />
//               <input type="number" placeholder="Quantity" value={row.quantity} onChange={(e) => handlePalletChange(row.id, 'quantity', e.target.value)} className="block w-48 px-3 py-2 border border-gray-300 rounded-md" />
//               <button type="button" onClick={() => removePalletRow(row.id)} className="text-red-500 hover:text-red-700 p-1"><TrashIcon className="h-5 w-5" /></button>
//             </div>
//           ))}
//         </div>
//         <button type="button" onClick={addPalletRow} className="mt-3 flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800"><PlusIcon className="h-4 w-4" /> Add More Pallets</button>
//       </div>

//       <div className="border-t pt-6">
//         <h3 className="text-md font-medium text-gray-800">Inventory Items</h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5 mt-2">
//           {allInventoryItems.map(item => (
//             <div key={item.schemaKey}>
//               <label className="block text-sm font-medium text-gray-700">{item.name}</label>
//               <input type="number" name={item.schemaKey} value={formData[item.schemaKey] || ''} onChange={handleInputChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md" />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="pt-6 flex justify-end space-x-3 border-t">
//         <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
//         <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">{isSubmitting ? 'Saving...' : 'Save Changes'}</button>
//       </div>
//     </form>
//   );
// };

// export default EditOrderForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid';

// --- Reusable Styled Components with Enhanced Focus ---

// This custom input component now includes focus ring styles for better keyboard accessibility.
const FormInput = (props) => (
  <input 
    {...props} 
    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50" 
  />
);

// This custom select component also gets the same focus ring styles.
const FormSelect = ({ children, ...props }) => (
  <select 
    {...props} 
    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50"
  >
    {children}
  </select>
);


const EditOrderForm = ({ orderToEdit, onSave, onClose, isSubmitting }) => {
  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({});
  const [palletRows, setPalletRows] = useState([]);
  const [parties, setParties] = useState([]);
  const [factories, setFactories] = useState([]);
  const [availableFactories, setAvailableFactories] = useState([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(true);

  // --- DATA FETCHING & STATE INITIALIZATION ---

  // Fetch data for Party and Factory dropdowns.
  useEffect(() => {
    const fetchDropdownData = async () => {
      setLoadingDropdowns(true);
      try {
        const [partiesRes, factoriesRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/parties`),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/factories`),
        ]);
        setParties(partiesRes.data);
        setFactories(factoriesRes.data);
      } catch (error) {
        console.error("Failed to load dropdown data for edit form", error);
        alert("Could not load parties and factories. Please try again.");
      } finally {
        setLoadingDropdowns(false);
      }
    };
    fetchDropdownData();
  }, []);

  // Pre-populate the form with the existing order's data.
  useEffect(() => {
    if (orderToEdit) {
      setFormData({
        date: new Date(orderToEdit.date).toISOString().split('T')[0],
        vehicle: orderToEdit.vehicle || '',
        vehicle_number: orderToEdit.vehicle_number || '',
        party_id: orderToEdit.party_id?._id || '',
        factory_id: orderToEdit.factory_id?._id || '',
      });
      setPalletRows(orderToEdit.items.map((item, index) => ({ ...item, id: index })));
    }
  }, [orderToEdit]);

  // Filter available factories based on the selected party.
  useEffect(() => {
    if (formData.party_id && factories.length > 0) {
      const filtered = factories.filter(f => f.party_id?._id === formData.party_id);
      setAvailableFactories(filtered);
    } else {
      setAvailableFactories([]);
    }
  }, [formData.party_id, factories]);

  // --- EVENT HANDLERS ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'party_id') {
      setFormData(prev => ({ ...prev, factory_id: '' }));
    }
  };

  const handlePalletChange = (id, field, value) => {
    setPalletRows(rows => rows.map(row => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const addPalletRow = () => setPalletRows([...palletRows, { id: Date.now(), paletSize: '', quantity: '' }]);
  const removePalletRow = (id) => setPalletRows(palletRows.filter(row => row.id !== id));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.party_id || !formData.factory_id) {
      alert("Party and Factory must be selected.");
      return;
    }
    const finalData = {
      ...formData,
      items: palletRows.map(({ paletSize, quantity }) => ({ paletSize, quantity: Number(quantity) })),
    };
    onSave(orderToEdit._id, finalData);
  };

  // --- RENDER LOGIC ---

  if (loadingDropdowns || !orderToEdit) {
    return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading form...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Source is displayed as read-only text */}
      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Source</label>
        <p className="mt-1 text-md font-semibold text-gray-800 dark:text-gray-200">
          {orderToEdit.source?.name || orderToEdit.source?.username || 'N/A'}
        </p>
      </div>

      {/* Party and Factory are editable dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Party Name</label>
          <FormSelect name="party_id" value={formData.party_id || ''} onChange={handleInputChange} required>
            <option value="">Select a Party</option>
            {parties.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
          </FormSelect>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Factory Name</label>
          <FormSelect name="factory_id" value={formData.factory_id || ''} onChange={handleInputChange} disabled={!formData.party_id} required>
            <option value="">Select a Factory</option>
            {availableFactories.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
          </FormSelect>
        </div>
      </div>

      {/* Date and Vehicle info are editable inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
          <FormInput type="date" name="date" value={formData.date || ''} onChange={handleInputChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle</label>
          <FormInput type="text" name="vehicle" value={formData.vehicle || ''} onChange={handleInputChange} placeholder="e.g., Truck, Van" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle Number</label>
          <FormInput type="text" name="vehicle_number" value={formData.vehicle_number || ''} onChange={handleInputChange} placeholder="e.g., MH-12-AB-1234" />
        </div>
      </div>

      {/* Pallet items are editable */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">Pallet Details</h3>
        <div className="space-y-3 mt-2">
          {palletRows.map((row) => (
            <div key={row.id} className="flex items-center gap-2">
              <FormInput type="text" placeholder="Pallet Size" value={row.paletSize} onChange={(e) => handlePalletChange(row.id, 'paletSize', e.target.value)} />
              <FormInput type="number" placeholder="Quantity" value={row.quantity} onChange={(e) => handlePalletChange(row.id, 'quantity', e.target.value)} className="w-48" />
              <button type="button" onClick={() => removePalletRow(row.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"><TrashIcon className="h-5 w-5" /></button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addPalletRow} className="mt-3 flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"><PlusIcon className="h-4 w-4" /> Add More Pallets</button>
      </div>

      {/* Form action buttons */}
      <div className="pt-6 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700">
        <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default EditOrderForm;
