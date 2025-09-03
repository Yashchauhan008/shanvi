// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import { PlusIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
// import Modal from '../components/Modal';
// import AddOrderForm from '../components/AddOrderForm';
// import AddInventoryForm from '../components/AddInventoryForm';
// import AddBillForm from '../components/AddBillForm';
// import DateRangeFilter from '../components/DateRangeFilter';

// const formatItemName = (key) => {
//   return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
// };

// // const getMonthStartEnd = () => {
// //   const now = new Date();
// //   const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
// //   const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
// //   return { startDate, endDate };
// // };

// const getMonthStartEnd = () => {
//   const now = new Date();
//   const year = now.getFullYear();
//   const month = now.getMonth();

//   // First day of the current month
//   const startDate = new Date(year, month, 1);
//   // Last day of the current month
//   const endDate = new Date(year, month + 1, 0);

//   // Helper to format date as YYYY-MM-DD
//   const formatDate = (date) => {
//     const d = new Date(date);
//     let month = '' + (d.getMonth() + 1);
//     let day = '' + d.getDate();
//     const year = d.getFullYear();

//     if (month.length < 2) month = '0' + month;
//     if (day.length < 2) day = '0' + day;

//     return [year, month, day].join('-');
//   };

//   return {
//     startDate: formatDate(startDate),
//     endDate: formatDate(endDate),
//   };
// };

// const Dashboard = () => {
//   const [inventory, setInventory] = useState([]);
//   const [palletStats, setPalletStats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [palletLoading, setPalletLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
//   const [isBillModalOpen, setIsBillModalOpen] = useState(false);
//   const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
//   const { user } = useAuth();
//   const [refreshKey, setRefreshKey] = useState(0);

//   const [dateFilters, setDateFilters] = useState({
//     fromDate: getMonthStartEnd().startDate,
//     toDate: getMonthStartEnd().endDate,
//   });

//   const isInitialMount = useRef(true);

//   const fetchInventory = useCallback(async () => {
//     if (!user?.id) return;
//     try {
//       const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/production-house/${user.id}/inventory`;
//       const response = await axios.get(apiUrl);
//       const formatted = Object.entries(response.data.data)
//         .filter(([key]) => key !== '_id')
//         .map(([key, value]) => ({ name: formatItemName(key), quantity: value }));
//       setInventory(formatted);
//     } catch (err) {
//       console.error("Failed to fetch inventory:", err);
//       setError("Could not load inventory data.");
//     }
//   }, [user]);

//   const fetchPalletStats = useCallback(async () => {
//     setPalletLoading(true);
//     try {
//       const params = new URLSearchParams();
//       if (dateFilters.fromDate) params.append('startDate', dateFilters.fromDate);
//       if (dateFilters.toDate) params.append('endDate', dateFilters.toDate);

//       const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/stats/pallets?${params.toString()}`;
//       const response = await axios.get(apiUrl);
//       setPalletStats(response.data.data);
//     } catch (err) {
//       console.error("Failed to fetch pallet stats:", err);
//       setError("Could not load pallet data.");
//     } finally {
//       setPalletLoading(false);
//     }
//   }, [dateFilters]);

//   useEffect(() => {
//     const loadData = async () => {
//       if (user?.id) {
//         setLoading(true);
//         await Promise.all([fetchInventory(), fetchPalletStats()]);
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, [user, refreshKey, fetchInventory, fetchPalletStats]);

//   useEffect(() => {
//     if (isInitialMount.current) {
//       isInitialMount.current = false;
//       return;
//     }
//     fetchPalletStats();
//   }, [dateFilters, fetchPalletStats]);

