
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

// // ✅ --- THIS IS THE FIX ---
// // The "Patti Roll" object was missing and has been added back.
// const allInventoryItems = [
//     { name: 'Film White', schemaKey: 'film_white', unit: 'kg' },
//     { name: 'Film Blue', schemaKey: 'film_blue', unit: 'kg' },
//     { name: 'Patti Roll', schemaKey: 'patti_roll', unit: 'kg' }, // <-- CORRECTED
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
//     { name: 'Metal Angle', schemaKey: 'metal_angle', unit: 'pcs' },
//     { name: 'Black Cover', schemaKey: 'black_cover', unit: 'pcs' },
//     { name: 'Patiya', schemaKey: 'patiya', unit: 'pcs' },
//     { name: 'Plypatia', schemaKey: 'plypatia', unit: 'pcs' },
// ];
// // ✅ --- END OF FIX ---

// const getTodayDateString = () => new Date().toISOString().split('T')[0];

// const FormInput = (props) => (
//   <input {...props} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50" />
// );

// const FormSelect = ({ children, ...props }) => (
//   <select {...props} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50">
//     {children}
//   </select>
// );

// const AddOrderForm = ({ onSave, onClose, isSubmitting }) => {
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
//   const [vehicle, setVehicle] = useState('');
//   const [vehicleNumber, setVehicleNumber] = useState('');
//   const [palletRows, setPalletRows] = useState([
//     { id: 1, size: '', quantity: '' },
//     { id: 2, size: '', quantity: '' }
//   ]);
//   const [inventory, setInventory] = useState({});
//   const [orderDate, setOrderDate] = useState(getTodayDateString());

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
//     const orderData = {
//       source, sourceModel, transactionType: 'order', party_id: selectedPartyId,
//       factory_id: selectedFactoryId, date: orderDate, vehicle, vehicle_number: vehicleNumber,
//       items: validPalletRows.map(({ size, quantity }) => ({ paletSize: size, quantity: parseInt(quantity, 10) })),
//     };
//     for (const item of allInventoryItems) {
//       if (inventory[item.schemaKey]) {
//         orderData[item.schemaKey] = inventory[item.schemaKey];
//       }
//     }
//     onSave(orderData);
//   };

//   const addPalletRow = () => setPalletRows([...palletRows, { id: Date.now(), size: '', quantity: '' }]);
//   const removePalletRow = (id) => setPalletRows(palletRows.filter(row => row.id !== id));
//   const handlePalletChange = (id, field, value) => setPalletRows(palletRows.map(row => (row.id === id ? { ...row, [field]: value } : row)));

//   const handleInventoryChange = (schemaKey, value) => {
//     let sanitizedValue;
//     if (schemaKey.startsWith('cap_')) {
//       sanitizedValue = value.replace(/[^0-9+\s]/g, '');
//     } else {
//       sanitizedValue = value.replace(/[^0-9.]/g, '');
//     }
//     setInventory(prev => ({ ...prev, [schemaKey]: sanitizedValue }));
//   };

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
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Order Date</label>
//           <FormInput type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />
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

//       <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//         <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">Inventory Items (Optional)</h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5 mt-2 max-h-60 overflow-y-auto pr-2">
//           {allInventoryItems.map(item => (
//             <div key={item.schemaKey}>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</label>
//               <div className="relative mt-1">
//                 <FormInput
//                   type="text"
//                   value={inventory[item.schemaKey] || ''}
//                   onChange={(e) => handleInventoryChange(item.schemaKey, e.target.value)}
//                   placeholder={item.schemaKey.startsWith('cap_') ? "e.g., 50+20" : "e.g., 50.5"}
//                   inputMode="decimal"
//                 />
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"><span className="text-gray-500 dark:text-gray-400 text-sm">{item.unit}</span></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="pt-6 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700">
//         <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">Cancel</button>
//         <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
//           {isSubmitting ? 'Creating...' : 'Create Order'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddOrderForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

