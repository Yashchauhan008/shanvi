import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PlusIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import Modal from '../components/Modal';
import AddOrderForm from '../components/AddOrderForm';
import AddInventoryForm from '../components/AddInventoryForm';
import AddBillForm from '../components/AddBillForm';
import PalletTable from '../components/PalletTable';
import DateRangeFilter from '../components/DateRangeFilter';

const formatItemName = (key) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

// ✅ 1. Add a helper function to get the current month's date range
const getMonthStartEnd = () => {
  const now = new Date();
  // First day of the current month
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  // Last day of the current month
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
  return { startDate, endDate };
};


const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [palletStats, setPalletStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [palletLoading, setPalletLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  // ✅ 2. Initialize the dateFilters state with the current month's range
  const [dateFilters, setDateFilters] = useState({
    fromDate: getMonthStartEnd().startDate,
    toDate: getMonthStartEnd().endDate,
  });

  const isInitialMount = useRef(true);

  // --- Fetch Inventory Data ---
  const fetchInventory = useCallback(async () => {
    if (!user?.id) return;
    try {
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/production-house/${user.id}/inventory`;
      const response = await axios.get(apiUrl);
      const formatted = Object.entries(response.data.data)
        .filter(([key]) => key !== '_id')
        .map(([key, value]) => ({ name: formatItemName(key), quantity: value }));
      setInventory(formatted);
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
      setError("Could not load inventory data.");
    }
  }, [user]);

  // --- Fetch Pallet Statistics ---
  const fetchPalletStats = useCallback(async () => {
    setPalletLoading(true);
    try {
      // Create a new params object and only add dates if they exist
      const params = new URLSearchParams();
      if (dateFilters.fromDate) params.append('fromDate', dateFilters.fromDate);
      if (dateFilters.toDate) params.append('toDate', dateFilters.toDate);

      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/stats/pallets?${params.toString()}`;
      const response = await axios.get(apiUrl);
      setPalletStats(response.data.data);
    } catch (err) {
      console.error("Failed to fetch pallet stats:", err);
      setError("Could not load pallet data.");
    } finally {
      setPalletLoading(false);
    }
  }, [dateFilters]);

  // --- Effect for INITIAL LOAD and MANUAL REFRESH ---
  useEffect(() => {
    const loadData = async () => {
      if (user?.id) {
        setLoading(true);
        await Promise.all([fetchInventory(), fetchPalletStats()]);
        setLoading(false);
      }
    };
    loadData();
  }, [user, refreshKey]);

  // --- Effect for DATE FILTER changes ---
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchPalletStats();
    }
  }, [dateFilters, fetchPalletStats]);

  const handleDateChange = (e) => {
    setDateFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // --- Form Save Handlers ---
  const handleSaveOrder = async (orderData) => {
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/orders`, orderData);
      alert("Order created successfully!");
      setIsOrderModalOpen(false);
      setRefreshKey(k => k + 1);
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Failed to create order."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveBill = async (billData) => {
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/orders`, billData);
      alert("Bill created successfully!");
      setIsBillModalOpen(false);
      setRefreshKey(k => k + 1);
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Failed to create bill."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveInventory = async (addedData) => {
    if (!user?.id) return;
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/production-house/${user.id}/inventory`, addedData);
      alert("Inventory updated successfully!");
      setIsInventoryModalOpen(false);
      setRefreshKey(k => k + 1);
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Failed to update inventory."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Split inventory array for two-column layout
  const halfwayIndex = Math.ceil(inventory.length / 2);
  const firstHalfInventory = inventory.slice(0, halfwayIndex);
  const secondHalfInventory = inventory.slice(halfwayIndex);

  if (loading) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading dashboard data...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header with Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Main Dashboard</h1>
            <p className="mt-1 text-md text-gray-500 dark:text-gray-400">Overview of your inventory and operations.</p>
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

        <div className="flex flex-col gap-8">
          <DateRangeFilter fromDate={dateFilters.fromDate} toDate={dateFilters.toDate} onDateChange={handleDateChange} />
          <PalletTable palletData={palletStats} loading={palletLoading} />

          {/* Inventory Status Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Inventory Status</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Current stock levels for all packaging items.</p>
              </div>
              <div>
                <button onClick={() => setRefreshKey(k => k + 1)} className="p-2 text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600" title="Refresh All Data">
                  <ArrowPathIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 p-5">
              {/* First Inventory Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Item Name</th>
                      <th className="py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {firstHalfInventory.map((item) => (
                      <tr key={item.name} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <td className="py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</td>
                        <td className="py-3 text-sm font-semibold text-gray-800 dark:text-gray-200">{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Second Inventory Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Item Name</th>
                      <th className="py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {secondHalfInventory.map((item) => (
                      <tr key={item.name} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <td className="py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</td>
                        <td className="py-3 text-sm font-semibold text-gray-800 dark:text-gray-200">{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals Section */}
      <Modal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} title="Create New Order">
        <AddOrderForm onSave={handleSaveOrder} isSubmitting={isSubmitting} onClose={() => setIsOrderModalOpen(false)} />
      </Modal>
      <Modal isOpen={isBillModalOpen} onClose={() => setIsBillModalOpen(false)} title="Add New Bill">
        <AddBillForm onSave={handleSaveBill} isSubmitting={isSubmitting} onClose={() => setIsBillModalOpen(false)} />
      </Modal>
      <Modal isOpen={isInventoryModalOpen} onClose={() => setIsInventoryModalOpen(false)} title="Add Incoming Inventory Stock">
        <AddInventoryForm onSave={handleSaveInventory} isSubmitting={isSubmitting} onClose={() => setIsInventoryModalOpen(false)} />
      </Modal>
    </>
  );
};

export default Dashboard;
