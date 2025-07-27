import React from 'react';
import Modal from './Modal'; // Reuse our existing Modal component

const OrderDetailModal = ({ isOpen, onClose, order }) => {
  if (!order) return null; // Don't render if no order is selected

  // Helper to get the name from an ID
  const getNameById = (id, list) => list.find(item => item.id === id)?.name || 'N/A';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Details for Order #${order.id}`}>
      <div className="space-y-6 text-sm">
        {/* --- Main Details --- */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-semibold text-gray-600">Production House</p>
            <p className="text-gray-900">{order.productionHouseName}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Date</p>
            <p className="text-gray-900">{order.date}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Party</p>
            <p className="text-gray-900">{order.partyName}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Factory</p>
            <p className="text-gray-900">{order.factoryName}</p>
          </div>
        </div>

        {/* --- Pallet Details --- */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Pallet Details</h4>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Size</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.pallets.map((pallet, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2 text-gray-800">{pallet.size}</td>
                    <td className="px-4 py-2 text-gray-800">{pallet.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Inventory Details --- */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Inventory Items</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 p-4 bg-gray-50 rounded-lg">
            {Object.entries(order.inventory).map(([key, value]) => (
              <div key={key}>
                <p className="font-medium text-gray-600 capitalize">{key.replace(/_/g, ' ')}</p>
                <p className="text-gray-900">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                Close
            </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
