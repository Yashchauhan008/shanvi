// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// // The component now accepts fromDate and toDate from its parent
// const PalletTable = ({ partyId, factoryId, fromDate, toDate }) => {
//   const [pallets, setPallets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchPalletStats = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params = new URLSearchParams();
//       // Add context-aware filters from props
//       if (partyId) params.append('party_id', partyId);
//       if (factoryId) params.append('factory_id', factoryId);
//       // Add date filters from props
//       if (fromDate) params.append('fromDate', fromDate);
//       if (toDate) params.append('toDate', toDate);
      
//       const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/stats/pallets?${params.toString()}`;
//       const response = await axios.get(apiUrl);
//       setPallets(response.data.data);
//     } catch (err) {
//       setError('Failed to load pallet data.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [partyId, factoryId, fromDate, toDate]); // Dependency array includes the new date props

//   useEffect(() => {
//     fetchPalletStats();
//   }, [fetchPalletStats]);

//   const getMostUsedPallet = () => {
//     if (pallets.length === 0) return 'N/A';
//     const mostUsed = pallets.reduce((max, p) => p.totalUsed > max.totalUsed ? p : max, pallets[0]);
//     return `${mostUsed.size} (${mostUsed.totalUsed} used)`;
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//       <div className="p-5 border-b border-gray-200">
//         <h2 className="text-xl font-bold text-gray-800">Pallet Usage Report</h2>
//         <p className="mt-1 text-sm text-gray-500">
//           Showing data from <span className="font-semibold">{fromDate}</span> to <span className="font-semibold">{toDate}</span>.
//         </p>
//       </div>
      
//       <div className="p-4 bg-indigo-50 text-sm border-b">
//         <strong>Insight:</strong> Most frequently used pallet in this period is <span className="font-bold text-indigo-700">{getMostUsedPallet()}</span>.
//       </div>

//       <div className="overflow-x-auto">
//         {loading && <div className="p-6 text-center text-gray-500">Loading pallet details...</div>}
//         {error && <div className="p-6 text-center text-red-500">{error}</div>}
//         {!loading && !error && (
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pallet Size</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Out (Orders)</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Used (Bills)</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remains</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {pallets.length > 0 ? (
//                 pallets.map((pallet) => (
//                   <tr key={pallet.size} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">{pallet.size}</td>
//                     <td className="px-6 py-4 text-sm text-green-600 font-semibold">+{pallet.totalOut}</td>
//                     <td className="px-6 py-4 text-sm text-red-600 font-semibold">-{pallet.totalUsed}</td>
//                     <td className="px-6 py-4 text-sm font-bold text-indigo-600">{pallet.remains}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No pallet data found for the selected criteria.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PalletTable;
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const PalletTable = ({ partyId, factoryId, fromDate, toDate, refreshKey }) => {
  const [pallets, setPallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPalletStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/stats/pallets`;
      const params = new URLSearchParams();
      if (partyId) params.append('party_id', partyId);
      if (factoryId) params.append('factory_id', factoryId);
      if (fromDate) params.append('startDate', fromDate);
      if (toDate) params.append('endDate', toDate);
      const response = await axios.get(`${apiUrl}?${params.toString()}`);
      setPallets(response.data.data);
    } catch (err) {
      setError('Failed to load pallet data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [partyId, factoryId, fromDate, toDate]);

  useEffect(() => {
    fetchPalletStats();
  }, [fetchPalletStats, refreshKey]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Pallet Details</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Summary of pallet usage based on filters.</p>
      </div>
      <div className="overflow-x-auto">
        {loading && <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading pallet details...</div>}
        {error && <div className="p-6 text-center text-red-500">{error}</div>}
        {!loading && !error && (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Pallet Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Total Out (Orders)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Total In (Bills)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Net Balance</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {pallets.length > 0 ? (
                pallets.map((pallet) => (
                  // ✅ Use the new 'palletSize' field for the key and display
                  <tr key={pallet.palletSize} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{pallet.palletSize}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{pallet.totalOut}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{pallet.totalIn}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400">{pallet.netBalance}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No pallet data found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PalletTable;
