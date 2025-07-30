import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderFilters = ({ onFilterChange }) => {
  // State for the filter input values
  const [filters, setFilters] = useState({
    transactionType: '',
    startDate: '',
    endDate: '',
    source: '', // This will hold the combined 'AssociateCompany:id' string
  });

  // State to hold the list of associate companies for the dropdown
  const [associateCompanies, setAssociateCompanies] = useState([]);

  // --- NEW: useEffect to fetch the list of associate companies ---
  useEffect(() => {
    const fetchAssociateCompanies = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/associate-companies`;
        const response = await axios.get(apiUrl);
        setAssociateCompanies(response.data);
      } catch (err) {
        console.error("Failed to fetch associate companies for filter.", err);
      }
    };
    fetchAssociateCompanies();
  }, []); // Runs once when the component mounts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    // Clean the filter object before passing it to the parent
    const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});
    onFilterChange(activeFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = { transactionType: '', startDate: '', endDate: '', source: '' };
    setFilters(clearedFilters);
    onFilterChange({}); // Pass an empty object to fetch all records
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Transaction Type Filter */}
        <select name="transactionType" value={filters.transactionType} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
          <option value="">All Types</option>
          <option value="order">Order</option>
          <option value="bill">Bill</option>
        </select>
        
        {/* --- NEW: Associate Company Filter --- */}
        <select name="source" value={filters.source} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
          <option value="">All Sources</option>
          {/* We don't need to show the current Production House here, only associates */}
          {associateCompanies.map(comp => (
            // The value is a string 'ModelName:ID' which the backend controller can parse
            <option key={comp._id} value={`AssociateCompany:${comp._id}`}>
              {comp.name}
            </option>
          ))}
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
