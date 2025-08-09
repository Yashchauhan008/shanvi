// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// // ✅ 1. Import the new icon and the PDF generator service
// import { EyeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
// import { generateInvoicePdf } from '../services/invoiceGenerator';
// import OrderDetailModal from '../components/OrderDetailModal';
// import OrderFilters from '../components/OrderFilters';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [pagination, setPagination] = useState(null);
//   const [filters, setFilters] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // ✅ 2. Add a new state to track when an invoice is being generated
//   const [isGenerating, setIsGenerating] = useState(false);

//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params = new URLSearchParams({
//         page: currentPage,
//         limit: 100,
//         ...filters,
//       });
//       const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders?${params.toString()}`;
//       const response = await axios.get(apiUrl);
//       setOrders(response.data.data);
//       setPagination(response.data.pagination);
//     } catch (err) {
//       setError("Failed to fetch orders.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, filters]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   const handleFilterChange = (newFilters) => {
//     setCurrentPage(1);
//     setFilters(newFilters);
//   };

//   const handleViewDetails = (order) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedOrder(null);
//   };

//   // ✅ 3. Add the handler function to generate the invoice
//   const handleGenerateInvoice = async (orderId) => {
//     setIsGenerating(true); // Show loading feedback
//     try {
//       // Fetch the complete, populated data for the specific order
//       const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/${orderId}`;
//       const response = await axios.get(apiUrl);
//       const fullOrderData = response.data;

//       // Call the generator service with the fetched data
//       generateInvoicePdf(fullOrderData);

//     } catch (err) {
//       alert('Failed to generate invoice. Could not fetch order details.');
//       console.error(err);
//     } finally {
//       setIsGenerating(false); // Hide loading feedback
//     }
//   };

//   return (
//     <>
//       <div className="container mx-auto p-4 sm:p-6 lg:p-8">
//         <div className="mb-8">
//           {/* ✅ Add dark mode classes */}
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Order History</h1>
//           <p className="mt-1 text-md text-gray-500 dark:text-gray-400">A log of all incoming and outgoing orders.</p>
//         </div>

//         <OrderFilters onFilterChange={handleFilterChange} />

//         {/* Show a loading message while the PDF is being created */}
//         {isGenerating && <div className="my-4 text-center text-blue-600 dark:text-blue-400 font-semibold">Generating Invoice...</div>}

//         {/* ✅ Add dark mode classes */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mt-4">
//           <div className="overflow-x-auto">
//             {loading && <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading orders...</div>}
//             {error && <div className="p-6 text-center text-red-500">{error}</div>}
//             {!loading && !error && (
//               <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                 <thead className="bg-gray-50 dark:bg-gray-700">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Source</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Party</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Factory</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Type</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                   {orders.map((order) => (
//                     <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{order.customOrderId}</td>
//                       <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{order.source?.name || order.source?.username || 'N/A'}</td>
//                       <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{order.party_id?.name || 'N/A'}</td>
//                       <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{order.factory_id?.name || 'N/A'}</td>
//                       <td className="px-6 py-4 text-sm">
//                         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                           order.transactionType === 'order' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
//                         }`}>
//                           {order.transactionType.toUpperCase()}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{new Date(order.date).toLocaleDateString()}</td>
//                       <td className="px-6 py-4 text-sm flex items-center gap-4">
//                         <button onClick={() => handleViewDetails(order)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300" title="View Details">
//                           <EyeIcon className="h-5 w-5" />
//                         </button>
//                         {/* ✅ 4. Add the new button to the table */}
//                         <button onClick={() => handleGenerateInvoice(order._id)} className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400" title="Print Invoice">
//                           <DocumentTextIcon className="h-5 w-5" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//           {pagination && pagination.totalPages > 1 && (
//             <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
//               <p className="text-sm text-gray-700 dark:text-gray-300">Page {pagination.page} of {pagination.totalPages} ({pagination.total} records)</p>
//               <div>
//                 <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="mr-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Prev</button>
//                 <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === pagination.totalPages} className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Next</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <OrderDetailModal isOpen={isModalOpen} onClose={closeModal} order={selectedOrder} />
//     </>
//   );
// };

// export default Orders;
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { EyeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { generateInvoicePdf } from '../services/invoiceGenerator';
import OrderDetailModal from '../components/OrderDetailModal';
import OrderFilters from '../components/OrderFilters';
// ✅ 1. Import the reusable PaginatedTable component
import PaginatedTable from '../components/PaginatedTable';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [apiPagination, setApiPagination] = useState(null); // Renamed to avoid confusion
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 50, // ✅ 2. Pagination limit changed to 50
        ...filters,
      });
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders?${params.toString()}`;
      const response = await axios.get(apiUrl);
      setOrders(response.data.data);
      setApiPagination(response.data.pagination);
    } catch (err) {
      setError("Failed to fetch orders.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleFilterChange = (newFilters) => {
    setCurrentPage(1);
    setFilters(newFilters);
  };

  const handleGenerateInvoice = async (orderId) => {
    setIsGenerating(true);
    try {
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/${orderId}`;
      const response = await axios.get(apiUrl);
      generateInvoicePdf(response.data);
    } catch (err) {
      alert('Failed to generate invoice. Could not fetch order details.');
      console.error(err);
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

  // ✅ 3. Define the columns for the PaginatedTable component
  const columns = [
    // The 'Date' column is now first
    {
      Header: 'Date',
      accessor: 'date',
      Cell: (row) => new Date(row.date).toLocaleDateString(),
    },
    {
      Header: 'ID',
      accessor: 'customOrderId',
    },
    {
      Header: 'Source',
      accessor: 'source',
      Cell: (row) => row.source?.name || row.source?.username || 'N/A',
    },
    {
      Header: 'Party',
      accessor: 'party_id',
      Cell: (row) => row.party_id?.name || 'N/A',
    },
    {
      Header: 'Factory',
      accessor: 'factory_id',
      Cell: (row) => row.factory_id?.name || 'N/A',
    },
    {
      Header: 'Type',
      accessor: 'transactionType',
      Cell: (row) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          row.transactionType === 'order' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          {row.transactionType.toUpperCase()}
        </span>
      ),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleViewDetails(row)} className="text-indigo-600 hover:text-indigo-400" title="View Details">
            <EyeIcon className="h-5 w-5" />
          </button>
          <button onClick={() => handleGenerateInvoice(row._id)} className="text-gray-500 hover:text-indigo-400" title="Print Invoice">
            <DocumentTextIcon className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Order History</h1>
          <p className="mt-1 text-md text-gray-500 dark:text-gray-400">A log of all incoming and outgoing orders.</p>
        </div>

        <OrderFilters onFilterChange={handleFilterChange} />

        {isGenerating && <div className="my-4 text-center text-blue-600 dark:text-blue-400 font-semibold">Generating Invoice...</div>}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mt-4">
          {loading && <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading orders...</div>}
          {error && <div className="p-6 text-center text-red-500">{error}</div>}
          {!loading && !error && (
            // ✅ 4. Use the PaginatedTable component instead of a manual table
            <PaginatedTable columns={columns} data={orders} />
          )}
          
          {/* ✅ 5. The main pagination controls are now outside the table component */}
          {apiPagination && apiPagination.totalPages > 1 && (
            <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-700 dark:text-gray-300">Page {apiPagination.page} of {apiPagination.totalPages} ({apiPagination.total} records)</p>
              <div>
                <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="mr-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Prev</button>
                <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === apiPagination.totalPages} className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <OrderDetailModal isOpen={isModalOpen} onClose={closeModal} order={selectedOrder} />
    </>
  );
};

export default Orders;
