import React, { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import OrderDetailModal from '../components/OrderDetailModal';

// --- DUMMY DATA (Unchanged) ---
const dummyOrders = [
  {
    id: 'ORD-001',
    date: '2025-07-26',
    productionHouseName: 'Main Production',
    partyName: 'Alpha Traders',
    factoryName: 'Alpha Steel',
    orderOut: true,
    pallets: [
      { size: '1200x600', quantity: 10 },
      { size: '800x800', quantity: 5 },
    ],
    inventory: {
      patiya: 100,
      film_blue: 20,
      ab_36: 50,
    },
  },
  {
    id: 'ORD-002',
    date: '2025-07-25',
    productionHouseName: 'West Wing',
    partyName: 'Beta Logistics',
    factoryName: 'Beta Warehouse',
    orderOut: false,
    pallets: [
      { size: '1000x1000', quantity: 15 },
    ],
    inventory: {
      patti_role: 50,
      thermocol: 200,
    },
  },
  {
    id: 'ORD-003',
    date: '2025-07-24',
    productionHouseName: 'Main Production',
    partyName: 'Gamma Supplies',
    factoryName: 'Gamma Plastics',
    orderOut: true,
    pallets: [
      { size: '200x200', quantity: 30 },
      { size: '1200x600', quantity: 20 },
    ],
    inventory: {
      film_white: 35,
      packing_clip: 5,
      ab_24: 150,
      ab_48: 100,
    },
  },
];

const Orders = () => {
  const [orders] = useState(dummyOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Order History</h1>
          <p className="mt-1 text-md text-gray-500">A log of all incoming and outgoing orders.</p>
        </div>

        {/* Orders Table - with updated column order */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Production House</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Party</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Factory</th> {/* <-- ADDED FACTORY */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th> {/* <-- MOVED DATE */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.productionHouseName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.partyName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.factoryName}</td> {/* <-- ADDED FACTORY DATA */}
                    <td className="px-6 py-4 text-sm">
                      {order.orderOut ? (
                        <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                          OUT
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                          IN
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td> {/* <-- MOVED DATE DATA */}
                    <td className="px-6 py-4 text-sm">
                      <button onClick={() => handleViewDetails(order)} className="text-indigo-600 hover:text-indigo-900">
                        <EyeIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <OrderDetailModal isOpen={isModalOpen} onClose={closeModal} order={selectedOrder} />
    </>
  );
};

export default Orders;
