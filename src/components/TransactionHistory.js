// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { EyeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
// import OrderDetailModal from './OrderDetailModal';
// import { generateInvoicePdf } from '../services/invoiceGenerator';

// const TransactionHistory = ({ partyId, factoryId, fromDate, toDate }) => {
//   const [orders, setOrders] = useState([]);
//   const [pagination, setPagination] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params = new URLSearchParams({ page: currentPage, limit: 20 });
//       if (partyId) params.append('party_id', partyId);
//       if (factoryId) params.append('factory_id', factoryId);
//       if (fromDate) params.append('startDate', fromDate);
//       if (toDate) params.append('endDate', toDate);

//       const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders?${params.toString()}`;
//       const response = await axios.get(apiUrl);
//       setOrders(response.data.data);
//       setPagination(response.data.pagination);
//     } catch (err) {
//       setError("Failed to fetch transaction history.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, partyId, factoryId, fromDate, toDate]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   const handleGenerateInvoice = async (orderId) => {
//     setIsGenerating(true);
//     try {
//       const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/${orderId}`;
//       const response = await axios.get(apiUrl);
//       generateInvoicePdf(response.data);
//     } catch (err) {
//       alert('Failed to generate invoice.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleViewDetails = (order) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedOrder(null);
//   };

//   return (
//     // ✅ Add dark mode classes to the main container
//     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//       <div className="p-5 border-b border-gray-200 dark:border-gray-700">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Transaction History</h2>
//         <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">A log of individual orders and bills for the selected criteria.</p>
//       </div>
//       <div className="overflow-x-auto">
//         {loading && <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading history...</div>}
//         {error && <div className="p-6 text-center text-red-500">{error}</div>}
//         {isGenerating && <div className="p-4 text-center text-blue-600 font-semibold">Generating Invoice...</div>}
//         {!loading && !error && (
//           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//             {/* ✅ Add dark mode classes to the table header */}
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Source</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
//               </tr>
//             </thead>
//             {/* ✅ Add dark mode classes to the table body */}
//             <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//               {orders.length > 0 ? (
//                 orders.map((order) => (
//                   // ✅ Add dark mode classes to the table row hover state
//                   <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{order.customOrderId}</td>
//                     <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{order.source?.name || order.source?.username || 'N/A'}</td>
//                     <td className="px-6 py-4 text-sm">
//                       <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                         order.transactionType === 'order' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
//                       }`}>
//                         {order.transactionType.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{new Date(order.date).toLocaleDateString()}</td>
//                     <td className="px-6 py-4 text-sm flex items-center gap-4">
//                       <button onClick={() => handleViewDetails(order)} className="text-indigo-600 hover:text-indigo-400" title="View Details">
//                         <EyeIcon className="h-5 w-5" />
//                       </button>
//                       <button onClick={() => handleGenerateInvoice(order._id)} className="text-gray-500 hover:text-indigo-400" title="Print Invoice">
//                         <DocumentTextIcon className="h-5 w-5" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No transactions found.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//       {/* ✅ Add dark mode classes to the pagination controls */}
//       {pagination && pagination.totalPages > 1 && (
//         <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
//           <p className="text-sm text-gray-700 dark:text-gray-300">Page {pagination.page} of {pagination.totalPages}</p>
//           <div>
//             <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="mr-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Prev</button>
//             <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === pagination.totalPages} className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Next</button>
//           </div>
//         </div>
//       )}
//       <OrderDetailModal isOpen={isModalOpen} onClose={closeModal} order={selectedOrder} />
//     </div>
//   );
// };

// export default TransactionHistory;

// src/components/TransactionHistory.js

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// ✅ 1. Import TrashIcon and useAuth hook
import { EyeIcon, DocumentTextIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext'; // To check if delete is enabled
import OrderDetailModal from './OrderDetailModal';
import { generateInvoicePdf } from '../services/invoiceGenerator';

const TransactionHistory = ({ partyId, factoryId, fromDate, toDate }) => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // ✅ 2. Get the delete toggle state from the AuthContext
  const { isDeleteEnabled } = useAuth();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: currentPage, limit: 20 });
      if (partyId) params.append('party_id', partyId);
      if (factoryId) params.append('factory_id', factoryId);
      if (fromDate) params.append('startDate', fromDate);
      if (toDate) params.append('endDate', toDate);

      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders?${params.toString()}`;
      const response = await axios.get(apiUrl);
      setOrders(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      setError("Failed to fetch transaction history.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, partyId, factoryId, fromDate, toDate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ✅ 3. Add the handleDelete function, identical to the one in Orders.js
  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this transaction? This action cannot be undone.")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/orders/${orderId}`);
        alert("Transaction deleted successfully!");
        fetchOrders(); // Refresh the list after deletion
      } catch (err) {
        alert(`Error: ${err.response?.data?.message || "Failed to delete the transaction."}`);
        console.error(err);
      }
    }
  };

  const handleGenerateInvoice = async (orderId) => {
    setIsGenerating(true);
    try {
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/${orderId}`;
      const response = await axios.get(apiUrl);
      generateInvoicePdf(response.data);
    } catch (err) {
      alert('Failed to generate invoice.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Transaction History</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">A log of individual orders and bills for the selected criteria.</p>
      </div>
      <div className="overflow-x-auto">
        {loading && <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading history...</div>}
        {error && <div className="p-6 text-center text-red-500">{error}</div>}
        {isGenerating && <div className="p-4 text-center text-blue-600 font-semibold">Generating Invoice...</div>}
        {!loading && !error && (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{order.customOrderId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{order.source?.name || order.source?.username || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        order.transactionType === 'order' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {order.transactionType.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm flex items-center gap-4">
                      <button onClick={() => handleViewDetails(order)} className="text-indigo-600 hover:text-indigo-400" title="View Details">
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleGenerateInvoice(order._id)} className="text-gray-500 hover:text-indigo-400" title="Print Invoice">
                        <DocumentTextIcon className="h-5 w-5" />
                      </button>
                      {/* ✅ 4. Conditionally render the delete button based on the toggle state */}
                      {isDeleteEnabled && (
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete Transaction"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {pagination && pagination.totalPages > 1 && (
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-700 dark:text-gray-300">Page {pagination.page} of {pagination.totalPages}</p>
          <div>
            <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="mr-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Prev</button>
            <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === pagination.totalPages} className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Next</button>
          </div>
        </div>
      )}
      <OrderDetailModal isOpen={isModalOpen} onClose={closeModal} order={selectedOrder} />
    </div>
  );
};

export default TransactionHistory;
