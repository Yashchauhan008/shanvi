import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PlusIcon } from '@heroicons/react/24/solid';
import Modal from '../components/Modal';
import AddOrderForm from '../components/AddOrderForm';
import AddInventoryForm from '../components/AddInventoryForm';
import AddBillForm from '../components/AddBillForm';

// Helper function to format backend keys (e.g., 'film_white') into readable names ('Film White')
const formatItemName = (key) => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
};

// Dummy data for pallets, as it's not being fetched from the API yet.
const fullPalletData = [
    { id: 1, size: '200x200', totalOut: 50, totalUsed: 30, remains: 20 },
    { id: 2, size: '1200x600', totalOut: 80, totalUsed: 75, remains: 5 },
    { id: 3, size: '800x800', totalOut: 120, totalUsed: 100, remains: 20 },
];

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [pallets, setPallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);

  const { user } = useAuth(); // Get the logged-in user object

  // --- STEP 1: Create a reusable function to fetch inventory ---
  // We use useCallback to prevent this function from being recreated on every render,
  // which is a good practice when it's a dependency of useEffect.
  const fetchInventory = useCallback(async () => {
    if (!user?.id) {
      setError("User not found. Cannot fetch inventory.");
      setLoading(false);
      return;
    }
    try {
      // We don't need to set loading to true here on re-fetches,
      // as it would make the whole page flash.
      setError(null);
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/production-house/${user.id}/inventory`;
      const response = await axios.get(apiUrl);

      const inventoryData = response.data.data;
      const formattedInventory = Object.entries(inventoryData)
        .filter(([key]) => key !== '_id')
        .map(([key, value]) => ({
          name: formatItemName(key),
          quantity: value,
        }));
      
      setInventory(formattedInventory);

    } catch (err) {
      console.error("Failed to fetch inventory:", err);
      setError("Could not load inventory data.");
    } finally {
      // Only set loading to false on the initial load
      if (loading) setLoading(false);
    }
  }, [user, loading]); // Dependencies for useCallback

  // --- STEP 2: Call the fetch function on initial component load ---
  useEffect(() => {
    setPallets(fullPalletData); // Set dummy pallet data
    fetchInventory(); // Initial data fetch
  }, [fetchInventory]); // The dependency is the memoized function itself

  // --- STEP 3: Create the handler that saves AND then re-fetches ---
  const handleSaveInventory = async (addedData) => {
    if (!user?.id) {
      alert("Error: Could not find user ID. Please log in again.");
      return;
    }

    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/production-house/${user.id}/inventory`;

    try {
      // Make the API call to add the new stock
      await axios.post(apiUrl, addedData);
      
      alert("Inventory has been updated successfully!");
      setIsInventoryModalOpen(false); // Close the modal
      
      // THIS IS THE KEY: After a successful save, call fetchInventory() again
      // to get the latest data from the server. This will automatically
      // update the table on the screen.
      await fetchInventory();

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to update inventory.";
      alert(`Error: ${errorMessage}`);
      console.error("Failed to save inventory:", err);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header and Buttons (Unchanged) */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Main Dashboard</h1>
            <p className="mt-1 text-md text-gray-500">Overview of your inventory and operations.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsInventoryModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              <PlusIcon className="h-5 w-5" />
              Add Stock
            </button>
            <button
              onClick={() => setIsBillModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
            >
              <PlusIcon className="h-5 w-5" />
              Add Bill
            </button>
            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              <PlusIcon className="h-5 w-5" />
              Add Order
            </button>
          </div>
        </div>

        {/* Tables Layout (Unchanged) */}
        <div className="flex flex-col gap-8">
          {/* Pallet Details Card (Unchanged) */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Pallet Details</h2>
              <p className="mt-1 text-sm text-gray-500">Summary of pallet usage and availability.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pallet Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Out</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Used</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remains</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pallets.map((pallet) => (
                    <tr key={pallet.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{pallet.size}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{pallet.totalOut}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{pallet.totalUsed}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-indigo-600">{pallet.remains}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inventory Status Card (Unchanged) */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Inventory Status</h2>
              <p className="mt-1 text-sm text-gray-500">Current stock levels for all packaging items.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Quantity</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventory.map((item) => (
                    <tr key={item.name} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals Section (Unchanged) */}
      <Modal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} title="Create New Order">
        <AddOrderForm onClose={() => setIsOrderModalOpen(false)} />
      </Modal>
      <Modal isOpen={isBillModalOpen} onClose={() => setIsBillModalOpen(false)} title="Add New Bill">
        <AddBillForm onClose={() => setIsBillModalOpen(false)} />
      </Modal>
      <Modal isOpen={isInventoryModalOpen} onClose={() => setIsInventoryModalOpen(false)} title="Add Incoming Inventory Stock">
        <AddInventoryForm onSave={handleSaveInventory} onClose={() => setIsInventoryModalOpen(false)} />
      </Modal>
    </>
  );
};

export default Dashboard;
