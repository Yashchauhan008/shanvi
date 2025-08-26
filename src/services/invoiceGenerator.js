
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const getInventoryValue = (order, key) => {
//   const value = order[key];
//   if (typeof value === 'string') {
//     // If it's a string (like for CAPs), return it if it's not '0' or empty.
//     return value && value !== '0' ? value : '';
//   }
//   // If it's a number, return it if it's greater than 0.
//   return value > 0 ? value : '';
// };

// // This helper array defines all possible inventory fields and their display names.
// const allInventoryItems = [
//   { key: 'film_white', name: 'Film White' }, { key: 'film_blue', name: 'Film Blue' },
//   { key: 'patti_role', name: 'Patti Role' }, { key: 'packing_clip', name: 'Packing Clip' },
//   { key: 'angle_board_24', name: 'Angle Board 24' }, { key: 'angle_board_32', name: 'Angle Board 32' },
//   { key: 'angle_board_36', name: 'Angle Board 36' }, { key: 'angle_board_39', name: 'Angle Board 39' },
//   { key: 'angle_board_48', name: 'Angle Board 48' }, { key: 'cap_hit', name: 'Cap Hit' },
//   { key: 'cap_simple', name: 'Cap Simple' }, { key: 'firmshit', name: 'Firmshit' },
//   { key: 'thermocol', name: 'Thermocol' }, { key: 'mettle_angle', name: 'Mettle Angle' },
//   { key: 'black_cover', name: 'Black Cover' }, { key: 'patiya', name: 'Patiya' },
//   { key: 'plypatia', name: 'Plypatia' },
// ];

// export const generateInvoicePdf = (orderData) => {
//   const doc = new jsPDF();

//   const primaryColor = '#1a237e';
//   const secondaryColor = '#5c6bc0';
//   const textColor = '#212121';

//   // --- 1. Header Section (Unchanged) ---
//   doc.setFont('helvetica', 'bold');
//   doc.setFontSize(20);
//   doc.setTextColor(primaryColor);
//   doc.text('SHANVI ENTERPRISE', 105, 20, { align: 'center' });
//   doc.setFont('helvetica', 'normal');
//   doc.setFontSize(10);
//   doc.setTextColor(textColor);
//   doc.text('A/309, ISHAN CERAMIC ZONE, 8-A NATIONAL HIGHWAY, MORBI-363642', 105, 28, { align: 'center' });
//   doc.setFont('helvetica', 'bold');
//   doc.text('GSTIN: 24BYEPP1695P1ZQ', 105, 34, { align: 'center' });
//   doc.setDrawColor(secondaryColor);
//   doc.line(15, 40, 195, 40);

//   // --- 2. Meta-Information Section (Unchanged) ---
//   doc.setFontSize(11);
//   doc.setTextColor(textColor);
//   const leftColX = 15;
//   doc.setFont('helvetica', 'bold');
//   doc.text('To:', leftColX, 50);
//   doc.setFont('helvetica', 'normal');
//   doc.text(orderData.party_id.name, leftColX, 56);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Factory:', leftColX, 64);
//   doc.setFont('helvetica', 'normal');
//   doc.text(orderData.factory_id.name, leftColX, 70);
//   const rightColX = 130;
//   doc.setFont('helvetica', 'bold');
//   doc.text('Chalan No:', rightColX, 50);
//   doc.text('Order Date:', rightColX, 56);
//   doc.text('Vehicle:', rightColX, 62);
//   doc.text('Vehicle No:', rightColX, 68);
//   doc.setFont('helvetica', 'normal');
//   const chalanNumber = orderData.customOrderId.split('-').pop() || orderData.customOrderId;
//   doc.text(chalanNumber, rightColX + 30, 50);
//   doc.text(new Date(orderData.date).toLocaleDateString('en-GB'), rightColX + 30, 56);
//   doc.text(orderData.vehicle || 'N/A', rightColX + 30, 62);
//   doc.text(orderData.vehicle_number || 'N/A', rightColX + 30, 68);

//   // --- 3. Checkboxes (Unchanged) ---
//   const checkboxY = 85;
//   doc.setFontSize(10);
//   doc.setDrawColor(textColor);
//   doc.rect(leftColX, checkboxY, 4, 4);
//   doc.text('Original Copy', leftColX + 7, checkboxY + 3);
//   doc.rect(leftColX, checkboxY + 8, 4, 4);
//   doc.text('Duplicate Copy', leftColX + 7, checkboxY + 11);

//   // ✅ --- 4. Pallet Items Table (with right-aligned columns) ---
//   const tableStartY = checkboxY + 20;
//   let palletTableData = orderData.items.map(item => [
//     item.paletSize,
//     item.quantity,
//     'Pcs',
//   ]);
  
//   const requiredRows = 7;
//   while (palletTableData.length < requiredRows) {
//     palletTableData.push(['', '', '']);
//   }
//   palletTableData = palletTableData.slice(0, requiredRows);

//   autoTable(doc, {
//     startY: tableStartY,
//     head: [['Description of Goods', 'Quantity', 'Unit']],
//     body: palletTableData,
//     theme: 'grid',
//     headStyles: { fillColor: primaryColor, textColor: '#ffffff', fontStyle: 'bold' },
//     styles: { cellPadding: 2, fontSize: 10 },
//     margin: { left: 15, right: 15 },
//     // ✅ Right-align the 'Quantity' (index 1) and 'Unit' (index 2) columns.
//     columnStyles: {
//       1: { halign: 'right' },
//       2: { halign: 'right' }
//     }
//   });

//   // --- 5. Two-Column Inventory Details (Unchanged) ---
//   const inventoryTableY = doc.lastAutoTable.finalY + 2;
//   const numInventoryRows = Math.ceil(allInventoryItems.length / 2);
//   const leftTableBody = [];
//   for (let i = 0; i < numInventoryRows; i++) {
//     const item = allInventoryItems[i];
//     if (item) {
//       const quantity = orderData[item.key] > 0 ? orderData[item.key] : '';
//       leftTableBody.push([item.name, quantity]);
//     }
//   }
//   leftTableBody.push(['', '']);
//   const rightTableBody = [];
//   for (let i = numInventoryRows; i < allInventoryItems.length; i++) {
//     const item = allInventoryItems[i];
//     if (item) {
//       const quantity = orderData[item.key] > 0 ? orderData[item.key] : '';
//       rightTableBody.push([item.name, quantity]);
//     }
//   }
//   while (rightTableBody.length < leftTableBody.length) {
//     rightTableBody.push(['', '']);
//   }
//   const leftMargin = 15;
//   const rightMargin = 15;
//   const totalWidth = doc.internal.pageSize.width - leftMargin - rightMargin;
//   const columnWidth = totalWidth / 2;
//   autoTable(doc, {
//     startY: inventoryTableY,
//     head: [['Inventory Item', 'Qty']],
//     body: leftTableBody,
//     theme: 'grid',
//     headStyles: { fillColor: primaryColor, textColor: '#ffffff', fontStyle: 'bold', fontSize: 9 },
//     styles: { cellPadding: 1.5, fontSize: 8, overflow: 'linebreak' },
//     margin: { left: leftMargin },
//     tableWidth: columnWidth,
//     columnStyles: { 1: { cellWidth: 15, halign: 'right' } }
//   });
//   autoTable(doc, {
//     startY: inventoryTableY,
//     head: [['Inventory Item', 'Qty']],
//     body: rightTableBody,
//     theme: 'grid',
//     headStyles: { fillColor: primaryColor, textColor: '#ffffff', fontStyle: 'bold', fontSize: 9 },
//     styles: { cellPadding: 1.5, fontSize: 8, overflow: 'linebreak' },
//     margin: { left: leftMargin + columnWidth },
//     tableWidth: columnWidth,
//     columnStyles: { 1: { cellWidth: 15, halign: 'right' } }
//   });

//   // --- 6. Fixed Bottom Section: Terms & Signature (Unchanged) ---
//   const bottomSectionY = doc.internal.pageSize.height - 45;
//   doc.setFontSize(9);
//   doc.setTextColor(secondaryColor);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Terms & Conditions:', 15, bottomSectionY);
//   doc.setFont('helvetica', 'normal');
//   doc.setTextColor(textColor);
//   const terms = [
//     '1. Goods once sold will not be taken back.',
//     '2. Interest @18% p.a. will be charged if the payment',
//     'is not made with in the stipulated time.',
//     '3. Subject to Morbi jurisdiction only.',
//   ];
//   doc.text(terms, 15, bottomSectionY + 5);
//   const signatureY = doc.internal.pageSize.height - 30;
//   doc.setDrawColor(secondaryColor);
//   doc.line(130, signatureY, 195, signatureY);
//   doc.setFont('helvetica', 'bold');
//   doc.text('For SHANVI ENTERPRISE', 130, signatureY + 8);
//   doc.setFontSize(10);

//   // --- 7. Set PDF Properties and Generate Output (Unchanged) ---
//   const orderNumber = orderData.customOrderId;
//   const date = new Date(orderData.date);
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const year = date.getFullYear();
//   const formattedDate = `${day}-${month}-${year}`;
//   const fileName = `${orderNumber}_${formattedDate}.pdf`;
//   doc.setProperties({
//     title: fileName,
//   });
//   doc.output('dataurlnewwindow');
// };


import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// ✅ --- THIS IS THE FIX ---
// This helper function now correctly handles both string and number types.
const getInventoryValue = (order, key) => {
  const value = order[key];
  // If it's a string (like for CAPs), return it if it's not '0' or empty.
  if (typeof value === 'string') {
    return value && value !== '0' ? value : '';
  }
  // If it's a number, return it if it's greater than 0.
  return value > 0 ? value : '';
};
// ✅ --- END OF FIX ---

// This helper array defines all possible inventory fields and their display names.
const allInventoryItems = [
  { key: 'film_white', name: 'Film White' }, { key: 'film_blue', name: 'Film Blue' },
  { key: 'patti_role', name: 'Patti Role' }, { key: 'packing_clip', name: 'Packing Clip' },
  { key: 'angle_board_24', name: 'Angle Board 24' }, { key: 'angle_board_32', name: 'Angle Board 32' },
  { key: 'angle_board_36', name: 'Angle Board 36' }, { key: 'angle_board_39', name: 'Angle Board 39' },
  { key: 'angle_board_48', name: 'Angle Board 48' }, { key: 'cap_hit', name: 'Cap Hit' },
  { key: 'cap_simple', name: 'Cap Simple' }, { key: 'firmshit', name: 'Firmshit' },
  { key: 'thermocol', name: 'Thermocol' }, { key: 'mettle_angle', name: 'Mettle Angle' },
  { key: 'black_cover', name: 'Black Cover' }, { key: 'patiya', name: 'Patiya' },
  { key: 'plypatia', name: 'Plypatia' },
];

export const generateInvoicePdf = (orderData) => {
  const doc = new jsPDF();

  const primaryColor = '#1a237e';
  const secondaryColor = '#5c6bc0';
  const textColor = '#212121';

  // --- 1. Header Section (Unchanged) ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(primaryColor);
  doc.text('SHANVI ENTERPRISE', 105, 20, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(textColor);
  doc.text('A/309, ISHAN CERAMIC ZONE, 8-A NATIONAL HIGHWAY, MORBI-363642', 105, 28, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.text('GSTIN: 24BYEPP1695P1ZQ', 105, 34, { align: 'center' });
  doc.setDrawColor(secondaryColor);
  doc.line(15, 40, 195, 40);

  // --- 2. Meta-Information Section (Unchanged) ---
  doc.setFontSize(11);
  doc.setTextColor(textColor);
  const leftColX = 15;
  doc.setFont('helvetica', 'bold');
  doc.text('To:', leftColX, 50);
  doc.setFont('helvetica', 'normal');
  doc.text(orderData.party_id.name, leftColX, 56);
  doc.setFont('helvetica', 'bold');
  doc.text('Factory:', leftColX, 64);
  doc.setFont('helvetica', 'normal');
  doc.text(orderData.factory_id.name, leftColX, 70);
  const rightColX = 130;
  doc.setFont('helvetica', 'bold');
  doc.text('Chalan No:', rightColX, 50);
  doc.text('Order Date:', rightColX, 56);
  doc.text('Vehicle:', rightColX, 62);
  doc.text('Vehicle No:', rightColX, 68);
  doc.setFont('helvetica', 'normal');
  const chalanNumber = orderData.customOrderId.split('-').pop() || orderData.customOrderId;
  doc.text(chalanNumber, rightColX + 30, 50);
  doc.text(new Date(orderData.date).toLocaleDateString('en-GB'), rightColX + 30, 56);
  doc.text(orderData.vehicle || 'N/A', rightColX + 30, 62);
  doc.text(orderData.vehicle_number || 'N/A', rightColX + 30, 68);

  // --- 3. Checkboxes (Unchanged) ---
  const checkboxY = 85;
  doc.setFontSize(10);
  doc.setDrawColor(textColor);
  doc.rect(leftColX, checkboxY, 4, 4);
  doc.text('Original Copy', leftColX + 7, checkboxY + 3);
  doc.rect(leftColX, checkboxY + 8, 4, 4);
  doc.text('Duplicate Copy', leftColX + 7, checkboxY + 11);

  // --- 4. Pallet Items Table (Unchanged) ---
  const tableStartY = checkboxY + 20;
  let palletTableData = orderData.items.map(item => [
    item.paletSize,
    item.quantity,
    'Pcs',
  ]);
  
  const requiredRows = 7;
  while (palletTableData.length < requiredRows) {
    palletTableData.push(['', '', '']);
  }
  palletTableData = palletTableData.slice(0, requiredRows);

  autoTable(doc, {
    startY: tableStartY,
    head: [['Description of Goods', 'Quantity', 'Unit']],
    body: palletTableData,
    theme: 'grid',
    headStyles: { fillColor: primaryColor, textColor: '#ffffff', fontStyle: 'bold' },
    styles: { cellPadding: 2, fontSize: 10 },
    margin: { left: 15, right: 15 },
    columnStyles: {
      1: { halign: 'right' },
      2: { halign: 'right' }
    }
  });

  // ✅ --- 5. Two-Column Inventory Details (with corrected logic) ---
  const inventoryTableY = doc.lastAutoTable.finalY + 2;
  const numInventoryRows = Math.ceil(allInventoryItems.length / 2);
  const leftTableBody = [];
  for (let i = 0; i < numInventoryRows; i++) {
    const item = allInventoryItems[i];
    if (item) {
      // Use the helper function to get the correct value (string or number)
      const quantity = getInventoryValue(orderData, item.key);
      leftTableBody.push([item.name, quantity]);
    }
  }
  leftTableBody.push(['', '']); // Add extra empty row

  const rightTableBody = [];
  for (let i = numInventoryRows; i < allInventoryItems.length; i++) {
    const item = allInventoryItems[i];
    if (item) {
      // Use the helper function here as well
      const quantity = getInventoryValue(orderData, item.key);
      rightTableBody.push([item.name, quantity]);
    }
  }
  while (rightTableBody.length < leftTableBody.length) {
    rightTableBody.push(['', '']); // Ensure both tables have the same number of rows
  }

  const leftMargin = 15;
  const rightMargin = 15;
  const totalWidth = doc.internal.pageSize.width - leftMargin - rightMargin;
  const columnWidth = totalWidth / 2;

  autoTable(doc, {
    startY: inventoryTableY,
    head: [['Inventory Item', 'Qty']],
    body: leftTableBody,
    theme: 'grid',
    headStyles: { fillColor: primaryColor, textColor: '#ffffff', fontStyle: 'bold', fontSize: 9 },
    styles: { cellPadding: 1.5, fontSize: 8, overflow: 'linebreak' },
    margin: { left: leftMargin },
    tableWidth: columnWidth,
    columnStyles: { 1: { cellWidth: 15, halign: 'right' } }
  });

  autoTable(doc, {
    startY: inventoryTableY,
    head: [['Inventory Item', 'Qty']],
    body: rightTableBody,
    theme: 'grid',
    headStyles: { fillColor: primaryColor, textColor: '#ffffff', fontStyle: 'bold', fontSize: 9 },
    styles: { cellPadding: 1.5, fontSize: 8, overflow: 'linebreak' },
    margin: { left: leftMargin + columnWidth },
    tableWidth: columnWidth,
    columnStyles: { 1: { cellWidth: 15, halign: 'right' } }
  });

  // --- 6. Fixed Bottom Section: Terms & Signature (Unchanged) ---
  const bottomSectionY = doc.internal.pageSize.height - 45;
  doc.setFontSize(9);
  doc.setTextColor(secondaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Terms & Conditions:', 15, bottomSectionY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textColor);
  const terms = [
    '1. Goods once sold will not be taken back.',
    '2. Interest @18% p.a. will be charged if the payment',
    'is not made with in the stipulated time.',
    '3. Subject to Morbi jurisdiction only.',
  ];
  doc.text(terms, 15, bottomSectionY + 5);
  const signatureY = doc.internal.pageSize.height - 30;
  doc.setDrawColor(secondaryColor);
  doc.line(130, signatureY, 195, signatureY);
  doc.setFont('helvetica', 'bold');
  doc.text('For SHANVI ENTERPRISE', 130, signatureY + 8);
  doc.setFontSize(10);

  // --- 7. Set PDF Properties and Generate Output (Unchanged) ---
  const orderNumber = orderData.customOrderId;
  const date = new Date(orderData.date);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  const fileName = `${orderNumber}_${formattedDate}.pdf`;
  doc.setProperties({
    title: fileName,
  });
  doc.output('dataurlnewwindow');
};
