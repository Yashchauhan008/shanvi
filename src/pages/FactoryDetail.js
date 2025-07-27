import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PaginatedTable from '../components/PaginatedTable'; // <-- Import the new component

// --- DUMMY DATA (Unchanged) ---
const allParties = [
  { id: 'p1', name: 'Alpha Traders' },
  { id: 'p2', name: 'Beta Logistics' },
];
const allFactories = [
  { id: 'f1', name: 'Alpha Steel', partyId: 'p1', location: 'North Industrial Zone' },
  { id: 'f2', name: 'Alpha Packaging', partyId: 'p1', location: 'East Logistics Park' },
];
const dummyPalletData = [
    { id: 1, size: '200x200', totalOut: 25, totalUsed: 15, remains: 10 },
    { id: 2, size: '1200x600', totalOut: 40, totalUsed: 38, remains: 2 },
    { id: 3, size: '800x800', totalOut: 60, totalUsed: 50, remains: 10 },
    { id: 4, size: '1000x1000', totalOut: 30, totalUsed: 20, remains: 10 },
    { id: 5, size: '1100x900', totalOut: 50, totalUsed: 45, remains: 5 },
];

const FactoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const factory = allFactories.find(f => f.id === id);
  const parentParty = factory ? allParties.find(p => p.id === factory.partyId) : null;

  // --- Define columns for the pallet table ---
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

  if (!factory) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Factory Not Found</h1>
        <Link to="/factories" className="mt-6 inline-block text-teal-600 hover:text-teal-800 font-semibold">
          &larr; Back to all factories
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <Link to="/factories" className="text-sm text-teal-600 hover:text-teal-800 font-semibold">
          &larr; Back to Factories
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mt-2">{factory.name}</h1>
        <p className="text-lg text-gray-500">{factory.location}</p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800">Parent Party</h2>
          <div className="mt-4">
            {parentParty ? (
              <button
                onClick={() => navigate(`/party/${parentParty.id}`)}
                className="px-4 py-2 text-sm font-medium text-indigo-800 bg-indigo-100 rounded-full hover:bg-indigo-200"
              >
                {parentParty.name}
              </button>
            ) : (
              <p className="text-gray-500">No parent party assigned.</p>
            )}
          </div>
        </div>

        {/* --- Use the PaginatedTable component --- */}
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
