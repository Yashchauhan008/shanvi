import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Helper functions to get the start and end of the current month
const getMonthStartEnd = () => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
  return { startDate, endDate };
};

const PalletTable = () => {
  const [pallets, setPallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filter dropdowns
  const [parties, setParties] = useState([]);
  const [factories, setFactories] = useState([]);
  const [associateCompanies, setAssociateCompanies] = useState([]);

  // State to hold the current filter values
  const [filters, setFilters] = useState({
    party_id: '',
    factory_id: '',
    associate_company_id: '',
    fromDate: getMonthStartEnd().startDate,
    toDate: getMonthStartEnd().endDate,
  });

  // --- 1. Fetch data for the filter dropdowns ---
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [partiesRes, factoriesRes, associateCompaniesRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/parties/list`),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/factories`),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/associate-companies`),
        ]);
        setParties(partiesRes.data);
        setFactories(factoriesRes.data);
        setAssociateCompanies(associateCompaniesRes.data);
      } catch (err) {
        console.error("Failed to load filter data", err);
      }
    };
    fetchFilterData();
  }, []);

  // --- 2. Main function to fetch pallet statistics based on filters ---
  const fetchPalletStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      // Append only active filters to the request
      for (const key in filters) {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      }
      
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/stats/pallets?${params.toString()}`;
      const response = await axios.get(apiUrl);
      setPallets(response.data.data);
    } catch (err) {
      setError('Failed to load pallet data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // --- 3. useEffect to trigger the fetch when the component mounts ---
  useEffect(() => {
    fetchPalletStats();
  }, []); // Run only once on initial load with default (current month) filters

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    fetchPalletStats(); // Manually trigger a re-fetch with the current filter state
  };

  // --- 4. Optional: Calculate an advanced outcome ---
  const getMostUsedPallet = () => {
    if (pallets.length === 0) return 'N/A';
    const mostUsed = pallets.reduce((max, p) => p.totalUsed > max.totalUsed ? p : max, pallets[0]);
    return `${mostUsed.size} (${mostUsed.totalUsed} used)`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Pallet Usage Report</h2>
        <p className="mt-1 text-sm text-gray-500">Dynamic summary of pallet movements.</p>
      </div>

      {/* --- Filter Section --- */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <input type="date" name="fromDate" value={filters.fromDate} onChange={handleFilterChange} className="w-full px-3 py-2 border rounded-md" />
          <input type="date" name="toDate" value={filters.toDate} onChange={handleFilterChange} className="w-full px-3 py-2 border rounded-md" />
          <select name="party_id" value={filters.party_id} onChange={handleFilterChange} className="w-full px-3 py-2 border rounded-md">
            <option value="">All Parties</option>
            {parties.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
          <select name="associate_company_id" value={filters.associate_company_id} onChange={handleFilterChange} className="w-full px-3 py-2 border rounded-md">
            <option value="">All Associates</option>
            {associateCompanies.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <button onClick={handleApplyFilters} className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Apply Filters</button>
        </div>
      </div>

      {/* --- Optional Insights Section --- */}
      <div className="p-4 bg-indigo-50 text-sm">
        <strong>Insight:</strong> Most frequently used pallet in this period is <span className="font-bold text-indigo-700">{getMostUsedPallet()}</span>.
      </div>

      {/* --- Data Table --- */}
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