const allInventoryItems = [
    { name: 'Film White', schemaKey: 'film_white', unit: 'kg' },
    { name: 'Film Blue', schemaKey: 'film_blue', unit: 'kg' },
    { name: 'Patti Roll', schemaKey: 'patti_roll', unit: 'kg' },
    { name: 'Packing Clip', schemaKey: 'packing_clip', unit: 'kg' },
    { name: 'Angle Board 24', schemaKey: 'angle_board_24', unit: 'pcs' },
    { name: 'Angle Board 32', schemaKey: 'angle_board_32', unit: 'pcs' },
    { name: 'Angle Board 36', schemaKey: 'angle_board_36', unit: 'pcs' },
    { name: 'Angle Board 39', schemaKey: 'angle_board_39', unit: 'pcs' },
    { name: 'Angle Board 48', schemaKey: 'angle_board_48', unit: 'pcs' },
    { name: 'Cap Hit', schemaKey: 'cap_hit', unit: 'pcs' },
    { name: 'Cap Simple', schemaKey: 'cap_simple', unit: 'pcs' },
    { name: 'Firmshit', schemaKey: 'firmshit', unit: 'pcs' },
    { name: 'Thermocol', schemaKey: 'thermocol', unit: 'pcs' },
    { name: 'Metal Angle', schemaKey: 'metal_angle', unit: 'pcs' },
    { name: 'Black Cover', schemaKey: 'black_cover', unit: 'pcs' },
    { name: 'Patiya', schemaKey: 'patiya', unit: 'pcs' },
    { name: 'Plypatia', schemaKey: 'plypatia', unit: 'pcs' },
];

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const FormInput = (props) => (
  <input {...props} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50" />
);

const FormSelect = ({ children, ...props }) => (
  <select {...props} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50">
    {children}
  </select>
);

const sanitizeDecimal = (value) => {
  let sanitized = value.replace(/[^0-9.]/g, '');
  const parts = sanitized.split('.');
  if (parts.length > 2) {
    sanitized = parts[0] + '.' + parts.slice(1).join('');
  }
  const decimalPart = parts[1];
  if (decimalPart && decimalPart.length > 2) {
    sanitized = parts[0] + '.' + decimalPart.substring(0, 2);
  }
  return sanitized;
};

const AddOrderForm = ({ onSave, onClose, isSubmitting }) => {
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
  const [vehicle, setVehicle] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [palletRows, setPalletRows] = useState([
    { id: 1, size: '', quantity: '' },
    { id: 2, size: '', quantity: '' }
  ]);
  const [inventory, setInventory] = useState({});
  const [orderDate, setOrderDate] = useState(getTodayDateString());

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
    const orderData = {
      source, sourceModel, transactionType: 'order', party_id: selectedPartyId,
      factory_id: selectedFactoryId, date: orderDate, vehicle, vehicle_number: vehicleNumber,
      items: validPalletRows.map(({ size, quantity }) => ({ paletSize: size, quantity: parseInt(quantity, 10) })),
    };
    for (const item of allInventoryItems) {
      if (inventory[item.schemaKey]) {
        orderData[item.schemaKey] = inventory[item.schemaKey];
      }
    }
    onSave(orderData);
  };

  const addPalletRow = () => setPalletRows([...palletRows, { id: Date.now(), size: '', quantity: '' }]);
  const removePalletRow = (id) => setPalletRows(palletRows.filter(row => row.id !== id));
  const handlePalletChange = (id, field, value) => setPalletRows(palletRows.map(row => (row.id === id ? { ...row, [field]: value } : row)));

  const handleInventoryChange = (schemaKey, value) => {
    let sanitizedValue;
    if (schemaKey.startsWith('cap_')) {
      sanitizedValue = value.replace(/[^0-9.+\s]/g, '');
    } else {
      sanitizedValue = sanitizeDecimal(value);
    }
    setInventory(prev => ({ ...prev, [schemaKey]: sanitizedValue }));
  };

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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Order Date</label>
          <FormInput type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />
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

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">Inventory Items (Optional)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5 mt-2 max-h-60 overflow-y-auto pr-2">
          {allInventoryItems.map(item => (
            <div key={item.schemaKey}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</label>
              <div className="relative mt-1">
                <FormInput
                  type="text"
                  value={inventory[item.schemaKey] || ''}
                  onChange={(e) => handleInventoryChange(item.schemaKey, e.target.value)}
                  placeholder={item.schemaKey.startsWith('cap_') ? "e.g., 50+20" : "e.g., 50.5"}
                  inputMode="decimal"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"><span className="text-gray-500 dark:text-gray-400 text-sm">{item.unit}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700">
        <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
          {isSubmitting ? 'Creating...' : 'Create Order'}
        </button>
      </div>
    </form>
  );
};

export default AddOrderForm;