//   const handleDateChange = (e) => {
//     setDateFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSaveOrder = async (orderData) => {
//     setIsSubmitting(true);
//     try {
//       await axios.post(`${process.env.REACT_APP_API_BASE_URL}/orders`, orderData);
//       alert("Order created successfully!");
//       setIsOrderModalOpen(false);
//       setRefreshKey(k => k + 1);
//     } catch (err) {
//       alert(`Error: ${err.response?.data?.message || "Failed to create order."}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSaveBill = async (billData) => {
//     setIsSubmitting(true);
//     try {
//       await axios.post(`${process.env.REACT_APP_API_BASE_URL}/orders`, billData);
//       alert("Bill created successfully!");
//       setIsBillModalOpen(false);
//       setRefreshKey(k => k + 1);
//     } catch (err) {
//       alert(`Error: ${err.response?.data?.message || "Failed to create bill."}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSaveInventory = async (addedData) => {
//     if (!user?.id) return;
//     setIsSubmitting(true);
//     try {
//       await axios.post(`${process.env.REACT_APP_API_BASE_URL}/production-house/${user.id}/inventory`, addedData);
//       alert("Inventory updated successfully!");
//       setIsInventoryModalOpen(false);
//       setRefreshKey(k => k + 1);
//     } catch (err) {
//       alert(`Error: ${err.response?.data?.message || "Failed to update inventory."}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const halfwayIndex = Math.ceil(inventory.length / 2);
//   const firstHalfInventory = inventory.slice(0, halfwayIndex);
//   const secondHalfInventory = inventory.slice(halfwayIndex);

//   if (loading) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading dashboard data...</div>;
//   if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

//   return (
//     <>
//       <div className="container mx-auto p-4 sm:p-6 lg:p-8">
//         <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Main Dashboard</h1>
//             <p className="mt-1 text-md text-gray-500 dark:text-gray-400">Overview of your inventory and operations.</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <button onClick={() => setIsInventoryModalOpen(true)} className="flex items-center sm:gap-2 gap-1 sm:px-4 px-2 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
//               <PlusIcon className="h-5 w-5" /> <span className='sm:block hidden'>Add</span>Stock
//             </button>
//             <button onClick={() => setIsBillModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700">
//               <PlusIcon className="h-5 w-5" /> <span className='sm:block hidden'>Add</span>Bill
//             </button>
//             <button onClick={() => setIsOrderModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
//               <PlusIcon className="h-5 w-5" /> <span className='sm:block hidden'>Add</span>Order
//             </button>
//           </div>
//           {/* <div className="flex items-center gap-3">
//             <button onClick={() => setIsInventoryModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
//               <PlusIcon className="h-5 w-5" /> Add Stock
//             </button>
//             <button onClick={() => setIsBillModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700">
//               <PlusIcon className="h-5 w-5" /> Add Bill
//             </button>
//             <button onClick={() => setIsOrderModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
//               <PlusIcon className="h-5 w-5" /> Add Order
//             </button>
//           </div> */}
//         </div>

//         <div className="flex flex-col gap-8">
//           <DateRangeFilter fromDate={dateFilters.fromDate} toDate={dateFilters.toDate} onDateChange={handleDateChange} />

