import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { EyeIcon } from '@heroicons/react/24/outline';
import OrderDetailModal from './OrderDetailModal';

// The component now accepts fromDate and toDate from its parent
const TransactionHistory = ({ partyId, factoryId, fromDate, toDate }) => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for the user-selectable filter remains internal to this component
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('');

  // State for the modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
      });

      // Add context-aware filters from props
      if (partyId) params.append('party_id', partyId);
      if (factoryId) params.append('factory_id', factoryId);
      
      // Add date filters from props
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);
      
      // Add the user-selected filter
      if (transactionTypeFilter) {
        params.append('transactionType', transactionTypeFilter);
      }

      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders?${params.toString()}`;
      const response = await axios.get(apiUrl);
      setTransactions(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      setError('Failed to fetch transaction history.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, partyId, factoryId, fromDate, toDate, transactionTypeFilter]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleFilterChange = (e) => {
    setCurrentPage(1); // Reset to first page when filter changes
    setTransactionTypeFilter(e.target.value);
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
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Transaction History</h2>
            <p className="mt-1 text-sm text-gray-500">A log of all orders and bills for this context.</p>
          </div>
          <div>
            <select
              value={transactionTypeFilter}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm"
            >
              <option value="">All Transactions</option>
              <option value="order">Orders Only</option>
              <option value="bill">Bills Only</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading && <div className="p-6 text-center text-gray-500">Loading history...</div>}
          {error && <div className="p-6 text-center text-red-500">{error}</div>}
          {!loading && !error && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.length > 0 ? (
                  transactions.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.customOrderId}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.transactionType === 'order' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {order.transactionType.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.source?.name || order.source?.username || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm">
                        <button onClick={() => handleViewDetails(order)} className="text-indigo-600 hover:text-indigo-900">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No transactions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        {pagination && pagination.totalPages > 1 && (
          <div className="px-6 py-3 flex items-center justify-between border-t">
            <p className="text-sm text-gray-700">Page {pagination.page} of {pagination.totalPages}</p>
            <div>
              <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="mr-2 px-3 py-1 border rounded disabled:opacity-50">Prev</button>
              <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === pagination.totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>
      <OrderDetailModal isOpen={isModalOpen} onClose={closeModal} order={selectedOrder} />
    </>
  );
};

export default TransactionHistory;
