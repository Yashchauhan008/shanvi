import React, { useState } from 'react';
import axios from 'axios';

// This component receives two props from Orders.js:
// - onSearchComplete: A function to call when a search result is found.
// - onSearchError: A function to call when the search fails.
const OrderSearch = ({ onSearchComplete, onSearchError }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter an Order or Bill ID to search.");
      return;
    }
    setIsSearching(true);
    try {
      // It calls the dedicated search endpoint
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orders/search/${searchTerm.trim()}`;
      const response = await axios.get(apiUrl);
      // It passes the found data back up to the Orders page
      onSearchComplete(response.data.data);
    } catch (err) {
      // It passes the error message back up to the Orders page
      onSearchError(err.response?.data?.message || "Search failed.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <label htmlFor="search-order" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Search by Order/Bill ID
      </label>
      <div className="mt-1 flex gap-2">
        <input
          type="text"
          id="search-order"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="e.g., ORD-0012 or BILL-0005"
          className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  );
};

export default OrderSearch;
