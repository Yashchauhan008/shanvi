import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PartyDetail = () => {
  // Get the 'id' from the URL, e.g., /party/p1 -> id = 'p1'
  const { id } = useParams();

  // In a real app, you would use this ID to fetch data from an API.
  // For now, we'll just display it.
  
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800">Party Detail Page</h1>
        <p className="mt-4 text-lg text-gray-600">
          You are viewing the details for Party with ID: <strong className="text-indigo-600">{id}</strong>
        </p>
        <p className="mt-2 text-gray-500">
          (Here you would display all the detailed information fetched for this party).
        </p>
        <Link to="/parties" className="mt-6 inline-block text-indigo-600 hover:text-indigo-800 font-semibold">
          &larr; Back to all parties
        </Link>
      </div>
    </div>
  );
};

export default PartyDetail;