//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//             <div className="p-5 border-b border-gray-200 dark:border-gray-700">
//               <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Pallet Details</h2>
//               <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Summary of pallet usage based on the selected date range.</p>
//             </div>
//             <div className="overflow-x-auto">
//               {palletLoading && <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading pallet details...</div>}
//               {!palletLoading && (
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                   <thead className="bg-gray-50 dark:bg-gray-700">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Pallet Size</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Total Out (Orders)</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Total In (Bills)</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Net Balance</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                     {palletStats && palletStats.length > 0 ? (
//                       palletStats.map((pallet) => (
//                         <tr key={pallet.palletSize} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                           <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{pallet.palletSize}</td>
//                           <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{pallet.totalOut}</td>
//                           <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{pallet.totalIn}</td>
//                           <td className="px-6 py-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400">{pallet.netBalance}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No pallet data found for the selected dates.</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//             <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Inventory Status</h2>
//                 <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Current stock levels for all packaging items.</p>
//               </div>
//               <div>
//                 <button onClick={() => setRefreshKey(k => k + 1)} className="p-2 text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600" title="Refresh All Data">
//                   <ArrowPathIcon className="h-6 w-6" />
//                 </button>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 p-5">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead className="border-b border-gray-200 dark:border-gray-700">
//                     <tr>
//                       <th className="py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Item Name</th>
//                       <th className="py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Quantity</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {firstHalfInventory.map((item) => (
//                       <tr key={item.name} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
//                         <td className="py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</td>
//                         <td className="py-3 text-sm font-semibold text-gray-800 dark:text-gray-200">{item.quantity}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead className="border-b border-gray-200 dark:border-gray-700">
//                     <tr>
//                       <th className="py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Item Name</th>
//                       <th className="py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Quantity</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {secondHalfInventory.map((item) => (
//                       <tr key={item.name} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
//                         <td className="py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</td>
//                         <td className="py-3 text-sm font-semibold text-gray-800 dark:text-gray-200">{item.quantity}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Modal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} title="Create New Order">
//         <AddOrderForm onSave={handleSaveOrder} isSubmitting={isSubmitting} onClose={() => setIsOrderModalOpen(false)} />
//       </Modal>
//       <Modal isOpen={isBillModalOpen} onClose={() => setIsBillModalOpen(false)} title="Add New Bill">
//         <AddBillForm onSave={handleSaveBill} isSubmitting={isSubmitting} onClose={() => setIsBillModalOpen(false)} />
//       </Modal>
//       <Modal isOpen={isInventoryModalOpen} onClose={() => setIsInventoryModalOpen(false)} title="Add Incoming Inventory Stock">
//         <AddInventoryForm onSave={handleSaveInventory} isSubmitting={isSubmitting} onClose={() => setIsInventoryModalOpen(false)} />
//       </Modal>
//     </>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PlusIcon, ArrowPathIcon, PencilSquareIcon } from '@heroicons/react/24/solid'; // Import PencilSquareIcon
import Modal from '../components/Modal';
import AddOrderForm from '../components/AddOrderForm';
import AddInventoryForm from '../components/AddInventoryForm';
import AddBillForm from '../components/AddBillForm';
import DateRangeFilter from '../components/DateRangeFilter';
import EditInventoryForm from '../components/EditInventoryForm'; // ✅ Import the new form

const formatItemName = (key) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

const getInitialDateRange = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const startDate = '2025-01-01';
  const endDate = new Date(year, month + 1, 0);

  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  };

  return {
    startDate: startDate,
    endDate: formatDate(endDate),
  };
};

