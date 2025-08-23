// import React, { useState, useEffect } from 'react';

// const FactoryForm = ({ onSave, factoryToEdit, parties, onClose }) => {
//   const [name, setName] = useState('');
//   const [partyId, setPartyId] = useState('');

//   useEffect(() => {
//     if (factoryToEdit) {
//       // --- EDIT MODE ---
//       setName(factoryToEdit.name);
//       // CHANGE: The backend sends party_id as an object. We need its _id.
//       setPartyId(factoryToEdit.party_id?._id || ''); 
//     } else {
//       // --- ADD NEW MODE ---
//       // CHANGE: The backend sends a list where each party has an '_id'.
//       if (parties && parties.length > 0) {
//         setPartyId(parties[0]._id); // Default to the first party's _id
//       }
//       setName(''); // Clear name for a new entry
//     }
//   }, [factoryToEdit, parties]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name || !partyId) {
//       alert("Please ensure both Factory Name and Party are selected.");
//       return;
//     }
//     // CHANGE: The onSave handler in Factories.js expects a 'party_id' key
//     // to match the backend schema when creating a new factory.
//     onSave({ name, party_id: partyId });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="space-y-4">
//         <div>
//           <label htmlFor="factoryName" className="block text-sm font-medium text-gray-700">
//             Factory Name
//           </label>
//           <input
//             type="text"
//             id="factoryName"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="partySelect" className="block text-sm font-medium text-gray-700">
//             Belongs to Party
//           </label>
//           <select
//             id="partySelect"
//             value={partyId}
//             onChange={(e) => setPartyId(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             required
//             // CHANGE: It's good practice to disable this when editing,
//             // as changing a factory's owner is a complex operation.
//             disabled={!!factoryToEdit}
//           >
//             {parties.map(party => (
//               // CHANGE: Use the backend's '_id' for both the key and the value.
//               <option key={party._id} value={party._id}>
//                 {party.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="mt-6 flex justify-end space-x-3">
//         <button
//           type="button"
//           onClick={onClose}
//           className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700"
//         >
//           Save Factory
//         </button>
//       </div>
//     </form>
//   );
// };

// export default FactoryForm;

import React, { useState, useEffect } from 'react';

const FactoryForm = ({ onSave, factoryToEdit, parties, onClose }) => {
  const [name, setName] = useState('');
  const [partyId, setPartyId] = useState('');

  useEffect(() => {
    if (factoryToEdit) {
      setName(factoryToEdit.name);
      setPartyId(factoryToEdit.party_id?._id || ''); 
    } else {
      if (parties && parties.length > 0) {
        setPartyId(parties[0]._id);
      }
      setName('');
    }
  }, [factoryToEdit, parties]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !partyId) {
      alert("Please ensure both Factory Name and Party are selected.");
      return;
    }
    onSave({ name, party_id: partyId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          {/* ✅ Apply consistent styling to the label */}
          <label htmlFor="factoryName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Factory Name
          </label>
          {/* ✅ Apply consistent styling to the input field */}
          <input
            type="text"
            id="factoryName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div>
          {/* ✅ Apply consistent styling to the label */}
          <label htmlFor="partySelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Belongs to Party
          </label>
          {/* ✅ Apply consistent styling to the select dropdown */}
          <select
            id="partySelect"
            value={partyId}
            onChange={(e) => setPartyId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50"
            required
            disabled={!!factoryToEdit}
          >
            {parties.map(party => (
              <option key={party._id} value={party._id}>
                {party.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        {/* ✅ Apply consistent styling to the "Cancel" button */}
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500"
        >
          Cancel
        </button>
        {/* ✅ Apply consistent styling to the "Save" button (Teal for Factories) */}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700"
        >
          Save Factory
        </button>
      </div>
    </form>
  );
};

export default FactoryForm;
