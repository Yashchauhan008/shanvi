import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import the context hook

const DeleteToggle = () => {
  // Get the state and the toggle function from the global context
  const { isDeleteEnabled, toggleDelete } = useAuth();

  return (
    <div className="flex items-center space-x-3">
      <span className={`text-sm font-medium ${isDeleteEnabled ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
        Enable Delete
      </span>
      <button
        onClick={toggleDelete}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          isDeleteEnabled ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-600'
        }`}
        title={isDeleteEnabled ? 'Deactivate Delete Mode' : 'Activate Delete Mode'}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isDeleteEnabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

export default DeleteToggle;
