// UserReport.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generateUserReport = (users, premiumUsersCount, normalUsersCount) => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Define report title
  doc.setFontSize(16);
  doc.text('User Report', 10, 10);

  // Create a table for user data
  const data = [];
  users.forEach((user, index) => {
    data.push([
      index + 1,
      user.name,
      user.email,
      user.userStatus === 'ENABLED' ? 'Active' : 'Disabled',
    ]);
  });

  // Define table headers
  const headers = [['#', 'Name', 'Email', 'Status']];

  // Set the table width and position
  doc.autoTable({
    head: headers,
    body: data,
    startY: 20,
  });

  // Add premium and normal users count
  doc.setFontSize(12);
  doc.text(`Premium Users Count: ${premiumUsersCount}`, 10, doc.autoTable.previous.finalY + 10);
  doc.text(`Normal Users Count: ${normalUsersCount}`, 10, doc.autoTable.previous.finalY + 20);

  // Save or download the PDF
  doc.save('user_report.pdf');
};

export default generateUserReport;
