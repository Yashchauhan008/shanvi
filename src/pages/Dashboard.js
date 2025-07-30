import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PlusIcon } from '@heroicons/react/24/solid';
import Modal from '../components/Modal';
import AddOrderForm from '../components/AddOrderForm';
import AddInventoryForm from '../components/AddInventoryForm';
import AddBillForm from '../components/AddBillForm';
import PalletTable from '../components/PalletTable'; // <-- Import the component



// Helper function to format backend keys (e.g., 'film_white') into readable names ('Film White')
const formatItemName = (key) => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
};

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);

  const { user } = useAuth();

  // --- Function to fetch inventory ---
  const fetchInventory = useCallback(async () => {
    if (!user?.id) {
      // Don't set an error if the user is just loading, wait for the user object
      if (user !== undefined) setError("User not found. Cannot fetch inventory.");
      setLoading(false);
      return;
    }
    try {
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
      if (loading) setLoading(false);
    }
  }, [user, loading]);

  useEffect(() => {
    // The fetchInventory function will run once the user object is available.
    fetchInventory();
  }, [fetchInventory]);

  // --- Handler for saving new inventory (from Add Stock form) ---
  const handleSaveInventory = async (addedData) => {
    if (!user?.id) return alert("Error: Could not find user ID.");
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/production-house/${user.id}/inventory`;
    try {
      await axios.post(apiUrl, addedData);
      alert("Inventory has been updated successfully!");
      setIsInventoryModalOpen(false);
      await fetchInventory(); // Refresh the inventory table
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Failed to update inventory."}`);
    }
  };

  // --- Handler for saving a new order (from Add Order form) ---
  const handleSaveOrder = async (orderData) => {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders`;
    try {
      await axios.post(apiUrl, orderData);
      alert("Order created successfully!");
      setIsOrderModalOpen(false);
      // If the order came from the current production house, refresh inventory
      if (orderData.sourceModel === 'ProductionHouse' && orderData.source === user.id) {
        await fetchInventory();
      }
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Failed to create the order."}`);
    }
  };

  const handleSaveBill = async (billData) => {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders`;
    try {
      // We use the same endpoint, as the controller handles 'bill' type
      await axios.post(apiUrl, billData);
      alert("Bill created successfully!");
      setIsBillModalOpen(false); // Close the correct modal
      // Bills do not affect inventory, so no need to re-fetch.
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Failed to create the bill."}`);
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
        {/* Header with all three Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Main Dashboard</h1>
            <p className="mt-1 text-md text-gray-500">Overview of your inventory and operations.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsInventoryModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
              <PlusIcon className="h-5 w-5" /> Add Stock
            </button>
            <button onClick={() => setIsBillModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700">
              <PlusIcon className="h-5 w-5" /> Add Bill
            </button>
            <button onClick={() => setIsOrderModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              <PlusIcon className="h-5 w-5" /> Add Order
            </button>
          </div>
        </div>

        {/* The Pallet Table has been removed. Only the Inventory table remains. */}
        <div className="flex flex-col gap-8">
        <PalletTable />

          {/* Inventory Status Card */}
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

      {/* --- Modals Section --- */}
      <Modal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} title="Create New Order">
        <AddOrderForm onSave={handleSaveOrder} onClose={() => setIsOrderModalOpen(false)} />
      </Modal>
      <Modal isOpen={isBillModalOpen} onClose={() => setIsBillModalOpen(false)} title="Add New Bill">
        <AddBillForm onSave={handleSaveBill} onClose={() => setIsBillModalOpen(false)} />
      </Modal>
      <Modal isOpen={isInventoryModalOpen} onClose={() => setIsInventoryModalOpen(false)} title="Add Incoming Inventory Stock">
        <AddInventoryForm onSave={handleSaveInventory} onClose={() => setIsInventoryModalOpen(false)} />
      </Modal>
    </>
  );
};

export default Dashboard;
