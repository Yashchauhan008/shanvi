import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import Modal from './Modal'; // Assumes Modal is in the same components folder
import PalletForm from './PalletForm'; // Assumes PalletForm is in the same components folder

const PalletManager = () => {
  const [pallets, setPallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [palletToEdit, setPalletToEdit] = useState(null);

  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/pallets`;

  // --- Reusable function to fetch all pallets ---
  const fetchPallets = useCallback(async () => {
    // On re-fetches, we don't want to show the main loading screen, just update data.
    if (loading) setLoading(true); 
    try {
      const response = await axios.get(apiUrl);
      setPallets(response.data);
    } catch (err) {
      setError('Failed to fetch pallet data.');
      console.error(err);
    } finally {
      if (loading) setLoading(false);
    }
  }, [apiUrl, loading]);

  // --- Fetch data on initial component load ---
  useEffect(() => {
    fetchPallets();
  }, [fetchPallets]); // The dependency array is correct, this runs once on mount

  const closeModal = () => {
    setIsModalOpen(false);
    setPalletToEdit(null);
  };

  const handleAdd = () => {
    setPalletToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (pallet) => {
    setPalletToEdit(pallet);
    setIsModalOpen(true);
  };

  // --- Function to handle both creating and updating ---
  const handleSave = async (palletData) => {
    try {
      if (palletToEdit) {
        await axios.put(`${apiUrl}/${palletToEdit._id}`, palletData);
      } else {
        await axios.post(apiUrl, palletData);
      }
      closeModal();
      await fetchPallets(); // Re-fetch the list to show changes
    } catch (err) {
      const errorMessage = err.response?.data?.message || `Failed to save pallet size.`;
      alert(`Error: ${errorMessage}`);
      console.error(err);
    }
  };

  // --- Function to handle deleting a pallet ---
  const handleDelete = async (palletId) => {
    if (window.confirm("Are you sure you want to delete this pallet size? This action cannot be undone.")) {
      try {
        await axios.delete(`${apiUrl}/${palletId}`);
        await fetchPallets(); // Re-fetch the list to show changes
      } catch (err) {
        const errorMessage = err.response?.data?.message || `Failed to delete pallet size.`;
        alert(`Error: ${errorMessage}`);
        console.error(err);
      }
    }
  };

  if (loading) return <div className="p-5 text-center text-gray-500">Loading Pallet Data...</div>;
  if (error) return <div className="p-5 text-center text-red-500">{error}</div>;

  return (
    <>
      {/* This component is now a self-contained card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Pallet Sizes</h2>
            <p className="mt-1 text-sm text-gray-500">Add, edit, or remove available pallet sizes.</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            <PlusIcon className="h-5 w-5" />
            Add New
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pallet Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pallets.length > 0 ? (
                pallets.map((pallet) => (
                  <tr key={pallet._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{pallet.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(pallet.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right text-sm space-x-4">
                      <button onClick={() => handleEdit(pallet)} className="text-indigo-600 hover:text-indigo-900">
                        <PencilIcon className="h-5 w-5 inline" />
                      </button>
                      <button onClick={() => handleDelete(pallet._id)} className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-5 w-5 inline" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No pallet sizes found. Click "Add New" to create one.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={palletToEdit ? 'Edit Pallet Size' : 'Add New Pallet Size'}>
        <PalletForm onSave={handleSave} palletToEdit={palletToEdit} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default PalletManager;
