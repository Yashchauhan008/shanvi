import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PaginatedTable from '../components/PaginatedTable'; // <-- Import the new component

// --- DUMMY DATA (Unchanged) ---
const allParties = [
  { id: 'p1', name: 'Alpha Traders' },
  { id: 'p2', name: 'Beta Logistics' },
  { id: 'p3', name: 'Gamma Supplies' },
];
const allFactories = [
  { id: 'f1', name: 'Alpha Steel', partyId: 'p1', location: 'North Industrial Zone' },
  { id: 'f2', name: 'Alpha Packaging', partyId: 'p1', location: 'East Logistics Park' },
  { id: 'f3', name: 'Beta Warehouse', partyId: 'p2', location: 'Central District' },
  { id: 'f4', name: 'Gamma Plastics', partyId: 'p3', location: 'South Manufacturing Hub' },
  { id: 'f5', name: 'Gamma Distribution', partyId: 'p3', location: 'Westside Complex' },
];
const dummyPalletData = [
    { id: 1, size: '200x200', totalOut: 50, totalUsed: 30, remains: 20 },
    { id: 2, size: '1200x600', totalOut: 80, totalUsed: 75, remains: 5 },
    { id: 3, size: '800x800', totalOut: 120, totalUsed: 100, remains: 20 },
    { id: 4, size: '1000x1000', totalOut: 70, totalUsed: 50, remains: 20 },
    { id: 5, size: '1100x900', totalOut: 95, totalUsed: 90, remains: 5 },
    { id: 6, size: '200x200', totalOut: 10, totalUsed: 8, remains: 2 },
];

const PartyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const party = allParties.find(p => p.id === id);
  const partyFactories = allFactories.filter(f => f.partyId === id);

  // --- Define columns for the pallet table ---
  const palletTableColumns = [
    { Header: 'Pallet Size', accessor: 'size' },
    { Header: 'Total Out', accessor: 'totalOut' },
    { Header: 'Total Used', accessor: 'totalUsed' },
    { 
      Header: 'Remains', 
      accessor: 'remains',
      // Example of a custom cell renderer for styling
      Cell: (row) => <span className="font-semibold text-indigo-600">{row.remains}</span>
    },
  ];

  if (!party) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Party Not Found</h1>
        <Link to="/parties" className="mt-6 inline-block text-indigo-600 hover:text-indigo-800 font-semibold">
          &larr; Back to all parties
        </Link>
      </div>
    );
  }

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
                  key={factory.id}
                  onClick={() => navigate(`/factory/${factory.id}`)}
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

        {/* --- Use the PaginatedTable component --- */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Pallet Details</h2>
            <p className="mt-1 text-sm text-gray-500">Pallet usage summary for this party.</p>
          </div>
          <PaginatedTable 
            columns={palletTableColumns} 
            data={dummyPalletData}
            itemsPerPage={4} // You can control how many items per page
          />
        </div>
      </div>
    </div>
  );
};

export default PartyDetail;
