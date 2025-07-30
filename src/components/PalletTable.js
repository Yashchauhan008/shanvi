import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// The component now accepts fromDate and toDate from its parent
const PalletTable = ({ partyId, factoryId, fromDate, toDate }) => {
  const [pallets, setPallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPalletStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      // Add context-aware filters from props
      if (partyId) params.append('party_id', partyId);
      if (factoryId) params.append('factory_id', factoryId);
      // Add date filters from props
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);
      
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/stats/pallets?${params.toString()}`;
      const response = await axios.get(apiUrl);
      setPallets(response.data.data);
    } catch (err) {
      setError('Failed to load pallet data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [partyId, factoryId, fromDate, toDate]); // Dependency array includes the new date props

  useEffect(() => {
    fetchPalletStats();
  }, [fetchPalletStats]);

  const getMostUsedPallet = () => {
    if (pallets.length === 0) return 'N/A';
    const mostUsed = pallets.reduce((max, p) => p.totalUsed > max.totalUsed ? p : max, pallets[0]);
    return `${mostUsed.size} (${mostUsed.totalUsed} used)`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Pallet Usage Report</h2>
        <p className="mt-1 text-sm text-gray-500">
          Showing data from <span className="font-semibold">{fromDate}</span> to <span className="font-semibold">{toDate}</span>.
        </p>
      </div>
      
      <div className="p-4 bg-indigo-50 text-sm border-b">
        <strong>Insight:</strong> Most frequently used pallet in this period is <span className="font-bold text-indigo-700">{getMostUsedPallet()}</span>.
      </div>

      <div className="overflow-x-auto">
        {loading && <div className="p-6 text-center text-gray-500">Loading pallet details...</div>}
        {error && <div className="p-6 text-center text-red-500">{error}</div>}
        {!loading && !error && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pallet Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Out (Orders)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Used (Bills)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remains</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pallets.length > 0 ? (
                pallets.map((pallet) => (
                  <tr key={pallet.size} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{pallet.size}</td>
                    <td className="px-6 py-4 text-sm text-green-600 font-semibold">+{pallet.totalOut}</td>
                    <td className="px-6 py-4 text-sm text-red-600 font-semibold">-{pallet.totalUsed}</td>
                    <td className="px-6 py-4 text-sm font-bold text-indigo-600">{pallet.remains}</td>
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
