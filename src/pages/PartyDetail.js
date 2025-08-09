// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import PalletTable from '../components/PalletTable';
// import TransactionHistory from '../components/TransactionHistory';

// // Helper to get current month's start/end dates
// const getMonthStartEnd = () => {
//   const now = new Date();
//   const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
//   const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
//   return { startDate, endDate };
// };

// const PartyDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [party, setParty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // State for the shared date filters now lives in the parent
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
//         {/* ✅ Add dark mode classes */}
//         <Link to="/parties" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 font-semibold">&larr; Back to Parties</Link>
//         <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mt-2">{party.name}</h1>
//       </div>


//       <div className="flex flex-col gap-8">
//         {/* ✅ Add dark mode classes */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//           <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Associated Factories</h2>
//           <div className="mt-4 flex flex-wrap gap-3">
//             {partyFactories.length > 0 ? (
//               partyFactories.map(factory => (
//                 <button key={factory._id} onClick={() => navigate(`/factory/${factory._id}`)} className="px-4 py-2 text-sm font-medium text-teal-800 dark:text-teal-200 bg-teal-100 dark:bg-teal-900/50 rounded-full hover:bg-teal-200 dark:hover:bg-teal-900">
//                   {factory.name}
//                 </button>
//               ))
//             ) : (
//               <p className="text-gray-500 dark:text-gray-400">No factories found for this party.</p>
//             )}
//           </div>
//         </div>

//         {/* --- Shared Filter Bar --- */}
//         {/* ✅ Add dark mode classes */}
//         <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">From Date</label>
//               <input type="date" name="fromDate" value={dateFilters.fromDate} onChange={handleDateChange} className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">To Date</label>
//               <input type="date" name="toDate" value={dateFilters.toDate} onChange={handleDateChange} className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
//             </div>
//           </div>
//         </div>
        
//         {/* Pass the shared dates down to both components */}
//         <PalletTable partyId={id} fromDate={dateFilters.fromDate} toDate={dateFilters.toDate} />
//         <TransactionHistory partyId={id} fromDate={dateFilters.fromDate} toDate={dateFilters.toDate} />
//       </div>
//     </div>
//   );
// };

// export default PartyDetail;
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PalletTable from '../components/PalletTable';
import TransactionHistory from '../components/TransactionHistory';
// ✅ 1. Import the reusable DateRangeFilter component
import DateRangeFilter from '../components/DateRangeFilter';

// Helper to get current month's start/end dates
const getMonthStartEnd = () => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
  return { startDate, endDate };
};

const PartyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the shared date filters now lives in the parent
  const [dateFilters, setDateFilters] = useState({
    fromDate: getMonthStartEnd().startDate,
    toDate: getMonthStartEnd().endDate,
  });

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

  // ✅ 2. The handler function is now simplified
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateFilters(prev => ({ ...prev, [name]: value }));
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
                <button key={factory._id} onClick={() => navigate(`/factory/${factory._id}`)} className="px-4 py-2 text-sm font-medium text-teal-800 dark:text-teal-200 bg-teal-100 dark:bg-teal-900/50 rounded-full hover:bg-teal-200 dark:hover:bg-teal-900">
                  {factory.name}
                </button>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No factories found for this party.</p>
            )}
          </div>
        </div>

        {/* ✅ 3. Use the reusable DateRangeFilter component */}
        <DateRangeFilter 
          fromDate={dateFilters.fromDate}
          toDate={dateFilters.toDate}
          onDateChange={handleDateChange}
        />
        
        {/* Pass the shared dates down to both components */}
        <PalletTable partyId={id} fromDate={dateFilters.fromDate} toDate={dateFilters.toDate} />
        <TransactionHistory partyId={id} fromDate={dateFilters.fromDate} toDate={dateFilters.toDate} />
      </div>
    </div>
  );
};

export default PartyDetail;
