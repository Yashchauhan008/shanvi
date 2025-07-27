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

// This data would ideally be fetched specifically for this factory
const dummyPalletData = [
    { id: 1, size: '200x200', totalOut: 25, totalUsed: 15, remains: 10 },
    { id: 2, size: '1200x600', totalOut: 40, totalUsed: 38, remains: 2 },
    { id: 3, size: '800x800', totalOut: 60, totalUsed: 50, remains: 10 },
];

const FactoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const factory = allFactories.find(f => f.id === id);
  const parentParty = factory ? allParties.find(p => p.id === factory.partyId) : null;

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
      {/* Header Section */}
      <div className="mb-8">
        <Link to="/factories" className="text-sm text-teal-600 hover:text-teal-800 font-semibold">
          &larr; Back to Factories
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mt-2">{factory.name}</h1>
        <p className="text-lg text-gray-500">{factory.location}</p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Card 1: Parent Party as a Button */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800">Parent Party</h2>
          <div className="mt-4">
            {parentParty ? (
              <button
                onClick={() => navigate(`/party/${parentParty.id}`)}
                className="px-4 py-2 text-sm font-medium text-indigo-800 bg-indigo-100 rounded-full hover:bg-indigo-200 hover:shadow-md transition-all duration-200"
              >
                {parentParty.name}
              </button>
            ) : (
              <p className="text-gray-500">No parent party assigned.</p>
            )}
          </div>
        </div>

        {/* Card 2: Pallet Details (Added Here) */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Pallet Details</h2>
            <p className="mt-1 text-sm text-gray-500">Pallet usage summary for this factory.</p>
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
                  <tr key={pallet.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pallet.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pallet.totalOut}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pallet.totalUsed}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600">{pallet.remains}</td>
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

export default FactoryDetail;
