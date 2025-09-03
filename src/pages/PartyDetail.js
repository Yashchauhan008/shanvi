
// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import PalletTable from '../components/PalletTable';
// import TransactionHistory from '../components/TransactionHistory';
// import DateRangeFilter from '../components/DateRangeFilter';

// // ✅ --- THIS IS THE FIX (Part 1) ---
// // The helper function is updated to set the default start date.
// const getMonthStartEnd = () => {
//   const now = new Date();
//   const year = now.getFullYear();
//   const month = now.getMonth();
//   const startDate = '2025-01-01'; // Set the new default start date
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
//     startDate: startDate,
//     endDate: formatDate(endDate),
//   };
// };
// // ✅ --- END OF FIX (Part 1) ---

// const PartyDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [party, setParty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [dateFilters, setDateFilters] = useState({
//     fromDate: getMonthStartEnd().startDate,
//     toDate: getMonthStartEnd().endDate,
//   });

//   const fetchPartyDetails = useCallback(async () => {
//     try {
//       setLoading(true);
//       const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/parties/${id}`;
//       const response = await axios.get(apiUrl);
//       setParty(response.data);
//     } catch (err) {
//       setError('Failed to fetch party details.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchPartyDetails();
//   }, [fetchPartyDetails]);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     setDateFilters(prev => ({ ...prev, [name]: value }));
//   };

//   // ✅ --- THIS IS THE FIX (Part 2) ---
//   // This function now passes the current date filters as URL search parameters.
//   const handleFactoryClick = (factoryId) => {
//     navigate(`/factory/${factoryId}?fromDate=${dateFilters.fromDate}&toDate=${dateFilters.toDate}`);
//   };
//   // ✅ --- END OF FIX (Part 2) ---

//   if (loading) {
//     return <div className="container mx-auto p-8 text-center text-gray-500 dark:text-gray-400">Loading party details...</div>;
//   }

//   if (error || !party) {
//     return (
//       <div className="container mx-auto p-8 text-center">
//         <h1 className="text-2xl font-bold text-red-500">{error || 'Party Not Found'}</h1>
//         <Link to="/parties" className="mt-6 inline-block text-indigo-600 hover:text-indigo-800 font-semibold">&larr; Back to all parties</Link>
//       </div>
//     );
//   }

//   const partyFactories = party.factory_ids || [];

//   return (
//     <div className="container mx-auto p-4 sm:p-6 lg:p-8">
//       <div className="mb-8">
//         <Link to="/parties" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 font-semibold">&larr; Back to Parties</Link>
//         <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mt-2">{party.name}</h1>
//       </div>

//       <div className="flex flex-col gap-8">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//           <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Associated Factories</h2>
//           <div className="mt-4 flex flex-wrap gap-3">
//             {partyFactories.length > 0 ? (
//               partyFactories.map(factory => (
//                 // ✅ --- THIS IS THE FIX (Part 3) ---
//                 // The onClick handler now calls our new navigation function.
//                 <button key={factory._id} onClick={() => handleFactoryClick(factory._id)} className="px-4 py-2 text-sm font-medium text-teal-800 dark:text-teal-200 bg-teal-100 dark:bg-teal-900/50 rounded-full hover:bg-teal-200 dark:hover:bg-teal-900">
//                   {factory.name}
//                 </button>
//                 // ✅ --- END OF FIX (Part 3) ---
//               ))
//             ) : (
//               <p className="text-gray-500 dark:text-gray-400">No factories found for this party.</p>
//             )}
//           </div>
//         </div>

//         <DateRangeFilter 
//           fromDate={dateFilters.fromDate}
//           toDate={dateFilters.toDate}
//           onDateChange={handleDateChange}
//         />
        
//         <PalletTable partyId={id} fromDate={dateFilters.fromDate} toDate={dateFilters.toDate} />
//         <TransactionHistory partyId={id} fromDate={dateFilters.fromDate} toDate={dateFilters.toDate} />
//       </div>
//     </div>
//   );
// };

// export default PartyDetail;
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import PalletTable from '../components/PalletTable';
import TransactionHistory from '../components/TransactionHistory';
import DateRangeFilter from '../components/DateRangeFilter';

const getMonthStartEnd = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const startDate = '2025-01-01';
  const endDate = new Date(year, month + 1, 0);
  
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

const PartyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // ✅ --- THIS IS THE FIX (Part 1) ---
  // Import and use the useLocation hook.
  const location = useLocation();
  // ✅ --- END OF FIX (Part 1) ---

  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ --- THIS IS THE FIX (Part 2) ---
  // The initial state of the date filters is now determined by the URL.
  const [dateFilters, setDateFilters] = useState(() => {
    const params = new URLSearchParams(location.search);
    const fromDate = params.get('fromDate');
    const toDate = params.get('toDate');
    
    // If dates are present in the URL, use them. Otherwise, use the default.
    if (fromDate && toDate) {
      return { fromDate, toDate };
    }
    return {
      fromDate: getMonthStartEnd().startDate,
      toDate: getMonthStartEnd().endDate,
    };
  });
  // ✅ --- END OF FIX (Part 2) ---

  const fetchPartyDetails = useCallback(async () => {
    try {
      setLoading(true);
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/parties/${id}`;
      const response = await axios.get(apiUrl);
      setParty(response.data);
    } catch (err) {
      setError('Failed to fetch party details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPartyDetails();
  }, [fetchPartyDetails]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFactoryClick = (factoryId) => {
    navigate(`/factory/${factoryId}?fromDate=${dateFilters.fromDate}&toDate=${dateFilters.toDate}`);
  };

  if (loading) {
    return <div className="container mx-auto p-8 text-center text-gray-500 dark:text-gray-400">Loading party details...</div>;
  }

  if (error || !party) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">{error || 'Party Not Found'}</h1>
        <Link to="/parties" className="mt-6 inline-block text-indigo-600 hover:text-indigo-800 font-semibold">&larr; Back to all parties</Link>
      </div>
    );
  }

  const partyFactories = party.factory_ids || [];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <Link to="/parties" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 font-semibold">&larr; Back to Parties</Link>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mt-2">{party.name}</h1>
      </div>

      <div className="flex flex-col gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Associated Factories</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {partyFactories.length > 0 ? (
              partyFactories.map(factory => (
                <button key={factory._id} onClick={() => handleFactoryClick(factory._id)} className="px-4 py-2 text-sm font-medium text-teal-800 dark:text-teal-200 bg-teal-100 dark:bg-teal-900/50 rounded-full hover:bg-teal-200 dark:hover:bg-teal-900">
                  {factory.name}
                </button>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No factories found for this party.</p>
            )}
          </div>
        </div>

        <DateRangeFilter 
          fromDate={dateFilters.fromDate}
          toDate={dateFilters.toDate}
          onDateChange={handleDateChange}
        />
        
        <PalletTable partyId={id} fromDate={dateFilters.fromDate} toDate={dateFilters.toDate} />
        <TransactionHistory partyId={id} fromDate={dateFilters.fromDate} toDate={dateFilters.toDate} />
      </div>
    </div>
  );
};

export default PartyDetail;
