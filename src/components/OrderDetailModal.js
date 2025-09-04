// import React from 'react';
// import Modal from './Modal';
// import { DocumentTextIcon } from '@heroicons/react/24/outline';

// // Helper array to define all possible inventory fields and their display names.
// const inventoryFields = [
//   { key: 'film_white', name: 'Film White' },
//   { key: 'film_blue', name: 'Film Blue' },
//   { key: 'patti_roll', name: 'Patti roll' },
//   { key: 'packing_clip', name: 'Packing Clip' },
//   { key: 'angle_board_24', name: 'Angle Board 24' },
//   { key: 'angle_board_32', name: 'Angle Board 32' },
//   { key: 'angle_board_36', name: 'Angle Board 36' },
//   { key: 'angle_board_39', name: 'Angle Board 39' },
//   { key: 'angle_board_48', name: 'Angle Board 48' },
//   { key: 'cap_hit', name: 'Cap Hit' },
//   { key: 'cap_simple', name: 'Cap Simple' },
//   { key: 'firmshit', name: 'Firmshit' },
//   { key: 'thermocol', name: 'Thermocol' },
//   { key: 'mettle_angle', name: 'Mettle Angle' },
//   { key: 'black_cover', name: 'Black Cover' },
//   { key: 'patiya', name: 'Patiya' },
//   { key: 'plypatia', name: 'Plypatia' },
// ];

// const OrderDetailModal = ({ isOpen, onClose, order, onGenerateInvoice }) => {
//   if (!order) return null;

//   const getSourceName = (source) => {
//     if (!source) return 'N/A';
//     return source.name || source.username || 'N/A';
//   };

//   // ✅ Filter for inventory items that are actually present in the order.
//   const includedInventory = inventoryFields.filter(field => {
//     const value = order[field.key];
//     // For strings (CAPs), check if it's not '0' or empty.
//     // For numbers, check if it's greater than 0.
//     return typeof value === 'string' ? value && value !== '0' : value > 0;
//   });

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title={`Details for Order #${order.customOrderId}`}>
//       <div className="space-y-6 text-sm">
//         {/* --- Main Details --- */}
//         <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//           <div>
//             <p className="font-semibold text-gray-600 dark:text-gray-300">Source</p>
//             <p className="text-gray-900 dark:text-gray-100">{getSourceName(order.source)}</p>
//           </div>
//           <div>
//             <p className="font-semibold text-gray-600 dark:text-gray-300">Date</p>
//             <p className="text-gray-900 dark:text-gray-100">{new Date(order.date).toLocaleDateString()}</p>
//           </div>
//           <div>
//             <p className="font-semibold text-gray-600 dark:text-gray-300">Party</p>
//             <p className="text-gray-900 dark:text-gray-100">{order.party_id?.name || 'N/A'}</p>
//           </div>
//           <div>
//             <p className="font-semibold text-gray-600 dark:text-gray-300">Factory</p>
//             <p className="text-gray-900 dark:text-gray-100">{order.factory_id?.name || 'N/A'}</p>
//           </div>
//         </div>

//         {/* --- Pallet Details Table --- */}
//         {order.items && order.items.length > 0 && (
//           <div>
//             <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Pallet Details</h4>
//             <div className="border rounded-lg overflow-hidden border-gray-200 dark:border-gray-600">
//               <table className="min-w-full">
//                 <thead className="bg-gray-100 dark:bg-gray-700">
//                   <tr>
//                     <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Size</th>
//                     <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Quantity</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
//                   {order.items.map((pallet, index) => (
//                     <tr key={index}>
//                       <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{pallet.paletSize}</td>
//                       <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{pallet.quantity}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* --- Inventory Items Display --- */}
//         {includedInventory.length > 0 && (
//           <div>
//             <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Inventory Items</h4>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//               {includedInventory.map(field => (
//                 <div key={field.key}>
//                   <p className="font-medium text-gray-600 dark:text-gray-300">{field.name}</p>
//                   {/* ✅ This now correctly displays the string value for CAPs */}
//                   <p className="text-gray-900 dark:text-gray-100">{order[field.key]}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* --- Modal Actions --- */}
//         <div className="pt-4 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700">
//           <button
//             type="button"
//             onClick={() => onGenerateInvoice(order._id)}
//             className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
//           >
//             <DocumentTextIcon className="h-5 w-5" />
//             Generate Invoice
//           </button>
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default OrderDetailModal;

