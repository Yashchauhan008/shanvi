import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
import Modal from '../components/Modal';
import FactoryForm from '../components/FactoryForm';

const Factories = () => {
  const [factories, setFactories] = useState([]);
  const [partyList, setPartyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [factoryToEdit, setFactoryToEdit] = useState(null);
  // ✅ 1. Add state for the search term
  const [searchTerm, setSearchTerm] = useState('');

  const factoriesApiUrl = `${process.env.REACT_APP_API_BASE_URL}/factories`;
  const partyListApiUrl = `${process.env.REACT_APP_API_BASE_URL}/parties/list`;

  const fetchFactories = useCallback(async () => {
    try {
      const response = await axios.get(factoriesApiUrl);
      setFactories(response.data);
    } catch (err) {
      setError('Failed to fetch factories.');
      console.error(err);
    }
  }, [factoriesApiUrl]);

  const fetchPartyList = useCallback(async () => {
    try {
      const response = await axios.get(partyListApiUrl);
      setPartyList(response.data);
    } catch (err) {
      console.error("Failed to fetch party list for form:", err);
    }
  }, [partyListApiUrl]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchFactories(), fetchPartyList()]);
      setLoading(false);
    };
    loadData();
  }, [fetchFactories, fetchPartyList]);

  const closeModal = () => {
    setIsModalOpen(false);
    setFactoryToEdit(null);
  };

  const handleAddFactory = () => {
    if (partyList.length === 0) {
      alert("Cannot add a factory because no parties were found. Please add a party first.");
      return;
    }
    setFactoryToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditFactory = (factory) => {
    setFactoryToEdit(factory);
    setIsModalOpen(true);
  };

  const handleSaveFactory = async (factoryData) => {
    try {
      if (factoryToEdit) {
        await axios.put(`${factoriesApiUrl}/${factoryToEdit._id}`, { name: factoryData.name });
      } else {
        await axios.post(factoriesApiUrl, { name: factoryData.name, party_id: factoryData.party_id });
      }
      closeModal();
      await fetchFactories();
    } catch (err) {
      const errorMessage = err.response?.data?.message || `A factory with this name may already exist for the selected party.`;
      alert(`Error: ${errorMessage}`);
      console.error(err);
    }
  };

  // ✅ 2. Filter factories based on the search term
  const filteredFactories = factories.filter(factory =>
    factory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading factories...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Factories</h1>
            <p className="mt-1 text-md text-gray-500 dark:text-gray-400">Manage your factory locations.</p>
          </div>
        </div>

        {/* ✅ 3. Add the search input field */}
       {/* --- Actions and Search Bar (Responsive) --- */}
<div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
  {/* Search Input */}
  <div className="relative w-full sm:max-w-sm">
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <svg 
        aria-hidden="true" 
        className="h-5 w-5 text-gray-400" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fillRule="evenodd" 
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" 
          clipRule="evenodd" 
        />
      </svg>
    </div>
    <input
      type="text"
      placeholder="Search for a factory..."
      value={searchTerm}
      onChange={(e ) => setSearchTerm(e.target.value)}
      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    />
  </div>

  {/* Add Factory Button */}
  <button
    onClick={handleAddFactory}
    className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-900"
  >
    <PlusIcon className="h-5 w-5" />
    <span>Add Factory</span>
  </button>
</div>


        {/* ✅ 4. Map over the filteredFactories array */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFactories.map((factory) => (
            <div key={factory._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col justify-between border border-gray-200 dark:border-gray-700">
              <div>
                <Link to={`/factory/${factory._id}`} className="block">
                  <h2 className="text-xl font-bold text-teal-600 dark:text-teal-400 hover:underline">{factory.name}</h2>
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Owned by: <span className="font-semibold text-gray-700 dark:text-gray-200">{factory.party_id?.name || 'N/A'}</span>
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={() => handleEditFactory(factory)} className="text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={factoryToEdit ? 'Edit Factory' : 'Add New Factory'}>
        <FactoryForm onSave={handleSaveFactory} factoryToEdit={factoryToEdit} parties={partyList} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default Factories;
