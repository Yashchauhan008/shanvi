// import React, { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
// import Modal from '../components/Modal';
// import AssociateCompanyForm from '../components/AssociateCompanyForm';
// import { useAuth } from '../context/AuthContext';

// const AssociateCompanies = () => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [companyToEdit, setCompanyToEdit] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const { isDeleteEnabled } = useAuth();

//   const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/associate-companies`;

//   const fetchCompanies = useCallback(async () => {
//     try {
//       const response = await axios.get(apiUrl);
//       setCompanies(response.data);
//     } catch (err) {
//       setError('Failed to fetch associate companies.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [apiUrl]);

//   useEffect(() => {
//     fetchCompanies();
//   }, [fetchCompanies]);

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCompanyToEdit(null);
//   };

//   const handleAdd = () => {
//     setCompanyToEdit(null);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (company) => {
//     setCompanyToEdit(company);
//     setIsModalOpen(true);
//   };

//   const handleSave = async (companyData) => {
//     try {
//       if (companyToEdit) {
//         await axios.put(`${apiUrl}/${companyToEdit._id}`, companyData);
//       } else {
//         await axios.post(apiUrl, companyData);
//       }
//       closeModal();
//       await fetchCompanies();
//     } catch (err) {
//       alert(`Error: ${err.response?.data?.message || 'Failed to save company.'}`);
//     }
//   };

//   const handleDelete = async (companyId) => {
//     if (window.confirm("Are you sure you want to delete this company? This cannot be undone.")) {
//       try {
//         await axios.delete(`${apiUrl}/${companyId}`);
//         alert("Company deleted successfully!");
//         fetchCompanies();
//       } catch (err) {
//         alert(`Error: ${err.response?.data?.message || 'Failed to delete company.'}`);
//       }
//     }
//   };

//   const filteredCompanies = companies.filter(company =>
//     company.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading Companies...</div>;
//   if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

//   return (
//     <>
//       <div className="container mx-auto p-4 sm:p-6 lg:p-8">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Associate Companies</h1>
//             <p className="mt-1 text-md text-gray-500 dark:text-gray-400">Manage your source companies and partners.</p>
//           </div>
//         </div>

//         <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//           <div className="relative w-full sm:max-w-sm">
//             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//               <svg aria-hidden="true" className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Search for a company..."
//               value={searchTerm}
//               onChange={(e ) => setSearchTerm(e.target.value)}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//             />
//           </div>
//           <button onClick={handleAdd} className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-900">
//             <PlusIcon className="h-5 w-5" />
//             <span>Add Company</span>
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredCompanies.map((company) => (
//             <div key={company._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col justify-between border border-gray-200 dark:border-gray-700">
//               <Link to={`/associate-company/${company._id}`} className="block">
//                 <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400 hover:underline">{company.name}</h2>
//               </Link>
//               {isDeleteEnabled && (
//                 <div className="mt-4 flex justify-end items-center space-x-3">
//                   <button onClick={() => handleEdit(company)} className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" title="Edit Company">
//                     <PencilIcon className="h-5 w-5" />
//                   </button>
//                   <button onClick={() => handleDelete(company._id)} className="text-gray-400 hover:text-red-600 dark:hover:text-red-400" title="Delete Company">
//                     <TrashIcon className="h-5 w-5" />
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       <Modal isOpen={isModalOpen} onClose={closeModal} title={companyToEdit ? 'Edit Company' : 'Add New Company'}>
//         <AssociateCompanyForm onSave={handleSave} companyToEdit={companyToEdit} onClose={closeModal} />
//       </Modal>
//     </>
//   );
// };

// export default AssociateCompanies;

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import Modal from '../components/Modal';
import AssociateCompanyForm from '../components/AssociateCompanyForm';
import { useAuth } from '../context/AuthContext';

const AssociateCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { isDeleteEnabled } = useAuth();

  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/associate-companies`;

  const fetchCompanies = useCallback(async () => {
    try {
      const response = await axios.get(apiUrl);
      setCompanies(response.data);
    } catch (err) {
      setError('Failed to fetch associate companies.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const closeModal = () => {
    setIsModalOpen(false);
    setCompanyToEdit(null);
  };

  const handleAdd = () => {
    setCompanyToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (company) => {
    setCompanyToEdit(company);
    setIsModalOpen(true);
  };

  const handleSave = async (companyData) => {
    try {
      if (companyToEdit) {
        await axios.put(`${apiUrl}/${companyToEdit._id}`, companyData);
      } else {
        await axios.post(apiUrl, companyData);
      }
      closeModal();
      await fetchCompanies();
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || 'Failed to save company.'}`);
    }
  };

  const handleDelete = async (companyId) => {
    if (window.confirm("Are you sure you want to delete this company? This cannot be undone.")) {
      try {
        await axios.delete(`${apiUrl}/${companyId}`);
        alert("Company deleted successfully!");
        fetchCompanies();
      } catch (err) {
        alert(`Error: ${err.response?.data?.message || 'Failed to delete company.'}`);
      }
    }
  };

  // ✅ --- THIS IS THE FIX ---
  const sortedAndFilteredCompanies = companies
    .filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));
  // ✅ --- END OF FIX ---

  if (loading) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading Companies...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Associate Companies</h1>
            <p className="mt-1 text-md text-gray-500 dark:text-gray-400">Manage your source companies and partners.</p>
          </div>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="relative w-full sm:max-w-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg aria-hidden="true" className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for a company..."
              value={searchTerm}
              onChange={(e ) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <button onClick={handleAdd} className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-900">
            <PlusIcon className="h-5 w-5" />
            <span>Add Company</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedAndFilteredCompanies.map((company) => (
            <div key={company._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col justify-between border border-gray-200 dark:border-gray-700">
              <Link to={`/associate-company/${company._id}`} className="block">
                <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400 hover:underline">{company.name}</h2>
              </Link>
              {isDeleteEnabled && (
                <div className="mt-4 flex justify-end items-center space-x-3">
                  <button onClick={() => handleEdit(company)} className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" title="Edit Company">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(company._id)} className="text-gray-400 hover:text-red-600 dark:hover:text-red-400" title="Delete Company">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={companyToEdit ? 'Edit Company' : 'Add New Company'}>
        <AssociateCompanyForm onSave={handleSave} companyToEdit={companyToEdit} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default AssociateCompanies;
