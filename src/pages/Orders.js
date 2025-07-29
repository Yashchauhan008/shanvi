import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { EyeIcon } from '@heroicons/react/24/outline';
import OrderDetailModal from '../components/OrderDetailModal';
import OrderFilters from '../components/OrderFilters'; // It now imports the simplified version

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 100,
        ...filters,
      });
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders?${params.toString()}`;
      const response = await axios.get(apiUrl);
      setOrders(response.data.data);
      setPagination(response.data.pagination);
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
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Order History</h1>
          <p className="mt-1 text-md text-gray-500">A log of all incoming and outgoing orders.</p>
        </div>

        <OrderFilters onFilterChange={handleFilterChange} />

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            {loading && <div className="p-6 text-center">Loading orders...</div>}
            {error && <div className="p-6 text-center text-red-500">{error}</div>}
            {!loading && !error && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Party</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Factory</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.customOrderId}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.source?.name || order.source?.username || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.party_id?.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.factory_id?.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.transactionType === 'order' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {order.transactionType.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm">
                        <button onClick={() => handleViewDetails(order)} className="text-indigo-600 hover:text-indigo-900">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {pagination && pagination.totalPages > 1 && (
            <div className="px-6 py-3 flex items-center justify-between border-t">
              <p className="text-sm text-gray-700">Page {pagination.page} of {pagination.totalPages} ({pagination.total} records)</p>
              <div>
                <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="mr-2 px-3 py-1 border rounded disabled:opacity-50">Prev</button>
                <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === pagination.totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
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
