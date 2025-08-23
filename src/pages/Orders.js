
// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { EyeIcon, DocumentTextIcon, TrashIcon } from '@heroicons/react/24/outline';
// import { generateInvoicePdf } from '../services/invoiceGenerator';
// import OrderDetailModal from '../components/OrderDetailModal';
// import OrderFilters from '../components/OrderFilters';
// import PaginatedTable from '../components/PaginatedTable';
// import { useAuth } from '../context/AuthContext';
// // ✅ 1. Import the new, separate search component
// import OrderSearch from '../components/OrderSearch';

// const Orders = () => {
//   // --- ALL YOUR EXISTING STATE AND LOGIC REMAINS UNTOUCHED ---
//   const [orders, setOrders] = useState([]);
//   const [apiPagination, setApiPagination] = useState(null);
//   const [filters, setFilters] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const { isDeleteEnabled } = useAuth();

//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params = new URLSearchParams({ page: currentPage, limit: 50, ...filters });
//       const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders?${params.toString()}`;
//       const response = await axios.get(apiUrl);
//       setOrders(response.data.data);
//       setApiPagination(response.data.pagination);
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

//   const handleGenerateInvoice = async (orderId) => {
//     setIsGenerating(true);
//     try {
//       const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/${orderId}`;
//       const response = await axios.get(apiUrl);
//       generateInvoicePdf(response.data);
//     } catch (err) {
//       alert('Failed to generate invoice. Could not fetch order details.');
//       console.error(err);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleDeleteOrder = async (orderId) => {
//     if (window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
//       try {
//         const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/${orderId}`;
//         await axios.delete(apiUrl);
//         alert("Order deleted successfully!");
//         fetchOrders();
//       } catch (err) {
//         alert(`Error: ${err.response?.data?.message || "Failed to delete the order."}`);
//         console.error(err);
//       }
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

//   // ✅ 2. Add two small handler functions to connect the search component to the modal
//   const handleSearchResult = (foundOrder) => {
//     setSelectedOrder(foundOrder);
//     setIsModalOpen(true);
//   };

//   const handleSearchError = (errorMessage) => {
//     alert(`Error: ${errorMessage}`);
//   };

//   // ✅ This is the full, restored columns definition for your table.
//   const columns = [
//     { Header: 'Date', accessor: 'date', Cell: (row) => new Date(row.date).toLocaleDateString() },
//     { Header: 'ID', accessor: 'customOrderId' },
//     { Header: 'Source', accessor: 'source', Cell: (row) => row.source?.name || row.source?.username || 'N/A' },
//     { Header: 'Party', accessor: 'party_id', Cell: (row) => row.party_id?.name || 'N/A' },
//     { Header: 'Factory', accessor: 'factory_id', Cell: (row) => row.factory_id?.name || 'N/A' },
//     {
//       Header: 'Type',
//       accessor: 'transactionType',
//       Cell: (row) => (
//         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//           row.transactionType === 'order' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
//         }`}>
//           {row.transactionType.toUpperCase()}
//         </span>
//       ),
//     },
//     {
//       Header: 'Actions',
//       accessor: 'actions',
//       Cell: (row) => (
//         <div className="flex items-center gap-4">
//           <button onClick={() => handleViewDetails(row)} className="text-indigo-600 hover:text-indigo-400" title="View Details">
//             <EyeIcon className="h-5 w-5" />
//           </button>
//           <button onClick={() => handleGenerateInvoice(row._id)} className="text-gray-500 hover:text-indigo-400" title="Print Invoice">
//             <DocumentTextIcon className="h-5 w-5" />
//           </button>
//           {isDeleteEnabled && (
//             <button
//               onClick={() => handleDeleteOrder(row._id)}
//               className="text-red-500 hover:text-red-700"
//               title="Delete Order"
//             >
//               <TrashIcon className="h-5 w-5" />
//             </button>
//           )}
//         </div>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div className="container mx-auto p-4 sm:p-6 lg:p-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Order History</h1>
//           <p className="mt-1 text-md text-gray-500 dark:text-gray-400">A log of all incoming and outgoing orders.</p>
//         </div>

//         {/* ✅ 3. Add the new component here, on top of the existing filters */}
//         <OrderSearch
//           onSearchComplete={handleSearchResult}
//           onSearchError={handleSearchError}
//         />

//         {/* --- ALL YOUR OTHER EXISTING UI REMAINS UNTOUCHED --- */}
//         <OrderFilters onFilterChange={handleFilterChange} />

//         {isGenerating && <div className="my-4 text-center text-blue-600 dark:text-blue-400 font-semibold">Generating Invoice...</div>}

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mt-4">
//           {loading && <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading orders...</div>}
//           {error && <div className="p-6 text-center text-red-500">{error}</div>}
//           {!loading && !error && (
//             <PaginatedTable columns={columns} data={orders} />
//           )}
//           {apiPagination && apiPagination.totalPages > 1 && (
//             <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
//               <p className="text-sm text-gray-700 dark:text-gray-300">Page {apiPagination.page} of {apiPagination.totalPages} ({apiPagination.total} records)</p>
//               <div>
//                 <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="mr-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Prev</button>
//                 <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === apiPagination.totalPages} className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Next</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <OrderDetailModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         order={selectedOrder}
//         onGenerateInvoice={handleGenerateInvoice}
//       />
//     </>
//   );
// };

