import React from 'react';
import { useParams, Link } from 'react-router-dom';

const FactoryDetail = () => {
  // Get the 'id' from the URL, e.g., /factory/f1 -> id = 'f1'
  const { id } = useParams();

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800">Factory Detail Page</h1>
        <p className="mt-4 text-lg text-gray-600">
          You are viewing the details for Factory with ID: <strong className="text-teal-600">{id}</strong>
        </p>
        <p className="mt-2 text-gray-500">
          (Here you would display all the detailed information fetched for this factory).
        </p>
        <Link to="/factories" className="mt-6 inline-block text-teal-600 hover:text-teal-800 font-semibold">
          &larr; Back to all factories
        </Link>
      </div>
    </div>
  );
};

export default FactoryDetail;
