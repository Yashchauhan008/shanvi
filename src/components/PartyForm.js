// import React, { useState, useEffect } from 'react';

// const PartyForm = ({ onSave, partyToEdit, onClose }) => {
//   const [name, setName] = useState('');

//   useEffect(() => {
//     // If we are editing, populate the form with existing data
//     if (partyToEdit) {
//       setName(partyToEdit.name);
//     }
//   }, [partyToEdit]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name) return; // Simple validation
//     onSave({ ...partyToEdit, name });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="space-y-4">
//         <div>
//           <label htmlFor="partyName" className="block text-sm font-medium text-gray-700">
//             Party Name
//           </label>
//           <input
//             type="text"
//             id="partyName"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             required
//           />
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
//           className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
//         >
//           Save Party
//         </button>
//       </div>
//     </form>
//   );
// };

// export default PartyForm;
import React, { useState, useEffect } from 'react';

const PartyForm = ({ onSave, partyToEdit, onClose }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (partyToEdit) {
      setName(partyToEdit.name);
    } else {
      setName(''); // Clear form when adding new
    }
  }, [partyToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onSave({ ...partyToEdit, name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          {/* ✅ Add dark mode classes */}
          <label htmlFor="partyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Party Name
          </label>
          <input
            type="text"
            id="partyName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // ✅ Add dark mode classes for input fields
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        {/* ✅ Add dark mode classes for buttons */}
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          Save Party
        </button>
      </div>
    </form>
  );
};

export default PartyForm;
