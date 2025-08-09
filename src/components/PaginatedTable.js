// import React, { useState } from 'react';
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// const PaginatedTable = ({ columns, data, itemsPerPage = 5 }) => {
//   const [currentPage, setCurrentPage] = useState(1);

//   // --- Pagination Logic ---
//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentData = data.slice(startIndex, endIndex);

//   const goToNextPage = () => {
//     setCurrentPage((page) => Math.min(page + 1, totalPages));
//   };

//   const goToPreviousPage = () => {
//     setCurrentPage((page) => Math.max(page - 1, 1));
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             {columns.map((col) => (
//               <th
//                 key={col.accessor}
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 {col.Header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {currentData.length > 0 ? (
//             currentData.map((row, rowIndex) => (
//               <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-150">
//                 {columns.map((col) => (
//                   <td
//                     key={col.accessor}
//                     className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
//                   >
//                     {/* Use a render function if provided, otherwise access data directly */}
//                     {col.Cell ? col.Cell(row) : row[col.accessor]}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
//                 No data available.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* --- Pagination Controls --- */}
//       {totalPages > 1 && (
//         <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
//           <div className="text-sm text-gray-700">
//             Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={goToPreviousPage}
//               disabled={currentPage === 1}
//               className="p-1 rounded-md border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <ChevronLeftIcon className="h-5 w-5" />
//             </button>
//             <button
//               onClick={goToNextPage}
//               disabled={currentPage === totalPages}
//               className="p-1 rounded-md border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <ChevronRightIcon className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaginatedTable;
import React from 'react';

// This component is now "stateless". It simply renders the data it receives.
// The parent component is responsible for fetching the correct page of data.
const PaginatedTable = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      {/* ✅ Add dark mode classes to the table */}
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                scope="col"
                // ✅ Add dark mode classes to table headers
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        {/* ✅ Add dark mode classes to the table body */}
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              // ✅ Add dark mode classes to table rows
              <tr key={row._id || rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    // ✅ Add dark mode classes to table cells
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300"
                  >
                    {/* The Cell renderer function handles the actual data display */}
                    {col.Cell ? col.Cell(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaginatedTable;
