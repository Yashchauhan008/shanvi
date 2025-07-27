import React, { useState, useEffect } from 'react';

const FactoryForm = ({ onSave, factoryToEdit, parties, onClose }) => {
  const [name, setName] = useState('');
  const [partyId, setPartyId] = useState('');

  useEffect(() => {
    if (factoryToEdit) {
      setName(factoryToEdit.name);
      setPartyId(factoryToEdit.partyId);
    } else if (parties.length > 0) {
      // Default to the first party if creating a new factory
      setPartyId(parties[0].id);
    }
  }, [factoryToEdit, parties]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !partyId) return;
    onSave({ ...factoryToEdit, name, partyId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="factoryName" className="block text-sm font-medium text-gray-700">
            Factory Name
          </label>
          <input
            type="text"
            id="factoryName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="partySelect" className="block text-sm font-medium text-gray-700">
            Belongs to Party
          </label>
          <select
            id="partySelect"
            value={partyId}
            onChange={(e) => setPartyId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {parties.map(party => (
              <option key={party.id} value={party.id}>
                {party.name}
              </option>
            ))}
          </select>
        </div>
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
          className="px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700"
        >
          Save Factory
        </button>
      </div>
    </form>
  );
};

export default FactoryForm;
