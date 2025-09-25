
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PalletCharts = ({ data, loading }) => {
  if (loading) {
    return <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading chart data...</div>;
  }
  if (!data || data.length === 0) {
    return <div className="p-6 text-center text-gray-500 dark:text-gray-400">No data available to display charts.</div>;
  }

  const labels = data.map(item => item.palletSize);
  const totalOutData = data.map(item => item.totalOut);
  const totalInData = data.map(item => item.totalIn);
  const netBalanceData = data.map(item => item.netBalance);

  // --- Configuration for Grouped Bar Chart (In vs. Out) ---
  const groupedBarData = {
    labels,
    datasets: [
      {
        label: 'Total Out (Orders)',
        data: totalOutData,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total In (Bills)',
        data: totalInData,
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      },
    ],
  };

  const groupedBarOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Pallet Movement: In vs. Out' },
    },
    scales: {
      y: { 
        beginAtZero: true, 
        title: { display: true, text: 'Quantity' } 
      },
      // ✅ --- THIS IS THE FIX FOR THE GROUPED BAR CHART ---
      x: {
        ticks: {
          autoSkip: false, // This forces all labels to be shown
          maxRotation: 90, // Rotates labels vertically if they overlap
          minRotation: 45,  // Rotates labels diagonally
        }
      }
      // ✅ --- END OF FIX ---
    },
  };

  // --- Configuration for Horizontal Bar Chart (Net Balance) ---
  const netBalanceChartData = {
    labels,
    datasets: [
      {
        label: 'Net Balance',
        data: netBalanceData,
        backgroundColor: netBalanceData.map(value => value >= 0 ? 'rgba(37, 99, 235, 0.7)' : 'rgba(220, 38, 38, 0.7)'),
        borderColor: netBalanceData.map(value => value >= 0 ? 'rgba(37, 99, 235, 1)' : 'rgba(220, 38, 38, 1)'),
        borderWidth: 1,
      },
    ],
  };

  const netBalanceOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Net Pallet Balance (Surplus / Deficit)' },
    },
    scales: {
      x: {
        title: { display: true, text: 'Net Balance (Out - In)' },
      },
      // ✅ --- THIS IS THE FIX FOR THE HORIZONTAL BAR CHART ---
      y: {
        ticks: {
          autoSkip: false, // This forces all labels to be shown
          font: {
            size: 10 // Use a slightly smaller font to help fit all labels
          }
        }
      }
      // ✅ --- END OF FIX ---
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <Bar options={groupedBarOptions} data={groupedBarData} />
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <Bar options={netBalanceOptions} data={netBalanceChartData} />
      </div>
    </div>
  );
};

export default PalletCharts;
