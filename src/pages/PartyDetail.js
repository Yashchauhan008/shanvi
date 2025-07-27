import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// --- DUMMY DATA (same as before) ---
const allParties = [
  { id: 'p1', name: 'Alpha Traders' },
  { id: 'p2', name: 'Beta Logistics' },
  { id: 'p3', name: 'Gamma Supplies' },
  { id: 'p4', name: 'Delta Corp' },
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
];

const PartyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to programmatically navigate

  const party = allParties.find(p => p.id === id);
  const partyFactories = allFactories.filter(f => f.partyId === id);

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
      {/* Header Section */}
      <div className="mb-8">
        <Link to="/parties" className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold">
          &larr; Back to Parties
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mt-2">{party.name}</h1>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Card 1: Associated Factories as Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800">Associated Factories</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {partyFactories.length > 0 ? (
              partyFactories.map(factory => (
                <button
                  key={factory.id}
                  onClick={() => navigate(`/factory/${factory.id}`)}
                  className="px-4 py-2 text-sm font-medium text-teal-800 bg-teal-100 rounded-full hover:bg-teal-200 hover:shadow-md transition-all duration-200"
                >
                  {factory.name}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No factories found for this party.</p>
            )}
          </div>
        </div>

        {/* Card 2: Pallet Details (Unchanged) */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Pallet Details</h2>
            <p className="mt-1 text-sm text-gray-500">Pallet usage summary for this party.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pallet Size</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Out</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Used</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remains</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dummyPalletData.map((pallet) => (
                  <tr key={pallet.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{pallet.size}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{pallet.totalOut}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{pallet.totalUsed}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-indigo-600">{pallet.remains}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PartyDetail;
