// import React from 'react';
// import Modal from './Modal';

// // --- THE FIX IS HERE: Define the missing array ---
// // This array lists all the possible inventory keys from your schema.
// const inventoryFields = [
//   'film_white', 'film_blue', 'patti_role', 'angle_board_24', 'angle_board_32',
//   'angle_board_36', 'angle_board_39', 'angle_board_48', 'cap_hit', 'cap_simple',
//   'firmshit', 'thermocol', 'mettle_angle', 'black_cover', 'packing_clip', 'patiya', 'plypatia'
// ];

// const OrderDetailModal = ({ isOpen, onClose, order }) => {
//   if (!order) return null;

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title={`Details for ${order.customOrderId}`}>
//       <div className="space-y-6 text-sm">
//         {/* ... (The rest of the JSX is unchanged) ... */}
//         <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
//           <div>
//             <p className="font-semibold text-gray-600">Source</p>
//             <p className="text-gray-900">{order.source?.name || order.source?.username || 'N/A'}</p>
//           </div>
//           <div>
//             <p className="font-semibold text-gray-600">Transaction Type</p>
//             <p className="text-gray-900 capitalize">{order.transactionType}</p>
//           </div>
//           <div>
//             <p className="font-semibold text-gray-600">Date</p>
//             <p className="text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
//           </div>
//           <div>
//             <p className="font-semibold text-gray-600">Party</p>
//             <p className="text-gray-900">{order.party_id?.name || 'N/A'}</p>
//           </div>
//           <div>
//             <p className="font-semibold text-gray-600">Factory</p>
//             <p className="text-gray-900">{order.factory_id?.name || 'N/A'}</p>
//           </div>
//            <div>
//             <p className="font-semibold text-gray-600">Vehicle</p>
//             <p className="text-gray-900">{order.vehicle} ({order.vehicle_number})</p>
//           </div>
//         </div>

//         {order.items && order.items.length > 0 && (
//           <div>
//             <h4 className="font-semibold text-gray-800 mb-2">Pallet Details</h4>
//             <div className="border rounded-lg overflow-hidden">
//               <table className="min-w-full">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-4 py-2 text-left font-medium text-gray-600">Size</th>
//                     <th className="px-4 py-2 text-left font-medium text-gray-600">Quantity</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {order.items.map((pallet, index) => (
//                     <tr key={index} className="border-t">
//                       <td className="px-4 py-2 text-gray-800">{pallet.paletSize}</td>
//                       <td className="px-4 py-2 text-gray-800">{pallet.quantity}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         <div>
//           <h4 className="font-semibold text-gray-800 mb-2">Inventory Items in this Order</h4>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 p-4 bg-gray-50 rounded-lg">
//             {/* This map will now work correctly because inventoryFields is defined */}
//             {inventoryFields.map(field => order[field] > 0 && (
//               <div key={field}>
//                 <p className="font-medium text-gray-600 capitalize">{field.replace(/_/g, ' ')}</p>
//                 <p className="text-gray-900">{order[field]}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="pt-4 flex justify-end">
//           <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Close</button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default OrderDetailModal;

import React from 'react';
import Modal from './Modal';
import { DocumentTextIcon } from '@heroicons/react/24/outline';


const OrderDetailModal = ({ isOpen, onClose, order, onGenerateInvoice }) => {
  if (!order) return null;

  const getSourceName = (source) => {
    if (!source) return 'N/A';
    return source.name || source.username || 'N/A';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Details for Order #${order.customOrderId}`}>
      <div className="space-y-6 text-sm">
        {/* ✅ Add dark mode classes */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
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
        </div>

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

        <div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Inventory Items</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {Object.entries(order)
              .filter(([key, value]) => inventoryFields.includes(key) && value > 0)
              .map(([key, value]) => (
                <div key={key}>
                  <p className="font-medium text-gray-600 dark:text-gray-300 capitalize">{key.replace(/_/g, ' ')}</p>
                  <p className="text-gray-900 dark:text-gray-100">{value}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end items-center space-x-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => onGenerateInvoice(order._id)}
            className="flex items-center gap-2 px-4 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700"
          >
            <DocumentTextIcon className="h-5 w-5" />
            Generate Invoice
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 dark:bg-gray-600 dark:text-gray-100 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Helper array for filtering inventory fields
const inventoryFields = [
  'film_white', 'film_blue', 'patti_role', 'angle_board_24', 'angle_board_32', 
  'angle_board_36', 'angle_board_39', 'angle_board_48', 'cap_hit', 'cap_simple', 
  'firmshit', 'thermocol', 'mettle_angle', 'black_cover', 'packing_clip', 
  'patiya', 'plypatia'
];

export default OrderDetailModal;
