
// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import PalletTable from '../components/PalletTable';
// import TransactionHistory from '../components/TransactionHistory';
// import DateRangeFilter from '../components/DateRangeFilter';

// // Helper function to get the current month's date range
// const getMonthStartEnd = () => {
//   const now = new Date();
//   const year = now.getFullYear();
//   const month = now.getMonth();
//   const startDate = new Date(year, month, 1);
//   const endDate = new Date(year, month + 1, 0);
//   const formatDate = (date) => {
//     const d = new Date(date);
//     let month = '' + (d.getMonth() + 1);
//     let day = '' + d.getDate();
//     const year = d.getFullYear();
//     if (month.length < 2) month = '0' + month;
//     if (day.length < 2) day = '0' + day;
//     return [year, month, day].join('-');
//   };
//   return {
//     startDate: formatDate(startDate),
//     endDate: formatDate(endDate),
//   };
// };

// const AssociateCompanyDetail = () => {
//   const { id } = useParams(); // The company's ID from the URL
//   const [company, setCompany] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // State for the date filters
//   const [dateFilters, setDateFilters] = useState({
//     fromDate: getMonthStartEnd().startDate,
//     toDate: getMonthStartEnd().endDate,
//   });

//   // Fetches the company's name for the header
//   const fetchCompanyDetails = useCallback(async () => {
//     try {
//       setLoading(true);
//       const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/associate-companies/${id}`;
//       const response = await axios.get(apiUrl);
//       setCompany(response.data);
//     } catch (err) {
//       setError('Failed to fetch company details.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchCompanyDetails();
//   }, [fetchCompanyDetails]);

//   // Handles date changes from the filter component
//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     setDateFilters(prev => ({ ...prev, [name]: value }));
//   };

//   if (loading) {
//     return <div className="container mx-auto p-8 text-center text-gray-500 dark:text-gray-400">Loading company details...</div>;
//   }

//   if (error || !company) {
//     return (
//       <div className="container mx-auto p-8 text-center">
//         <h1 className="text-2xl font-bold text-red-500">{error || 'Company Not Found'}</h1>
//         <Link to="/associate-companies" className="mt-6 inline-block text-purple-600 hover:text-purple-800 font-semibold">&larr; Back to all companies</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 sm:p-6 lg:p-8">
//       <div className="mb-8">
//         <Link to="/associate-companies" className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 font-semibold">&larr; Back to Companies</Link>
//         <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mt-2">{company.name}</h1>
//       </div>

//       <div className="flex flex-col gap-8">
//         <DateRangeFilter 
//           fromDate={dateFilters.fromDate}
//           toDate={dateFilters.toDate}
//           onDateChange={handleDateChange}
//         />

//         {/* 
//           ✅ --- THIS IS THE FIX ---
//           The `source` prop is now correctly passed to the child components.
//           The backend expects the format "ModelName:ID" to filter by the polymorphic source field.
//         */}
//         <PalletTable 
//           source={`AssociateCompany:${id}`} 
//           fromDate={dateFilters.fromDate} 
//           toDate={dateFilters.toDate} 
//         />
//         <TransactionHistory 
//           source={`AssociateCompany:${id}`} 
//           fromDate={dateFilters.fromDate} 
//           toDate={dateFilters.toDate} 
//         />
//         {/* ✅ --- END OF FIX --- */}
//       </div>
//     </div>
//   );
// };

// export default AssociateCompanyDetail;


import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PalletTable from '../components/PalletTable';
import TransactionHistory from '../components/TransactionHistory';
import DateRangeFilter from '../components/DateRangeFilter';

// This helper function now provides a "lifetime" date range by default.
const getLifetimeDateRange = () => {
  const now = new Date();
  const startDate = '2025-01-01'; // A fixed early start date
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the current month

  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  };

  return {
    startDate: startDate,
    endDate: formatDate(endDate),
  };
};

const AssociateCompanyDetail = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // The initial state now uses the new lifetime date range function
  const [dateFilters, setDateFilters] = useState({
    fromDate: getLifetimeDateRange().startDate,
    toDate: getLifetimeDateRange().endDate,
  });

  // ✅ --- THIS IS THE FIX ---
  // The `fetchCompanyDetails` function is wrapped in `useCallback`.
  // This ensures the function itself doesn't get recreated on every render,
  // preventing the infinite loop in the `useEffect` hook.
  const fetchCompanyDetails = useCallback(async () => {
    // We can remove setLoading(true) from here because the useEffect hook will handle it.
    try {
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/associate-companies/${id}`;
      const response = await axios.get(apiUrl);
      setCompany(response.data);
    } catch (err) {
      setError('Failed to fetch company details.');
      console.error(err);
    } finally {
      setLoading(false); // This will now be reached correctly.
    }
  }, [id]); // The function only depends on the `id` from the URL.
  // ✅ --- END OF FIX ---

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching.
    fetchCompanyDetails();
  }, [fetchCompanyDetails]); // This effect now correctly runs only when `fetchCompanyDetails` changes (i.e., when the `id` changes).

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateFilters(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div className="container mx-auto p-8 text-center text-gray-500 dark:text-gray-400">Loading company details...</div>;
  }

  if (error || !company) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">{error || 'Company Not Found'}</h1>
        <Link to="/associate-companies" className="mt-6 inline-block text-purple-600 hover:text-purple-800 font-semibold">&larr; Back to all companies</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <Link to="/associate-companies" className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 font-semibold">&larr; Back to Companies</Link>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mt-2">{company.name}</h1>
      </div>

      <div className="flex flex-col gap-8">
        <DateRangeFilter 
          fromDate={dateFilters.fromDate}
          toDate={dateFilters.toDate}
          onDateChange={handleDateChange}
        />
        <PalletTable 
          source={`AssociateCompany:${id}`} 
          fromDate={dateFilters.fromDate} 
          toDate={dateFilters.toDate} 
        />
        <TransactionHistory 
          source={`AssociateCompany:${id}`} 
          fromDate={dateFilters.fromDate} 
          toDate={dateFilters.toDate} 
        />
      </div>
    </div>
  );
};

export default AssociateCompanyDetail;
