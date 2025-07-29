import React, { useState } from 'react';

const OrderFilters = ({ onFilterChange }) => {
  // State now only includes the filters that are actually present in the UI.
  const [filters, setFilters] = useState({
    transactionType: '',
    startDate: '',
    endDate: '',
  });

  // This component no longer needs to fetch any data, so the useEffect is gone.

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    // Pass a clean object with only the active filters to the parent.
    const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});
    onFilterChange(activeFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = { transactionType: '', startDate: '', endDate: '' };
    setFilters(clearedFilters);
    onFilterChange({}); // Pass empty object to fetch all records.
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm mb-6">
      {/* The grid now has fewer columns because the unnecessary dropdowns are removed. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Transaction Type Filter */}
        <select name="transactionType" value={filters.transactionType} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
          <option value="">All Types</option>
          <option value="order">Order</option>
          <option value="bill">Bill</option>
        </select>
        
        {/* Date Filters */}
        <input type="date" name="startDate" value={filters.startDate} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        <input type="date" name="endDate" value={filters.endDate} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mt-4 flex justify-end gap-3">
        <button onClick={handleClearFilters} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Clear</button>
        <button onClick={handleApplyFilters} className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Apply Filters</button>
      </div>
    </div>
  );
};

export default OrderFilters;
