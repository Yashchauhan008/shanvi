// import React, { useState } from 'react';

// // This list defines the form fields. It's important that the 'name' property
// // matches what the backend expects after formatting (e.g., "Film White").
// const allInventoryItems = [
//   { name: 'Film White', unit: 'kg', schemaKey: 'film_white' },
//   { name: 'Film Blue', unit: 'kg', schemaKey: 'film_blue' },
//   { name: 'Patti Role', unit: 'kg', schemaKey: 'patti_role' },
//   { name: 'Packing Clip', unit: 'kg', schemaKey: 'packing_clip' },
//   { name: 'Angle Board 24', unit: 'pcs', schemaKey: 'angle_board_24' },
//   { name: 'Angle Board 32', unit: 'pcs', schemaKey: 'angle_board_32' },
//   { name: 'Angle Board 36', unit: 'pcs', schemaKey: 'angle_board_36' },
//   { name: 'Angle Board 39', unit: 'pcs', schemaKey: 'angle_board_39' },
//   { name: 'Angle Board 48', unit: 'pcs', schemaKey: 'angle_board_48' },
//   { name: 'Cap Hit', unit: 'pcs', schemaKey: 'cap_hit' },
//   { name: 'Cap Simple', unit: 'pcs', schemaKey: 'cap_simple' },
//   { name: 'Firmshit', unit: 'pcs', schemaKey: 'firmshit' },
//   { name: 'Thermocol', unit: 'pcs', schemaKey: 'thermocol' },
//   { name: 'Mettle Angle', unit: 'pcs', schemaKey: 'mettle_angle' },
//   { name: 'Black Cover', unit: 'pcs', schemaKey: 'black_cover' },
//   { name: 'Patiya', unit: 'pcs', schemaKey: 'patiya' },
//   { name: 'Plypatia', unit: 'pcs', schemaKey: 'plypatia' },
// ];

// const AddInventoryForm = ({ onSave, onClose }) => {
//   const [inventoryData, setInventoryData] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false); // State to prevent double-clicks

//   const handleInputChange = (itemName, value) => {
//     // Store values as numbers, or set to undefined if the input is empty
//     const numericValue = value ? parseFloat(value) : undefined;
//     setInventoryData(prev => ({
//       ...prev,
//       [itemName]: numericValue,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Filter out any undefined or empty entries before saving
//     const finalData = Object.entries(inventoryData)
//       .filter(([key, value]) => value !== undefined && value > 0)
//       .reduce((obj, [key, value]) => {
//         obj[key] = value;
//         return obj;
//       }, {});

//     if (Object.keys(finalData).length === 0) {
//         alert("Please enter a quantity for at least one item.");
//         setIsSubmitting(false); // Re-enable the button
//         return;
//     }

//     // The onSave function is now the API call handler passed from Dashboard.js
//     onSave(finalData);
    
//     // The parent component (Dashboard) will handle closing the modal on success.
//     // We can re-enable the button after a short delay in case of an error.
//     setTimeout(() => setIsSubmitting(false), 1000);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div>
//         <h3 className="text-md font-medium text-gray-800">Add Stock Quantities</h3>
//         <p className="text-sm text-gray-500">Enter the amount to add for each item. All fields are optional.</p>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5 mt-4 max-h-96 overflow-y-auto pr-2">
//           {allInventoryItems.map(item => (
//             <div key={item.name}>
//               <label className="block text-sm font-medium text-gray-700">{item.name}</label>
//               <div className="relative mt-1">
//                 <input
//                   type="number"
//                   step="any"
//                   placeholder="0"
//                   // The key for the state is the user-friendly name, e.g., "Film White"
//                   onChange={(e) => handleInputChange(item.name, e.target.value)}
//                   className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
//                   <span className="text-gray-500 text-sm">{item.unit}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="pt-4 flex justify-end space-x-3 border-t">
//         <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50">
//           Cancel
//         </button>
//         <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
//           {isSubmitting ? 'Adding...' : 'Add to Stock'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddInventoryForm;
import React, { useState } from 'react';

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

const AddInventoryForm = ({ onSave, onClose, isSubmitting }) => {
  const [inventoryData, setInventoryData] = useState({});

  const handleInputChange = (schemaKey, value) => {
    const numericValue = value ? parseFloat(value) : undefined;
    setInventoryData(prev => ({ ...prev, [schemaKey]: numericValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = Object.entries(inventoryData)
      .filter(([, value]) => value !== undefined && value > 0)
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
        <p className="text-sm text-gray-600 dark:text-gray-400">Enter the amount to add for each item. Empty fields will be ignored.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5 mt-4 max-h-96 overflow-y-auto pr-2">
          {allInventoryItems.map(item => (
            <div key={item.schemaKey}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</label>
              <div className="relative mt-1">
                <input
                  type="number"
                  step="any"
                  placeholder="0"
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
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800">
          {isSubmitting ? 'Adding...' : 'Add to Stock'}
        </button>
      </div>
    </form>
  );
};

export default AddInventoryForm;
