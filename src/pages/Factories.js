import React from 'react';
import { Link } from 'react-router-dom';

// --- DUMMY DATA ---
const dummyFactories = [
  { id: 'f1', name: 'Alpha Steel', partyName: 'Alpha Traders' },
  { id: 'f2', name: 'Alpha Packaging', partyName: 'Alpha Traders' },
  { id: 'f3', name: 'Beta Warehouse', partyName: 'Beta Logistics' },
  { id: 'f4', name: 'Gamma Plastics', partyName: 'Gamma Supplies' },
  { id: 'f5', name: 'Gamma Distribution', partyName: 'Gamma Supplies' },
  { id: 'f6', name: 'Delta Manufacturing', partyName: 'Delta Corp' },
];

const Factories = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Factories</h1>
        <p className="mt-1 text-md text-gray-500">Select a factory to view details.</p>
      </div>

      {/* Grid of Factory Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dummyFactories.map((factory) => (
          <Link to={`/factory/${factory.id}`} key={factory.id} className="block">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 h-full">
              <h2 className="text-xl font-bold text-teal-600">{factory.name}</h2>
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-500">Owned by Party:</h3>
                <p className="mt-2 text-gray-600 text-sm">{factory.partyName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Factories;
