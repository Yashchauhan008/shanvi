import React, { useState, useEffect } from 'react';

const PalletForm = ({ onSave, palletToEdit, onClose }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    // If we are editing, populate the form with the existing pallet's name
    if (palletToEdit) {
      setName(palletToEdit.name);
    } else {
      setName(''); // Clear the form for a new entry
    }
  }, [palletToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Pallet Size cannot be empty.");
      return;
    }
    // The onSave function will handle the actual API call
    onSave({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="palletName" className="block text-sm font-medium text-gray-700">
          Pallet Size
        </label>
        <input
          type="text"
          id="palletName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., 1200x800"
          required
        />
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          Save Pallet Size
        </button>
      </div>
    </form>
  );
};

export default PalletForm;
