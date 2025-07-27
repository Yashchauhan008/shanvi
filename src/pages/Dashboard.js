import React, { useState, useEffect } from 'react';

// --- DUMMY DATA (No changes here) ---
const dummyInventoryData = [
    { id: 1, name: 'Film White', currentStock: 150, usedStock: 50, totalStock: 200 },
    { id: 2, name: 'Film Blue', currentStock: 120, usedStock: 80, totalStock: 200 },
    { id: 3, name: 'Patti Role', currentStock: 300, usedStock: 100, totalStock: 400 },
    { id: 4, name: 'Angle Board 24', currentStock: 80, usedStock: 20, totalStock: 100 },
    { id: 5, name: 'Angle Board 32', currentStock: 90, usedStock: 30, totalStock: 120 },
    { id: 6, name: 'Angle Board 36', currentStock: 75, usedStock: 25, totalStock: 100 },
    { id: 7, name: 'Angle Board 39', currentStock: 60, usedStock: 40, totalStock: 100 },
    { id: 8, name: 'Angle Board 48', currentStock: 50, usedStock: 50, totalStock: 100 },
    { id: 9, name: 'Cap Hit', currentStock: 500, usedStock: 250, totalStock: 750 },
    { id: 10, name: 'Cap Simple', currentStock: 800, usedStock: 200, totalStock: 1000 },
    { id: 11, name: 'Firmshit', currentStock: 180, usedStock: 70, totalStock: 250 },
    { id: 12, name: 'Thermocol', currentStock: 220, usedStock: 80, totalStock: 300 },
    { id: 13, name: 'Mettle Angle', currentStock: 130, usedStock: 70, totalStock: 200 },
    { id: 14, name: 'Black Cover', currentStock: 400, usedStock: 150, totalStock: 550 },
    { id: 15, name: 'Packing Clip', currentStock: 1500, usedStock: 500, totalStock: 2000 },
    { id: 16, name: 'Patiya', currentStock: 250, usedStock: 50, totalStock: 300 },
    { id: 17, name: 'Plypatia', currentStock: 200, usedStock: 100, totalStock: 300 },
];
const dummyPalletData = [
    { id: 1, size: '200x200', totalOut: 50, totalUsed: 30, remains: 20 },
    { id: 2, size: '1200x600', totalOut: 80, totalUsed: 75, remains: 5 },
    { id: 3, size: '800x800', totalOut: 120, totalUsed: 100, remains: 20 },
    { id: 4, size: '1000x1000', totalOut: 70, totalUsed: 50, remains: 20 },
    { id: 5, size: '1100x900', totalOut: 95, totalUsed: 90, remains: 5 },
];

// --- API SIMULATION (No changes here) ---
const fetchDashboardData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        inventory: dummyInventoryData,
        pallets: dummyPalletData,
      });
    }, 500);
  });
};


const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [pallets, setPallets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      setLoading(true);
      const data = await fetchDashboardData();
      setInventory(data.inventory);
      setPallets(data.pallets);
      setLoading(false);
    };
    getDashboardData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading dashboard data...</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Use a flex column layout to stack the cards vertically with a gap */}
      <div className="flex flex-col gap-8">
        
        {/* Card 1: Pallet Details (Now on top) */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Pallet Details</h2>
            <p className="mt-1 text-sm text-gray-500">Summary of pallet usage and availability.</p>
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
                {pallets.map((pallet) => (
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

        {/* Card 2: Inventory Status (Now below) */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Inventory Status</h2>
            <p className="mt-1 text-sm text-gray-500">Current stock levels for packaging items.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.currentStock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.usedStock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{item.totalStock}</td>
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

export default Dashboard;
