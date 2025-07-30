import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaginatedTable from '../components/PaginatedTable';

// Dummy data for the pallet table, as this is not yet available from the backend
const dummyPalletData = [
    { id: 1, size: '200x200', totalOut: 25, totalUsed: 15, remains: 10 },
    { id: 2, size: '1200x600', totalOut: 40, totalUsed: 38, remains: 2 },
];

const FactoryDetail = () => {
  const { id } = useParams(); // Get the factory ID from the URL
  const navigate = useNavigate();

  const [factory, setFactory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Define columns for the pallet table (still using dummy data) ---
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

  // --- Fetch the specific factory's details from the API ---
  const fetchFactoryDetails = useCallback(async () => {
    try {
      setLoading(true);
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/factories/${id}`;
      const response = await axios.get(apiUrl);
      // The backend populates 'party_id' with the party object
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

  if (loading) {
    return <div className="container mx-auto p-8 text-center">Loading factory details...</div>;
  }

  if (error || !factory) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">{error || 'Factory Not Found'}</h1>
        <Link to="/factories" className="mt-6 inline-block text-teal-600 hover:text-teal-800 font-semibold">
          &larr; Back to all factories
        </Link>
      </div>
    );
  }

  // The parent party object is now at factory.party_id
  const parentParty = factory.party_id;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <Link to="/factories" className="text-sm text-teal-600 hover:text-teal-800 font-semibold">
          &larr; Back to Factories
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mt-2">{factory.name}</h1>
        {/* You can add a location field to your factory schema if you want to display it here */}
        {/* <p className="text-lg text-gray-500">{factory.location}</p> */}
      </div>

      <div className="flex flex-col gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800">Parent Party</h2>
          <div className="mt-4">
            {parentParty ? (
              <button
                onClick={() => navigate(`/party/${parentParty._id}`)}
                className="px-4 py-2 text-sm font-medium text-indigo-800 bg-indigo-100 rounded-full hover:bg-indigo-200"
              >
                {parentParty.name}
              </button>
            ) : (
              <p className="text-gray-500">No parent party assigned.</p>
            )}
          </div>
        </div>

        {/* --- This table still uses dummy data --- */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Pallet Details</h2>
            <p className="mt-1 text-sm text-gray-500">Pallet usage summary for this factory.</p>
          </div>
          <PaginatedTable 
            columns={palletTableColumns} 
            data={dummyPalletData}
            itemsPerPage={3}
          />
        </div>
      </div>
    </div>
  );
};

export default FactoryDetail;
