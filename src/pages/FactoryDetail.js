
// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
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

// const FactoryDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   // ✅ --- THIS IS THE FIX (Part 2) ---
//   // useLocation hook gives us access to the URL's query parameters.
//   const location = useLocation();
//   // ✅ --- END OF FIX (Part 2) ---

//   const [factory, setFactory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ --- THIS IS THE FIX (Part 3) ---
//   // The initial state of the date filters is now determined by the URL.
//   const [dateFilters, setDateFilters] = useState(() => {
//     const params = new URLSearchParams(location.search);
//     const fromDate = params.get('fromDate');
//     const toDate = params.get('toDate');
    
//     // If dates are present in the URL, use them. Otherwise, use the default.
//     if (fromDate && toDate) {
//       return { fromDate, toDate };
//     }
//     return {
//       fromDate: getMonthStartEnd().startDate,
//       toDate: getMonthStartEnd().endDate,
//     };
//   });
//   // ✅ --- END OF FIX (Part 3) ---

//   const fetchFactoryDetails = useCallback(async () => {
//     try {
//       setLoading(true);
//       const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/factories/${id}`;
//       const response = await axios.get(apiUrl);
//       setFactory(response.data);
//     } catch (err) {
//       setError('Failed to fetch factory details.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchFactoryDetails();
//   }, [fetchFactoryDetails]);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     setDateFilters(prev => ({ ...prev, [name]: value }));
//   };

//   if (loading) {
//     return <div className="container mx-auto p-8 text-center text-gray-500 dark:text-gray-400">Loading factory details...</div>;
//   }

//   if (error || !factory) {
//     return (
//       <div className="container mx-auto p-8 text-center">
//         <h1 className="text-2xl font-bold text-red-500">{error || 'Factory Not Found'}</h1>
//         <Link to="/factories" className="mt-6 inline-block text-teal-600 hover:text-teal-800 font-semibold">&larr; Back to all factories</Link>
//       </div>
//     );
//   }

//   const parentParty = factory.party_id;

//   return (
//     <div className="container mx-auto p-4 sm:p-6 lg:p-8">
//       <div className="mb-8">
//         <Link to="/factories" className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-800 font-semibold">&larr; Back to Factories</Link>
//         <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mt-2">{factory.name}</h1>
//       </div>

//       <div className="flex flex-col gap-8">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//           <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Parent Party</h2>
//           <div className="mt-4">
//             {parentParty ? (
//               <button onClick={() => navigate(`/party/${parentParty._id}`)} className="px-4 py-2 text-sm font-medium text-indigo-800 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-900/50 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-900">
//                 {parentParty.name}
//               </button>
//             ) : (
//               <p className="text-gray-500 dark:text-gray-400">No parent party assigned.</p>
//             )}
//           </div>
//         </div>

//         <DateRangeFilter 
//           fromDate={dateFilters.fromDate}
//           toDate={dateFilters.toDate}
//           onDateChange={handleDateChange}
//         />
        
//         <PalletTable factoryId={id} fromDate={dateFilters.fromDate} toDate={dateFilters.toDate} />
//         <TransactionHistory factoryId={id} fromDate={dateFilters.fromDate} toDate={dateFilters.toDate} />
//       </div>
//     </div>
//   );
// };

// export default FactoryDetail;
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

const FactoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [factory, setFactory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dateFilters, setDateFilters] = useState(() => {
    const params = new URLSearchParams(location.search);
    const fromDate = params.get('fromDate');
    const toDate = params.get('toDate');
    
    if (fromDate && toDate) {
      return { fromDate, toDate };
    }
    return {
      fromDate: getMonthStartEnd().startDate,
      toDate: getMonthStartEnd().endDate,
    };
  });

  const fetchFactoryDetails = useCallback(async () => {
    try {
      setLoading(true);
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/factories/${id}`;
      const response = await axios.get(apiUrl);
      setFactory(response.data);
    } catch (err) {
      setError('Failed to fetch factory details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchFactoryDetails();
  }, [fetchFactoryDetails]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateFilters(prev => ({ ...prev, [name]: value }));
  };

  // ✅ --- THIS IS THE FIX ---
  // This function now navigates to the party detail page, passing the current
  // date filters as URL search parameters.
  const handlePartyClick = (partyId) => {
    navigate(`/party/${partyId}?fromDate=${dateFilters.fromDate}&toDate=${dateFilters.toDate}`);
  };
  // ✅ --- END OF FIX ---

  if (loading) {
    return <div className="container mx-auto p-8 text-center text-gray-500 dark:text-gray-400">Loading factory details...</div>;
  }

  if (error || !factory) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">{error || 'Factory Not Found'}</h1>
        <Link to="/factories" className="mt-6 inline-block text-teal-600 hover:text-teal-800 font-semibold">&larr; Back to all factories</Link>
      </div>
    );
  }

  const parentParty = factory.party_id;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <Link to="/factories" className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-800 font-semibold">&larr; Back to Factories</Link>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mt-2">{factory.name}</h1>
      </div>

      <div className="flex flex-col gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Parent Party</h2>
          <div className="mt-4">
            {parentParty ? (
              // The onClick handler now calls our new navigation function.
              <button onClick={() => handlePartyClick(parentParty._id)} className="px-4 py-2 text-sm font-medium text-indigo-800 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-900/50 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-900">
                {parentParty.name}
              </button>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No parent party assigned.</p>
            )}
          </div>
        </div>

        <DateRangeFilter 
          fromDate={dateFilters.fromDate}
          toDate={dateFilters.toDate}
          onDateChange={handleDateChange}
        />
        
        <PalletTable factoryId={id} fromDate={dateFilters.fromDate} toDate={dateFilters.toDate} />
        <TransactionHistory factoryId={id} fromDate={dateFilters.fromDate} toDate={dateFilters.toDate} />
      </div>
    </div>
  );
};

export default FactoryDetail;
