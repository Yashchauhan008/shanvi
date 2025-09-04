// import * as XLSX from 'xlsx';

// export const exportToExcel = (apiData, fileName) => {
//   // 1. Transform the raw API data into a flat structure for the Excel sheet
//   const flattenedData = apiData.map(order => {
//     // Create a summary of pallet items for a single cell
//     const itemsSummary = order.items.map(item => `${item.paletSize} (Qty: ${item.quantity})`).join(', ');

//     return {
//       'Order ID': order.customOrderId,
//       'Date': new Date(order.date).toLocaleDateString('en-GB'),
//       'Transaction Type': order.transactionType.toUpperCase(),
//       'Source': order.source?.name || order.source?.username || 'N/A',
//       'Party': order.party_id?.name || 'N/A',
//       'Factory': order.factory_id?.name || 'N/A',
//       'Vehicle': order.vehicle,
//       'Vehicle Number': order.vehicle_number,
//       'Pallet Items': itemsSummary,
//       // Include all inventory items
//       'Film White (kg)': order.film_white,
//       'Film Blue (kg)': order.film_blue,
//       'Patti roll (kg)': order.patti_roll,
//       'Packing Clip (kg)': order.packing_clip,
//       'Angle Board 24 (pcs)': order.angle_board_24,
//       'Angle Board 32 (pcs)': order.angle_board_32,
//       'Angle Board 36 (pcs)': order.angle_board_36,
//       'Angle Board 39 (pcs)': order.angle_board_39,
//       'Angle Board 48 (pcs)': order.angle_board_48,
//       'Cap Hit (pcs)': order.cap_hit,
//       'Cap Simple (pcs)': order.cap_simple,
//       'Firmshit (pcs)': order.firmshit,
//       'Thermocol (pcs)': order.thermocol,
//       'Metal Angle (pcs)': order.metal_angle,
//       'Black Cover (pcs)': order.black_cover,
//       'Patiya (pcs)': order.patiya,
//       'Plypatia (pcs)': order.plypatia,
//     };
//   });

//   // 2. Create a new worksheet from the flattened data
//   const worksheet = XLSX.utils.json_to_sheet(flattenedData);

//   // Optional: Set column widths for better readability
//   worksheet['!cols'] = [
//     { wch: 15 }, // Order ID
//     { wch: 12 }, // Date
//     { wch: 18 }, // Transaction Type
//     { wch: 25 }, // Source
//     { wch: 25 }, // Party
//     { wch: 25 }, // Factory
//     { wch: 15 }, // Vehicle
//     { wch: 20 }, // Vehicle Number
//     { wch: 50 }, // Pallet Items
//   ];

//   // 3. Create a new workbook and append the worksheet
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'OrdersReport');

//   // 4. Trigger the download of the Excel file
//   XLSX.writeFile(workbook, `${fileName}.xlsx`);
// };


import * as XLSX from 'xlsx';

export const exportToExcel = (apiData, fileName) => {
  // 1. Transform the raw API data into a flat structure for the Excel sheet
  const flattenedData = apiData.map(order => {
    // Create a summary of pallet items for a single cell
    const itemsSummary = order.items.map(item => `${item.paletSize} (Qty: ${item.quantity})`).join(', ');

    return {
      'Order ID': order.customOrderId,
      'Date': new Date(order.date).toLocaleDateString('en-GB'),
      'Transaction Type': order.transactionType.toUpperCase(),
      'Source': order.source?.name || order.source?.username || 'N/A',
      'Party': order.party_id?.name || 'N/A',
      'Factory': order.factory_id?.name || 'N/A',
      'Vehicle': order.vehicle,
      'Vehicle Number': order.vehicle_number,
      'Pallet Items': itemsSummary,
      // Include all numeric inventory items
      'Film White (pcs)': order.film_white,
      'Film Blue (pcs)': order.film_blue,
      'Patti roll (pcs)': order.patti_roll,
      'Packing Clip (pcs)': order.packing_clip,
      'Angle Board 24 (pcs)': order.angle_board_24,
      'Angle Board 32 (pcs)': order.angle_board_32,
      'Angle Board 36 (pcs)': order.angle_board_36,
      'Angle Board 39 (pcs)': order.angle_board_39,
      'Angle Board 48 (pcs)': order.angle_board_48,
      
      // ✅ --- THIS IS THE FIX ---
      // Correctly include the string values for CAP fields.
      'Cap Hit (pcs)': order.cap_hit,
      'Cap Simple (pcs)': order.cap_simple,
      // ✅ --- END OF FIX ---

      'Firmshit (pcs)': order.firmshit,
      'Thermocol (pcs)': order.thermocol,
      'Metal Angle (pcs)': order.metal_angle,
      'Black Cover (pcs)': order.black_cover,
      'Patiya (pcs)': order.patiya,
      'Plypatia (pcs)': order.plypatia,
    };
  });

  // 2. Create a new worksheet from the flattened data
  const worksheet = XLSX.utils.json_to_sheet(flattenedData);

  // Optional: Set column widths for better readability
  worksheet['!cols'] = [
    { wch: 15 }, // Order ID
    { wch: 12 }, // Date
    { wch: 18 }, // Transaction Type
    { wch: 25 }, // Source
    { wch: 25 }, // Party
    { wch: 25 }, // Factory
    { wch: 15 }, // Vehicle
    { wch: 20 }, // Vehicle Number
    { wch: 50 }, // Pallet Items
    // Add widths for the rest of the inventory columns if desired
  ];

  // 3. Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'OrdersReport');

  // 4. Trigger the download of the Excel file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
