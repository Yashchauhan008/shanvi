

// import React, { useState, useEffect } from 'react';

// const AssociateCompanyForm = ({ onSave, companyToEdit, onClose }) => {
//   const [name, setName] = useState('');

//   useEffect(() => {
//     if (companyToEdit) {
//       setName(companyToEdit.name);
//     } else {
//       setName('');
//     }
//   }, [companyToEdit]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name.trim()) {
//       alert("Company Name cannot be empty.");
//       return;
//     }
//     onSave({ name });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//           Company Name
//         </label>
//         <input
//           type="text"
//           id="companyName"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="form-input mt-1 block w-full"
//           placeholder="e.g., Global Logistics"
//           required
//         />
//       </div>
//       <div className="mt-6 flex justify-end space-x-3">
//         <button type="button" onClick={onClose} className="btn-secondary">
//           Cancel
//         </button>
//         <button type="submit" className="btn-primary bg-purple-600 hover:bg-purple-700 focus:ring-purple-500">
//           Save Company
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AssociateCompanyForm;


import React, { useState, useEffect } from 'react';

const AssociateCompanyForm = ({ onSave, companyToEdit, onClose }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (companyToEdit) {
      setName(companyToEdit.name);
    } else {
      setName('');
    }
  }, [companyToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Company Name cannot be empty.");
      return;
    }
    onSave({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        {/* ✅ Apply consistent styling to the label */}
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Associate Company Name
        </label>
        {/* ✅ Apply consistent styling to the input field */}
        <input
          type="text"
          id="companyName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          placeholder="e.g., Global Logistics"
          required
        />
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
        {/* ✅ Apply consistent styling to the "Save" button (Purple for Associate Companies) */}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700"
        >
          Save Company
        </button>
      </div>
    </form>
  );
};

export default AssociateCompanyForm;
