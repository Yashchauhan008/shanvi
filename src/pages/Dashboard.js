// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import { PlusIcon, ArrowPathIcon } from '@heroicons/react/24/solid'; // <-- Import the refresh icon
// import Modal from '../components/Modal';
// import AddOrderForm from '../components/AddOrderForm';
// import AddInventoryForm from '../components/AddInventoryForm';
// import AddBillForm from '../components/AddBillForm';
// import PalletTable from '../components/PalletTable';

// // Helper function to format backend keys
// const formatItemName = (key) => {
//   return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
// };

// const Dashboard = () => {
//   const [inventory, setInventory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
//   const [isBillModalOpen, setIsBillModalOpen] = useState(false);
//   const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
//   const { user } = useAuth();
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);



//   // --- Function to fetch inventory ---
//   const fetchInventory = useCallback(async () => {
//     // Don't show loading spinner on manual refresh, just for initial load
//     // setLoading(true); 
//     if (!user?.id) {
//       if (user !== undefined) setError("User not found. Cannot fetch inventory.");
//       setLoading(false);
//       return;
//     }
//     try {
//       setError(null);
//       const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/production-house/${user.id}/inventory`;
//       const response = await axios.get(apiUrl);
//       const inventoryData = response.data.data;
//       const formattedInventory = Object.entries(inventoryData)
//         .filter(([key]) => key !== '_id')
//         .map(([key, value]) => ({ name: formatItemName(key), quantity: value }));
//       setInventory(formattedInventory);
//     } catch (err) {
//       console.error("Failed to fetch inventory:", err);
//       setError("Could not load inventory data.");
//     } finally {
//       if (loading) setLoading(false); // Only stop initial load spinner
//     }
//   }, [user, loading]); // loading is included to manage the initial load state

//   useEffect(() => {
//     fetchInventory();
//   }, [user]); // Run only when user object is available

//   // --- Handler for saving new inventory ---
//   const handleSaveInventory = async (addedData) => {
//     if (!user?.id) return alert("Error: Could not find user ID.");
//     setIsSubmitting(true); // <-- Disable buttons
//     const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/production-house/${user.id}/inventory`;
//     try {
//       await axios.post(apiUrl, addedData);
//       alert("Inventory has been updated successfully!");
//       setIsInventoryModalOpen(false);
//       await fetchInventory();
//     } catch (err) {
//       alert(`Error: ${err.response?.data?.message || "Failed to update inventory."}`);
//     } finally {
//       setIsSubmitting(false); // <-- Re-enable buttons
//     }
//   };

//   // --- Handler for saving a new order ---
//   const handleSaveOrder = async (orderData) => {
//     setIsSubmitting(true); // <-- Disable buttons
//     const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders`;
//     try {
//       await axios.post(apiUrl, orderData);
//       alert("Order created successfully!");
//       setIsOrderModalOpen(false);
//       if (orderData.sourceModel === 'ProductionHouse' && orderData.source === user.id) {
//         await fetchInventory();
//       }
//       setRefreshKey(oldKey => oldKey + 1);
//     } catch (err) {
//       alert(`Error: ${err.response?.data?.message || "Failed to create the order."}`);
//     } finally {
//       setIsSubmitting(false); // <-- Re-enable buttons
//     }
//   };


//   // --- Handler for saving a new bill ---
//   const handleSaveBill = async (billData) => {
//     setIsSubmitting(true); // <-- Disable buttons
//     const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders`;
//     try {
//       await axios.post(apiUrl, billData);
//       alert("Bill created successfully!");
//       setIsBillModalOpen(false);
//       setRefreshKey(oldKey => oldKey + 1);
//     } catch (err) {
//       alert(`Error: ${err.response?.data?.message || "Failed to create the bill."}`);
//     } finally {
//       setIsSubmitting(false); // <-- Re-enable buttons
//     }
//   };

//   if (loading) {
//     return <div className="p-8 text-center text-gray-500">Loading dashboard data...</div>;
//   }

//   if (error) {
//     return <div className="p-8 text-center text-red-500">{error}</div>;
//   }

