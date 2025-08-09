// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
// import Modal from './Modal';
// import AssociateCompanyForm from './AssociateCompanyForm';

// const AssociateCompanyManager = () => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [companyToEdit, setCompanyToEdit] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false); // To handle button loading state

//   const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/associate-companies`;

//   const fetchCompanies = useCallback(async () => {
//     try {
//       const response = await axios.get(apiUrl);
//       setCompanies(response.data);
//     } catch (err) {
//       setError('Failed to fetch associate companies.');
//       console.error(err);
//     } finally {
//       if (loading) setLoading(false);
//     }
//   }, [apiUrl, loading]);

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
//     setIsSubmitting(true);
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
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async (companyId) => {
//     if (window.confirm("Are you sure you want to delete this company?")) {
//       try {
//         await axios.delete(`${apiUrl}/${companyId}`);
//         await fetchCompanies();
//       } catch (err) {
//         alert(`Error: ${err.response?.data?.message || 'Failed to delete company.'}`);
//       }
//     }
//   };

//   if (loading) return <div className="p-5 text-center text-gray-500 dark:text-gray-400">Loading Company Data...</div>;
//   if (error) return <div className="p-5 text-center text-red-500">{error}</div>;

//   return (
//     <>
//       {/* ✅ Add dark mode classes to the main container */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//         {/* ✅ Add dark mode classes to the header */}
//         <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Associate Companies</h2>
//             <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage suppliers, partners, or other companies.</p>
//           </div>
//           <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
//             <PlusIcon className="h-5 w-5" /> Add New
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           {/* ✅ Add dark mode classes to the table */}
//           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Company Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Created At</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//               {companies.length > 0 ? (
//                 companies.map((company) => (
//                   <tr key={company._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{company.name}</td>
//                     <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{new Date(company.createdAt).toLocaleDateString()}</td>
//                     <td className="px-6 py-4 text-right text-sm space-x-4">
//                       <button onClick={() => handleEdit(company)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"><PencilIcon className="h-5 w-5 inline" /></button>
//                       <button onClick={() => handleDelete(company._id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"><TrashIcon className="h-5 w-5 inline" /></button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No associate companies found.</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <Modal isOpen={isModalOpen} onClose={closeModal} title={companyToEdit ? 'Edit Company' : 'Add New Company'}>
//         <AssociateCompanyForm onSave={handleSave} companyToEdit={companyToEdit} onClose={closeModal} isSubmitting={isSubmitting} />
//       </Modal>
//     </>
//   );
// };

// export default AssociateCompanyManager;


// src/components/AssociateCompanyManager.js

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import Modal from './Modal';
import AssociateCompanyForm from './AssociateCompanyForm';
// ✅ 1. Import the useAuth hook
import { useAuth } from '../context/AuthContext';

const AssociateCompanyManager = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ 2. Get the delete toggle state from the context
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
      if (loading) setLoading(false);
    }
  }, [apiUrl, loading]);

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
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (companyId) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await axios.delete(`${apiUrl}/${companyId}`);
        await fetchCompanies();
      } catch (err) {
        alert(`Error: ${err.response?.data?.message || 'Failed to delete company.'}`);
      }
    }
  };

  if (loading) return <div className="p-5 text-center text-gray-500 dark:text-gray-400">Loading Company Data...</div>;
  if (error) return <div className="p-5 text-center text-red-500">{error}</div>;

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Associate Companies</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage suppliers, partners, or other companies.</p>
          </div>
          <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            <PlusIcon className="h-5 w-5" /> Add New
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Company Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Created At</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {companies.length > 0 ? (
                companies.map((company) => (
                  <tr key={company._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{company.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{new Date(company.createdAt).toLocaleDateString()}</td>
                      {/* ✅ 3. Conditionally render the delete button */}
                      {isDeleteEnabled && (
                    <td className="px-6 py-4 text-right text-sm space-x-4">
                      <button onClick={() => handleEdit(company)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"><PencilIcon className="h-5 w-5 inline" /></button>
                        <button onClick={() => handleDelete(company._id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                          <TrashIcon className="h-5 w-5 inline" />
                        </button>
                    </td>
                      )}
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No associate companies found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={companyToEdit ? 'Edit Company' : 'Add New Company'}>
        <AssociateCompanyForm onSave={handleSave} companyToEdit={companyToEdit} onClose={closeModal} isSubmitting={isSubmitting} />
      </Modal>
    </>
  );
};

export default AssociateCompanyManager;
