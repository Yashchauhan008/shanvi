import React from 'react';
import { Link } from 'react-router-dom';

// --- DUMMY DATA ---
const dummyParties = [
  { id: 'p1', name: 'Alpha Traders', factories: ['Alpha Steel', 'Alpha Packaging'] },
  { id: 'p2', name: 'Beta Logistics', factories: ['Beta Warehouse'] },
  { id: 'p3', name: 'Gamma Supplies', factories: ['Gamma Plastics', 'Gamma Distribution'] },
  { id: 'p4', name: 'Delta Corp', factories: ['Delta Manufacturing'] },
];

const Parties = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Parties</h1>
        <p className="mt-1 text-md text-gray-500">Select a party to view details.</p>
      </div>

      {/* Grid of Party Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dummyParties.map((party) => (
          <Link to={`/party/${party.id}`} key={party.id} className="block">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 h-full">
              <h2 className="text-xl font-bold text-indigo-600">{party.name}</h2>
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-500">Associated Factories:</h3>
                <ul className="mt-2 list-disc list-inside text-gray-600 text-sm">
                  {party.factories.map((factory, index) => (
                    <li key={index}>{factory}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Parties;
