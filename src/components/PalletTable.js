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
    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
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
