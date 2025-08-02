import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  doc.text('Invoice To:', leftColX, 50);
  doc.setFont('helvetica', 'normal');
  doc.text(orderData.party_id.name, leftColX, 56);
  doc.setFont('helvetica', 'bold');
  doc.text('Factory:', leftColX, 64);
  doc.setFont('helvetica', 'normal');
  doc.text(orderData.factory_id.name, leftColX, 70);
  const rightColX = 130;
  doc.setFont('helvetica', 'bold');
  doc.text('Invoice No:', rightColX, 50);
  doc.text('Order Date:', rightColX, 56);
  doc.text('Vehicle:', rightColX, 62);
  doc.text('Vehicle No:', rightColX, 68);
  doc.setFont('helvetica', 'normal');
  doc.text(orderData.customOrderId, rightColX + 30, 50);
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

  // --- 4. Main Content Table (Unchanged) ---
  const tableStartY = checkboxY + 20;
  let tableData = orderData.items.map(item => [
    item.paletSize,
    item.quantity,
    'Pcs',
  ]);
  const minRows = 15;
  const rowsToAdd = minRows - tableData.length;
  if (rowsToAdd > 0) {
    for (let i = 0; i < rowsToAdd; i++) {
      tableData.push(['', '', '']);
    }
  }
  autoTable(doc, {
    startY: tableStartY,
    head: [['Description of Goods', 'Quantity', 'Unit']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: primaryColor, textColor: '#ffffff', fontStyle: 'bold' },
    styles: { cellPadding: 2, fontSize: 10 },
    margin: { top: tableStartY },
  });

  // --- 5. Terms & Conditions (Unchanged) ---
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(9);
  doc.setTextColor(secondaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Terms & Conditions:', 15, finalY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textColor);
  const terms = [
    '1. Goods once sold will not be taken back.',
    '2. Interest @18% p.a. will be charged if the payment',
    'is not made with in the stipulated time.',
    '3. Subject to Morbi jurisdiction only.',
  ];
  doc.text(terms, 15, finalY + 5);

  // --- 6. Authorized Signature (Unchanged) ---
  const signatureY = doc.internal.pageSize.height - 30;
  doc.setDrawColor(secondaryColor);
  doc.line(130, signatureY, 195, signatureY);
  doc.setFont('helvetica', 'bold');
  doc.text('For SHANVI ENTERPRISE', 130, signatureY + 8);
  doc.setFontSize(10);
  doc.text('Authorised Signatory', 130, signatureY + 14);

  // --- ✅ 7. Set PDF Properties and Generate Output ---
  // First, construct the dynamic filename
  const orderNumber = orderData.customOrderId;
  const date = new Date(orderData.date);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  const fileName = `${orderNumber}_${formattedDate}.pdf`;

  // Set the 'title' property of the PDF. Most browsers use this as the default filename.
  doc.setProperties({
    title: fileName,
  });

  // Now, open the PDF in a new tab. When the user clicks "Save" or "Download",
  // the browser will suggest the filename we just set.
  doc.output('dataurlnewwindow');
};