//   return (
//     <>
//       <div className="container mx-auto p-4 sm:p-6 lg:p-8">
//         {/* Header with Action Buttons */}
//         <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Main Dashboard</h1>
//             <p className="mt-1 text-md text-gray-500">Overview of your inventory and operations.</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <button onClick={() => setIsInventoryModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
//               <PlusIcon className="h-5 w-5" /> Add Stock
//             </button>
//             <button onClick={() => setIsBillModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700">
//               <PlusIcon className="h-5 w-5" /> Add Bill
//             </button>
//             <button onClick={() => setIsOrderModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
//               <PlusIcon className="h-5 w-5" /> Add Order
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-col gap-8">

//           {/* Pallet Table */}
//           <PalletTable refreshKey={refreshKey} />
//           {/* Inventory Status Card */}
//           <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//             <div className="p-5 border-b border-gray-200 flex justify-between items-center">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800">Inventory Status</h2>
//                 <p className="mt-1 text-sm text-gray-500">Current stock levels for all packaging items.</p>
//               </div>
//               {/* --- ✅ NEW: REFRESH BUTTON --- */}
//               <div>
//                 <button
//                   onClick={() => fetchInventory()}
//                   className="p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   title="Refresh Inventory"
//                 >
//                   <ArrowPathIcon className="h-6 w-6" />
//                 </button>
//               </div>
//             </div>
//             <div className="overflow-x-auto">

//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Quantity</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {inventory.map((item) => (
//                     <tr key={item.name} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
//                       <td className="px-6 py-4 text-sm font-semibold text-gray-800">{item.quantity}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>


//         </div>
//       </div>

//       {/* --- Modals Section --- */}
//       <Modal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} title="Create New Order">
//         <AddOrderForm onSave={handleSaveOrder} onClose={() => setIsOrderModalOpen(false)} isSubmitting={isSubmitting} />
//       </Modal>
//       <Modal isOpen={isBillModalOpen} onClose={() => setIsBillModalOpen(false)} title="Add New Bill">
//         <AddBillForm onSave={handleSaveBill} onClose={() => setIsBillModalOpen(false)} isSubmitting={isSubmitting} />
//       </Modal>
//       <Modal isOpen={isInventoryModalOpen} onClose={() => setIsInventoryModalOpen(false)} title="Add Incoming Inventory Stock">
//         <AddInventoryForm onSave={handleSaveInventory} onClose={() => setIsInventoryModalOpen(false)} isSubmitting={isSubmitting} />
//       </Modal>
//     </>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PlusIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import Modal from '../components/Modal';
import AddOrderForm from '../components/AddOrderForm';
import AddInventoryForm from '../components/AddInventoryForm';
import AddBillForm from '../components/AddBillForm';
import PalletTable from '../components/PalletTable';

const formatItemName = (key) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchInventory = useCallback(async () => {
    if (!user?.id) {
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
        .map(([key, value]) => ({ name: formatItemName(key), quantity: value }));
      setInventory(formattedInventory);
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
      setError("Could not load inventory data.");
    } finally {
      if (loading) setLoading(false);
    }
  }, [user, loading]);

  useEffect(() => {
    fetchInventory();
  }, [user]);

  const handleSaveInventory = async (addedData) => {
    if (!user?.id) return alert("Error: Could not find user ID.");
    setIsSubmitting(true);
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/production-house/${user.id}/inventory`;
    try {
      await axios.post(apiUrl, addedData);
      alert("Inventory has been updated successfully!");
      setIsInventoryModalOpen(false);
      await fetchInventory();
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Failed to update inventory."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveOrder = async (orderData) => {
    setIsSubmitting(true);
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders`;
    try {
      await axios.post(apiUrl, orderData);
      alert("Order created successfully!");
      setIsOrderModalOpen(false);
      if (orderData.sourceModel === 'ProductionHouse' && orderData.source === user.id) {
        await fetchInventory();
      }
      setRefreshKey(oldKey => oldKey + 1);
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Failed to create the order."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveBill = async (billData) => {
    setIsSubmitting(true);
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders`;
    try {
      await axios.post(apiUrl, billData);
      alert("Bill created successfully!");
      setIsBillModalOpen(false);
      setRefreshKey(oldKey => oldKey + 1);
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Failed to create the bill."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
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
          <PalletTable refreshKey={refreshKey} />
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Inventory Status</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Current stock levels for all packaging items.</p>
              </div>
              <div>
                <button
                  onClick={() => fetchInventory()}
                  className="p-2 text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  title="Refresh Inventory"
                >
                  <ArrowPathIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Item Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Current Quantity</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {inventory.map((item) => (
                    <tr key={item.name} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-800 dark:text-gray-200">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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
