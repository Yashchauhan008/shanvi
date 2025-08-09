import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { exportToExcel } from '../services/excelGenerator'; // We reuse the same service

const ReportGenerator = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    party_id: '',
    factory_id: '',
    transactionType: '',
    source: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  
  // State for dropdown options
  const [parties, setParties] = useState([]);
  const [factories, setFactories] = useState([]);
  const [associateCompanies, setAssociateCompanies] = useState([]);

  // Fetch data for all dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const partiesRes = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/parties`);
        const factoriesRes = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/factories`);
        const associatesRes = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/associate-companies`);
        setParties(partiesRes.data);
        setFactories(factoriesRes.data);
        setAssociateCompanies(associatesRes.data);
      } catch (err) {
        console.error("Failed to load filter options:", err);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const activeFilters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''));
      const params = new URLSearchParams(activeFilters);
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/reports/orders?${params.toString()}`;
      const response = await axios.get(apiUrl);

      if (response.data.data && response.data.data.length > 0) {
        const today = new Date().toISOString().split('T')[0];
        exportToExcel(response.data.data, `Order_Report_${today}`);
      } else {
        alert("No data found for the selected filters.");
      }
    } catch (err) {
      alert("Failed to generate the report. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    // This component is a self-contained card
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">Export Order Report</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Select filters to download a detailed Excel report.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
          <input type="date" name="startDate" value={filters.startDate} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
          <input type="date" name="endDate" value={filters.endDate} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
        </div>
        {/* Transaction Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Transaction Type</label>
          <select name="transactionType" value={filters.transactionType} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">All</option>
            <option value="order">Order</option>
            <option value="bill">Bill</option>
          </select>
        </div>
        {/* Party Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Party</label>
          <select name="party_id" value={filters.party_id} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">All Parties</option>
            {parties.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
        </div>
        {/* Factory Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Factory</label>
          <select name="factory_id" value={filters.factory_id} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">All Factories</option>
            {factories.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
          </select>
        </div>
        {/* Associate Company Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Source Company</label>
          <select name="source" value={filters.source} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">All Sources</option>
            {associateCompanies.map(c => <option key={c._id} value={`AssociateCompany:${c._id}`}>{c.name}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button onClick={handleGenerateReport} disabled={isGenerating} className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400">
          {isGenerating ? 'Generating...' : 'Generate & Download Report'}
        </button>
      </div>
    </div>
  );
};

export default ReportGenerator;