// export default Orders;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// Import all necessary icons, including the new PencilIcon
import { EyeIcon, DocumentTextIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { generateInvoicePdf } from '../services/invoiceGenerator';
import OrderDetailModal from '../components/OrderDetailModal';
import OrderFilters from '../components/OrderFilters';
import PaginatedTable from '../components/PaginatedTable';
import { useAuth } from '../context/AuthContext';
import OrderSearch from '../components/OrderSearch';
// Import the Modal and the new EditOrderForm component
import Modal from '../components/Modal';
import EditOrderForm from '../components/EditOrderForm';

const Orders = () => {
  // State for the main table and its data
  const [orders, setOrders] = useState([]);
  const [apiPagination, setApiPagination] = useState(null);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the "View Details" modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // State for the new "Edit Transaction" modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Other UI-related state
  const [isGenerating, setIsGenerating] = useState(false);
  const { isDeleteEnabled } = useAuth();

  // --- DATA FETCHING AND HANDLERS ---

  // Fetches the list of orders for the main table
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: currentPage, limit: 50, ...filters });
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

  // Initial data load and re-fetch when filters/page change
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Handles changes from the filter component
  const handleFilterChange = (newFilters) => {
    setCurrentPage(1);
    setFilters(newFilters);
  };

  // Handles invoice generation
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

  // Handles deleting an order
  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      try {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/${orderId}`;
        await axios.delete(apiUrl);
        alert("Order deleted successfully!");
        fetchOrders();
      } catch (err) {
        alert(`Error: ${err.response?.data?.message || "Failed to delete the order."}`);
        console.error(err);
      }
    }
  };

  // --- MODAL HANDLERS ---

  // Opens the "View Details" modal
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  // Opens the "Edit Transaction" modal
  const handleEditClick = (order) => {
    setOrderToEdit(order);
    setIsEditModalOpen(true);
  };

  // Closes the "Edit Transaction" modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setOrderToEdit(null);
  };

  // Submits changes from the edit form
  const handleSaveChanges = async (orderId, updatedData) => {
    setIsSubmitting(true);
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/orders/${orderId}`, updatedData);
      alert('Transaction updated successfully!');
      closeEditModal();
      fetchOrders(); // Refresh the table data to show changes
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Failed to update transaction."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- SEARCH HANDLERS ---

  // Handles successful search result from the OrderSearch component
  const handleSearchResult = (foundOrder) => {
    setSelectedOrder(foundOrder);
    setIsDetailModalOpen(true); // Re-uses the detail modal for showing search results
  };

  // Handles errors from the OrderSearch component
  const handleSearchError = (errorMessage) => {
    alert(`Error: ${errorMessage}`);
  };

  // --- TABLE DEFINITION ---

  const columns = [
    { Header: 'Date', accessor: 'date', Cell: (row) => new Date(row.date).toLocaleDateString() },
    { Header: 'ID', accessor: 'customOrderId' },
    { Header: 'Source', accessor: 'source', Cell: (row) => row.source?.name || row.source?.username || 'N/A' },
    { Header: 'Party', accessor: 'party_id', Cell: (row) => row.party_id?.name || 'N/A' },
    { Header: 'Factory', accessor: 'factory_id', Cell: (row) => row.factory_id?.name || 'N/A' },
    {
      Header: 'Type',
      accessor: 'transactionType',
      Cell: (row) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${row.transactionType === 'order' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
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
          {isDeleteEnabled && (
            <>
              <button onClick={() => handleEditClick(row)} className="text-blue-600 hover:text-blue-400" title="Edit Transaction">
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDeleteOrder(row._id)}
                className="text-red-500 hover:text-red-700"
                title="Delete Order"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </>
          )}
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

        <OrderSearch
          onSearchComplete={handleSearchResult}
          onSearchError={handleSearchError}
        />

        <OrderFilters onFilterChange={handleFilterChange} />

        {isGenerating && <div className="my-4 text-center text-blue-600 dark:text-blue-400 font-semibold">Generating Invoice...</div>}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mt-4">
          {loading && <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading orders...</div>}
          {error && <div className="p-6 text-center text-red-500">{error}</div>}
          {!loading && !error && (
            <PaginatedTable columns={columns} data={orders} />
          )}
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

      {/* Modal for Viewing Details */}
      <OrderDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        order={selectedOrder}
        onGenerateInvoice={handleGenerateInvoice}
      />

      {/* Modal for Editing a Transaction */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title={`Edit ${orderToEdit?.customOrderId || 'Transaction'}`}>
        <EditOrderForm
          orderToEdit={orderToEdit}
          onSave={handleSaveChanges}
          onClose={closeEditModal}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </>
  );
};

export default Orders;
