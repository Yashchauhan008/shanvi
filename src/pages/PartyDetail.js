import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaginatedTable from '../components/PaginatedTable';

// Dummy data for the pallet table, as this is not yet available from the backend
const dummyPalletData = [
    { id: 1, size: '200x200', totalOut: 50, totalUsed: 30, remains: 20 },
    { id: 2, size: '1200x600', totalOut: 80, totalUsed: 75, remains: 5 },
];

const PartyDetail = () => {
  const { id } = useParams(); // Get the party ID from the URL
  const navigate = useNavigate();

  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Define columns for the pallet table (this part is still using dummy data) ---
  const palletTableColumns = [
    { Header: 'Pallet Size', accessor: 'size' },
    { Header: 'Total Out', accessor: 'totalOut' },
    { Header: 'Total Used', accessor: 'totalUsed' },
    { 
      Header: 'Remains', 
      accessor: 'remains',
      Cell: (row) => <span className="font-semibold text-indigo-600">{row.remains}</span>
    },
  ];

  // --- Fetch the specific party's details from the API ---
  const fetchPartyDetails = useCallback(async () => {
    try {
      setLoading(true);
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/parties/${id}`;
      const response = await axios.get(apiUrl);
      // The backend populates 'factory_ids' with factory objects, which is perfect
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

  if (loading) {
    return <div className="container mx-auto p-8 text-center">Loading party details...</div>;
  }

  if (error || !party) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">{error || 'Party Not Found'}</h1>
        <Link to="/parties" className="mt-6 inline-block text-indigo-600 hover:text-indigo-800 font-semibold">
          &larr; Back to all parties
        </Link>
      </div>
    );
  }

  // The associated factories are now inside party.factory_ids
  const partyFactories = party.factory_ids || [];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <Link to="/parties" className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold">
          &larr; Back to Parties
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mt-2">{party.name}</h1>
      </div>

      <div className="flex flex-col gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800">Associated Factories</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {partyFactories.length > 0 ? (
              partyFactories.map(factory => (
                <button
                  key={factory._id} // Use backend's _id
                  onClick={() => navigate(`/factory/${factory._id}`)}
                  className="px-4 py-2 text-sm font-medium text-teal-800 bg-teal-100 rounded-full hover:bg-teal-200"
                >
                  {factory.name}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No factories found for this party.</p>
            )}
          </div>
        </div>

        {/* --- This table still uses dummy data but could be connected to an API later --- */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Pallet Details</h2>
            <p className="mt-1 text-sm text-gray-500">Pallet usage summary for this party.</p>
          </div>
          <PaginatedTable 
            columns={palletTableColumns} 
            data={dummyPalletData}
            itemsPerPage={4}
          />
        </div>
      </div>
    </div>
  );
};

export default PartyDetail;