import React from 'react';
import Modal from './Modal';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

// Helper array to define all possible inventory fields and their display names.
const inventoryFields = [
  { key: 'film_white', name: 'Film White' },
  { key: 'film_blue', name: 'Film Blue' },
  { key: 'patti_roll', name: 'Patti roll' },
  { key: 'packing_clip', name: 'Packing Clip' },
  { key: 'angle_board_24', name: 'Angle Board 24' },
  { key: 'angle_board_32', name: 'Angle Board 32' },
  { key: 'angle_board_36', name: 'Angle Board 36' },
  { key: 'angle_board_39', name: 'Angle Board 39' },
  { key: 'angle_board_48', name: 'Angle Board 48' },
  { key: 'cap_hit', name: 'Cap Hit' },
  { key: 'cap_simple', name: 'Cap Simple' },
  { key: 'firmshit', name: 'Firmshit' },
  { key: 'thermocol', name: 'Thermocol' },
  { key: 'mettle_angle', name: 'Mettle Angle' },
  { key: 'black_cover', name: 'Black Cover' },
  { key: 'patiya', name: 'Patiya' },
  { key: 'plypatia', name: 'Plypatia' },
];

const OrderDetailModal = ({ isOpen, onClose, order, onGenerateInvoice }) => {
  if (!order) return null;

  const getSourceName = (source) => {
    if (!source) return 'N/A';
    return source.name || source.username || 'N/A';
  };

  // Filter for inventory items that are actually present in the order.
  const includedInventory = inventoryFields.filter(field => {
    const value = order[field.key];
    return typeof value === 'string' ? value && value !== '0' : value > 0;
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Details for Order #${order.customOrderId}`}>
      <div className="space-y-6 text-sm">
        {/* --- Main Details --- */}
        {/* ✅ --- THIS IS THE FIX --- */}
        {/* The grid is now explicitly a 2-column layout to create the 3x2 structure. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        {/* ✅ --- END OF FIX --- */}
          <div>
            <p className="font-semibold text-gray-600 dark:text-gray-300">Source</p>
            <p className="text-gray-900 dark:text-gray-100">{getSourceName(order.source)}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600 dark:text-gray-300">Date</p>
            <p className="text-gray-900 dark:text-gray-100">{new Date(order.date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600 dark:text-gray-300">Party</p>
            <p className="text-gray-900 dark:text-gray-100">{order.party_id?.name || 'N/A'}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600 dark:text-gray-300">Factory</p>
            <p className="text-gray-900 dark:text-gray-100">{order.factory_id?.name || 'N/A'}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600 dark:text-gray-300">Vehicle</p>
            <p className="text-gray-900 dark:text-gray-100">{order.vehicle || 'N/A'}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600 dark:text-gray-300">Vehicle Number</p>
            <p className="text-gray-900 dark:text-gray-100">{order.vehicle_number || 'N/A'}</p>
          </div>
        </div>

        {/* --- Pallet Details Table --- */}
        {order.items && order.items.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Pallet Details</h4>
            <div className="border rounded-lg overflow-hidden border-gray-200 dark:border-gray-600">
              <table className="min-w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Size</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {order.items.map((pallet, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{pallet.paletSize}</td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{pallet.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- Inventory Items Display --- */}
        {includedInventory.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Inventory Items</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {includedInventory.map(field => (
                <div key={field.key}>
                  <p className="font-medium text-gray-600 dark:text-gray-300">{field.name}</p>
                  <p className="text-gray-900 dark:text-gray-100">{order[field.key]}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Modal Actions --- */}
        <div className="pt-4 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => onGenerateInvoice(order._id)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
          >
            <DocumentTextIcon className="h-5 w-5" />
            Generate Invoice
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
