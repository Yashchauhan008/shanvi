import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const PalletTable = ({ partyId, factoryId, fromDate, toDate }) => {
  const [pallets, setPallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPalletStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // --- 1. Construct the API URL with query parameters ---
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/stats/pallets`;
      const params = new URLSearchParams();
      
      if (partyId) params.append('party_id', partyId);
      if (factoryId) params.append('factory_id', factoryId);
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);

      // --- 2. Make the API call ---
      const response = await axios.get(`${apiUrl}?${params.toString()}`);
      setPallets(response.data.data);

    } catch (err) {
      setError('Failed to load pallet data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
    // The dependency array includes all props that can trigger a re-fetch.
  }, [partyId, factoryId, fromDate, toDate]);

  // --- 3. useEffect hook to call the fetch function ---
  useEffect(() => {
    fetchPalletStats();
  }, [fetchPalletStats]); // It runs whenever the fetch function changes (i.e., when props change)

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Pallet Details</h2>
        <p className="mt-1 text-sm text-gray-500">Summary of pallet usage based on filters.</p>
      </div>
      <div className="overflow-x-auto">
        {loading && <div className="p-6 text-center text-gray-500">Loading pallet details...</div>}
        {error && <div className="p-6 text-center text-red-500">{error}</div>}
        {!loading && !error && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pallet Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Used</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remains</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pallets.length > 0 ? (
                pallets.map((pallet) => (
                  <tr key={pallet.size} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{pallet.size}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{pallet.totalOut}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{pallet.totalUsed}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-indigo-600">{pallet.remains}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No pallet data found for the selected criteria.</td>
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
