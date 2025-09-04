
// import React, { useState, useEffect } from 'react';

// const allInventoryItems = [
//     { name: 'Film White', schemaKey: 'film_white', unit: 'kg' },
//     { name: 'Film Blue', schemaKey: 'film_blue', unit: 'kg' },
//     { name: 'Patti Roll', schemaKey: 'patti_roll', unit: 'kg' },
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

// const EditInventoryForm = ({ currentInventory, onSave, onClose, isSubmitting }) => {
//   const [inventoryData, setInventoryData] = useState({});

//   useEffect(() => {
//     const initialData = {};
//     if (currentInventory) { // Check if the prop is defined
//       allInventoryItems.forEach(item => {
//         const inventoryItem = currentInventory.find(inv => inv.schemaKey === item.schemaKey);
//         initialData[item.schemaKey] = inventoryItem ? inventoryItem.quantity : 0;
//       });
//     }
//     setInventoryData(initialData);
//   }, [currentInventory]);

//   const handleInputChange = (schemaKey, value) => {
//     const sanitizedValue = value.replace(/[^0-9.]/g, '');
//     setInventoryData(prev => ({ ...prev, [schemaKey]: sanitizedValue }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(inventoryData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div>
//         <p className="text-sm text-gray-600 dark:text-gray-400">Set the exact current stock level for each item. This will overwrite the previous value.</p>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5 mt-4 max-h-96 overflow-y-auto pr-2">
//           {allInventoryItems.map(item => (
//             <div key={item.schemaKey}>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</label>
//               <div className="relative mt-1">
//                 <input
//                   type="text"
//                   inputMode="decimal"
//                   placeholder="0"
//                   value={inventoryData[item.schemaKey] || ''}
//                   onChange={(e) => handleInputChange(item.schemaKey, e.target.value)}
//                   className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                 />
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
//                   <span className="text-gray-500 dark:text-gray-400 text-sm">{item.unit}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="pt-5 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700">
//         <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">
//           Cancel
//         </button>
//         <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800">
//           {isSubmitting ? 'Saving...' : 'Save Stock Levels'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EditInventoryForm;
import React, { useState, useEffect } from 'react';

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

const EditInventoryForm = ({ currentInventory, onSave, onClose, isSubmitting }) => {
  const [inventoryData, setInventoryData] = useState({});

  useEffect(() => {
    const initialData = {};
    if (currentInventory) {
      allInventoryItems.forEach(item => {
        const inventoryItem = currentInventory.find(inv => inv.schemaKey === item.schemaKey);
        initialData[item.schemaKey] = inventoryItem ? inventoryItem.quantity : 0;
      });
    }
    setInventoryData(initialData);
  }, [currentInventory]);

  const handleInputChange = (schemaKey, value) => {
    const sanitizedValue = sanitizeDecimal(value);
    setInventoryData(prev => ({ ...prev, [schemaKey]: sanitizedValue }));
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
                  type="text"
                  inputMode="decimal"
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
