// import React, { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
// import Modal from '../components/Modal';
// import PartyForm from '../components/PartyForm';

// const Parties = () => {
//   const [parties, setParties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [partyToEdit, setPartyToEdit] = useState(null);

//   const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/parties`;

//   const fetchParties = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(apiUrl);
//       setParties(response.data);
//     } catch (err) {
//       setError('Failed to fetch parties.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [apiUrl]);

//   useEffect(() => {
//     fetchParties();
//   }, [fetchParties]);

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setPartyToEdit(null);
//   };

//   const handleAddParty = () => {
//     setPartyToEdit(null);
//     setIsModalOpen(true);
//   };

//   const handleEditParty = (party) => {
//     setPartyToEdit(party);
//     setIsModalOpen(true);
//   };

//   const handleSaveParty = async (partyData) => {
//     try {
//       if (partyToEdit) {
//         await axios.put(`${apiUrl}/${partyToEdit._id}`, partyData);
//       } else {
//         await axios.post(apiUrl, { name: partyData.name });
//       }
//       closeModal();
//       await fetchParties();
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || `Failed to save party.`;
//       alert(`Error: ${errorMessage}`);
//       console.error(err);
//     }
//   };

//   if (loading) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading parties...</div>;
//   if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

//   return (
//     <>
//       <div className="container mx-auto p-4 sm:p-6 lg:p-8">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Parties</h1>
//             <p className="mt-1 text-md text-gray-500 dark:text-gray-400">Manage your business parties.</p>
//           </div>
//           <button
//             onClick={handleAddParty}
//             className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
//           >
//             <PlusIcon className="h-5 w-5" />
//             Add Party
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {parties.map((party) => (
//             <div key={party._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col justify-between">
//               <Link to={`/party/${party._id}`} className="block">
//                 <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 hover:underline">{party.name}</h2>
//               </Link>
//               <div className="mt-4 flex justify-end">
//                 <button onClick={() => handleEditParty(party)} className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
//                   <PencilIcon className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <Modal isOpen={isModalOpen} onClose={closeModal} title={partyToEdit ? 'Edit Party' : 'Add New Party'}>
//         <PartyForm onSave={handleSaveParty} partyToEdit={partyToEdit} onClose={closeModal} />
//       </Modal>
//     </>
//   );
// };

// export default Parties;


import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
import Modal from '../components/Modal';
import PartyForm from '../components/PartyForm';

const Parties = () => {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partyToEdit, setPartyToEdit] = useState(null);
  // ✅ 1. Add state for the search term
  const [searchTerm, setSearchTerm] = useState('');

  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/parties`;

  const fetchParties = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setParties(response.data);
    } catch (err) {
      setError('Failed to fetch parties.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchParties();
  }, [fetchParties]);

  const closeModal = () => {
    setIsModalOpen(false);
    setPartyToEdit(null);
  };

  const handleAddParty = () => {
    setPartyToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditParty = (party) => {
    setPartyToEdit(party);
    setIsModalOpen(true);
  };

  const handleSaveParty = async (partyData) => {
    try {
      if (partyToEdit) {
        await axios.put(`${apiUrl}/${partyToEdit._id}`, partyData);
      } else {
        await axios.post(apiUrl, { name: partyData.name });
      }
      closeModal();
      await fetchParties();
    } catch (err) {
      const errorMessage = err.response?.data?.message || `Failed to save party.`;
      alert(`Error: ${errorMessage}`);
      console.error(err);
    }
  };

  // ✅ 2. Filter parties based on the search term before rendering
  const filteredParties = parties.filter(party =>
    party.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading parties...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Parties</h1>
            <p className="mt-1 text-md text-gray-500 dark:text-gray-400">Manage your business parties.</p>
          </div>
          <button
            onClick={handleAddParty}
            className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            <PlusIcon className="h-5 w-5" />
            Add Party
          </button>
        </div>

        {/* ✅ 3. Add the search input field */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for a party..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* ✅ 4. Map over the filteredParties array instead of the original parties array */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredParties.map((party) => (
            <div key={party._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col justify-between">
              <Link to={`/party/${party._id}`} className="block">
                <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 hover:underline">{party.name}</h2>
              </Link>
              <div className="mt-4 flex justify-end">
                <button onClick={() => handleEditParty(party)} className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={partyToEdit ? 'Edit Party' : 'Add New Party'}>
        <PartyForm onSave={handleSaveParty} partyToEdit={partyToEdit} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default Parties;
