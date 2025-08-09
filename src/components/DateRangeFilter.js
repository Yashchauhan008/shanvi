import React from 'react';

const DateRangeFilter = ({ fromDate, toDate, onDateChange }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            From Date
          </label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            value={fromDate}
            onChange={onDateChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            To Date
          </label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            value={toDate}
            onChange={onDateChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;