const Dashboard = () => {
  // --- State for Data ---
  const [inventory, setInventory] = useState([]);
  const [palletStats, setPalletStats] = useState([]);

  // --- State for UI Control ---
  const [pageLoading, setPageLoading] = useState(true);
  const [palletLoading, setPalletLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [isEditInventoryModalOpen, setIsEditInventoryModalOpen] = useState(false);

  const [dateFilters, setDateFilters] = useState({
    fromDate: getInitialDateRange().startDate,
    toDate: getInitialDateRange().endDate,
  });

  // ✅ --- THIS IS THE FIX (Part 1) ---
  // This useEffect hook is ONLY for the initial page load and manual refresh.
  // It fetches the inventory, which does NOT change with dates.
  useEffect(() => {
    const loadStaticData = async () => {
      if (!user?.id) return;
      setPageLoading(true);
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
      } finally {
        setPageLoading(false);
      }
    };
    loadStaticData();
  }, [user, refreshKey]); // Depends only on user and manual refresh

  // ✅ --- THIS IS THE FIX (Part 2) ---
  // This useEffect hook is ONLY for the pallet data.
  // It runs on initial load AND whenever the date filters change.
  useEffect(() => {
    const fetchPalletData = async () => {
      setPalletLoading(true);
      try {
        const params = new URLSearchParams();
        if (dateFilters.fromDate) params.append('startDate', dateFilters.fromDate);
        if (dateFilters.toDate) params.append('endDate', dateFilters.toDate);
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/stats/pallets?${params.toString()}`;
        const response = await axios.get(apiUrl);
        setPalletStats(response.data.data);
      } catch (err) {
        console.error("Failed to fetch pallet stats:", err);
        setError("Could not load pallet data.");
      } finally {
        setPalletLoading(false);
      }
    };

    if (user?.id) {
      fetchPalletData();
    }
  }, [user, dateFilters, refreshKey]); // Depends on user, dates, and manual refresh
  // ✅ --- END OF FIX ---

  const handleDateChange = (e) => {
    setDateFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // (All handleSave... functions remain unchanged)
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

  const handleEditInventory = async (editedData) => {
    if (!user?.id) return;
    setIsSubmitting(true);
    try {
      // Note the use of `axios.put` and the different endpoint
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/production-house/${user.id}/inventory`, editedData);
      alert("Inventory levels updated successfully!");
      setIsEditInventoryModalOpen(false); // Close the edit modal
      setRefreshKey(k => k + 1); // Refresh all data
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Failed to edit inventory."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const halfwayIndex = Math.ceil(inventory.length / 2);
  const firstHalfInventory = inventory.slice(0, halfwayIndex);
  const secondHalfInventory = inventory.slice(halfwayIndex);

  if (pageLoading) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading dashboard data...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header section remains the same */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Main Dashboard</h1>
            <p className="mt-1 text-md text-gray-500 dark:text-gray-400">Overview of your inventory and operations.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsInventoryModalOpen(true)} className="flex items-center sm:gap-2 gap-1 sm:px-4 px-2 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
              <PlusIcon className="h-5 w-5" /> <span className='sm:block hidden'>Add</span>Stock
            </button>
            <button onClick={() => setIsBillModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700">
              <PlusIcon className="h-5 w-5" /> <span className='sm:block hidden'>Add</span>Bill
            </button>
            <button onClick={() => setIsOrderModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              <PlusIcon className="h-5 w-5" /> <span className='sm:block hidden'>Add</span>Order
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <DateRangeFilter fromDate={dateFilters.fromDate} toDate={dateFilters.toDate} onDateChange={handleDateChange} />

          {/* Pallet Details Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Pallet Details</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Summary of pallet usage based on the selected date range.</p>
            </div>
            <div className="overflow-x-auto">
              {palletLoading && <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading pallet details...</div>}
              {!palletLoading && (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Table content remains the same */}
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Pallet Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Total Out (Orders)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Total In (Bills)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Net Balance</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {palletStats && palletStats.length > 0 ? (
                      palletStats.map((pallet) => (
                        <tr key={pallet.palletSize} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{pallet.palletSize}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{pallet.totalOut}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{pallet.totalIn}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400">{pallet.netBalance}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No pallet data found for the selected dates.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Inventory Status section remains the same */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Inventory Status</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Current stock levels for all packaging items.</p>
              </div>
              <div className='flex items-center gap-2'>
                <button onClick={() => setRefreshKey(k => k + 1)} className="p-2 text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600" title="Refresh All Data">
                  <ArrowPathIcon className="h-6 w-6" />
                </button>
                <button onClick={() => setIsEditInventoryModalOpen(true)} className="flex items-center sm:gap-2 gap-1 sm:px-4 px-2 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 p-5">
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

      {/* Modals section remains the same */}
      <Modal isOpen={isEditInventoryModalOpen} onClose={() => setIsEditInventoryModalOpen(false)} title="Edit Current Inventory Stock">
        <EditInventoryForm
          currentInventory={inventory}
          onSave={handleEditInventory}
          isSubmitting={isSubmitting}
          onClose={() => setIsEditInventoryModalOpen(false)}
        />
      </Modal>
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
