import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
import Modal from '../components/Modal';
import FactoryForm from '../components/FactoryForm';

// --- DUMMY DATA ---
// We need both sets of data to manage the relationship
const initialParties = [
  { id: 'p1', name: 'Alpha Traders' },
  { id: 'p2', name: 'Beta Logistics' },
  { id: 'p3', name: 'Gamma Supplies' },
  { id: 'p4', name: 'Delta Corp' },
];

const initialFactories = [
  { id: 'f1', name: 'Alpha Steel', partyId: 'p1' },
  { id: 'f2', name: 'Alpha Packaging', partyId: 'p1' },
  { id: 'f3', name: 'Beta Warehouse', partyId: 'p2' },
  { id: 'f4', name: 'Gamma Plastics', partyId: 'p3' },
];

const Factories = () => {
  const [parties] = useState(initialParties); // Parties list is static for the dropdown
  const [factories, setFactories] = useState(initialFactories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [factoryToEdit, setFactoryToEdit] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFactoryToEdit(null);
  };

  const handleAddFactory = () => {
    setFactoryToEdit(null);
    openModal();
  };

  const handleEditFactory = (factory) => {
    setFactoryToEdit(factory);
    openModal();
  };

  const handleSaveFactory = (factoryData) => {
    if (factoryData.id) {
      // Editing
      setFactories(factories.map(f => f.id === factoryData.id ? factoryData : f));
    } else {
      // Adding
      const newFactory = { ...factoryData, id: `f${Date.now()}` };
      setFactories([...factories, newFactory]);
    }
    closeModal();
  };

  // Helper to get party name from its ID
  const getPartyName = (partyId) => {
    const party = parties.find(p => p.id === partyId);
    return party ? party.name : 'Unknown Party';
  };

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Factories</h1>
            <p className="mt-1 text-md text-gray-500">Manage your factory locations.</p>
          </div>
          <button
            onClick={handleAddFactory}
            className="flex items-center gap-2 px-4 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700"
          >
            <PlusIcon className="h-5 w-5" />
            Add Factory
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {factories.map((factory) => (
            <div key={factory.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
              <div>
                <Link to={`/factory/${factory.id}`} className="block">
                  <h2 className="text-xl font-bold text-teal-600 hover:underline">{factory.name}</h2>
                </Link>
                <p className="text-sm text-gray-500 mt-2">
                  Owned by: <span className="font-semibold">{getPartyName(factory.partyId)}</span>
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={() => handleEditFactory(factory)} className="text-gray-400 hover:text-teal-600">
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={factoryToEdit ? 'Edit Factory' : 'Add New Factory'}>
        <FactoryForm onSave={handleSaveFactory} factoryToEdit={factoryToEdit} parties={parties} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default Factories;
