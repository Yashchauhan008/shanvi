
import React from 'react';
import { TagIcon, WrenchScrewdriverIcon, PlusCircleIcon, BugAntIcon } from '@heroicons/react/24/solid';

// --- The versions array is updated with the new entry at the top ---
const versions = [
  {
    version: '1.9.0',
    date: 'September 12, 2025',
    changes: [
      { type: 'Feature', text: 'logs implimented in backend for future debug', icon: PlusCircleIcon },
    ],
  },
  {
    version: '1.8.0',
    date: 'September 7, 2025',
    changes: [
      { type: 'Fix', text: 'fixed Inventory Item count in invoice generation.', icon: BugAntIcon },
    ],
  },
  {
    version: '1.7.0',
    date: 'September 5, 2025',
    changes: [
      { type: 'Fix', text: 'Corrected inventory name spellings on the Dashboard and in the Order Detail modal.', icon: BugAntIcon },
      { type: 'Fix', text: 'Fixed a bug where deleting an order did not correctly revert stock for "Cap Hit" and "Cap Simple".', icon: BugAntIcon },
      { type: 'Fix', text: 'Changed inventory inputs from type "number" to "text" to prevent accidental scrolling changes.', icon: WrenchScrewdriverIcon },
      { type: 'Feature', text: 'Enforced a two-decimal place limit on all numeric inventory inputs for data consistency.', icon: PlusCircleIcon },
    ],
  },
  {
    version: '1.6.0',
    date: 'September 4, 2025',
    changes: [
      { type: 'Fix', text: 'Edit inventory form value bug ,fix', icon: BugAntIcon },
      { type: 'Fix', text: 'Allow decimal points (e.g., 12.90 kg) in all relevant fields with (plus) and with two decimal place too.', icon: BugAntIcon },
    ],
  },
  {
    version: '1.5.0',
    date: 'September 3, 2025',
    changes: [
      { type: 'Feature', text: 'Added a version history and changelog to the Masters page.', icon: PlusCircleIcon },
      { type: 'Feature', text: 'Added a edit stock functionality', icon: PlusCircleIcon },
      { type: 'Feature', text: 'Added a tooltip of pallet counts in transaction histories', icon: PlusCircleIcon },
      { type: 'Fix', text: 'Fixed the live data fetching on the Dashboard date filter to only refresh the Pallet Details table.', icon: BugAntIcon },
      { type: 'Fix', text: 'Dropdown data is sorted alphabetically always', icon: BugAntIcon },
      { type: 'Fix', text: 'vehicle number and name fields added in the "Add Bill" section.', icon: WrenchScrewdriverIcon },
      { type: 'Fix', text: 'Prop drill date filter input from party name selection to factory.', icon: WrenchScrewdriverIcon },
      { type: 'Fix', text: 'Date filters should always show lifetime data.', icon: WrenchScrewdriverIcon },
      { type: 'Fix', text: 'By default, select two types of pallets in every form.', icon: WrenchScrewdriverIcon },
    ],
  },
  {
    version: '1.4.0',
    date: 'August 28, 2025',
    changes: [
      { type: 'Feature', text: 'Implemented live search for orders by ID on the Orders page.', icon: PlusCircleIcon },
      { type: 'Feature', text: 'Enabled editing of all transaction details, including complex inventory adjustments.', icon: WrenchScrewdriverIcon },
      { type: 'Feature', text: 'fixed challan print', icon: WrenchScrewdriverIcon },
      { type: 'Fix', text: 'Fixed display of calculable string values (e.g., "100 + 50") in PDF and Excel exports.', icon: BugAntIcon },
      { type: 'Fix', text: 'Highlight input fields on tab navigation.', icon: BugAntIcon },
    ],
  },
  {
    version: '1.3.0',
    date: 'August 26, 2025',
    changes: [
      { type: 'Feature', text: 'Added global search bars to Parties and Factories pages.', icon: PlusCircleIcon },
      { type: 'Feature', text: 'Implemented soft-delete functionality for all major records, controlled by a master toggle.', icon: WrenchScrewdriverIcon },
    ],
  },
  {
    version: '1.2.0',
    date: 'August 19, 2025',
    changes: [
      { type: 'Feature', text: 'Introduced Dark Mode and a theme toggle switch.', icon: PlusCircleIcon },
      { type: 'Feature', text: 'Made the entire UI responsive for mobile and tablet devices.', icon: WrenchScrewdriverIcon },
    ],
  },
  {
    version: '1.0.0',
    date: 'August 15, 2025',
    changes: [
      { type: 'Feature', text: 'Initial release of the Inventory and Order Management System.', icon: TagIcon },
    ],
  },
];

// Helper to get color based on change type
const getTypeStyles = (type) => {
  switch (type) {
    case 'Feature':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
    case 'Fix':
      return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const VersionHistory = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Version History</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Tracking new features, fixes, and improvements.
        </p>
      </div>
      <div className="p-6 max-h-[400px] overflow-y-auto">
        <div className="flow-root">
          <ul className="-mb-8">
            {versions.map((item, itemIdx) => (
              <li key={item.version}>
                <div className="relative pb-8">
                  {itemIdx !== versions.length - 1 ? (
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                        <TagIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5">
                      <div className="flex justify-between items-center">
                        <p className="text-md font-semibold text-gray-900 dark:text-white">
                          Version {item.version}
                        </p>
                        <p className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                          {item.date}
                        </p>
                      </div>
                      <div className="mt-2 space-y-2">
                        {item.changes.map((change, changeIdx) => (
                          <div key={changeIdx} className="flex items-start gap-3">
                            <div className={`mt-1 flex-shrink-0 p-1 rounded-full ${getTypeStyles(change.type)}`}>
                              <change.icon className="h-4 w-4" />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{change.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VersionHistory;
