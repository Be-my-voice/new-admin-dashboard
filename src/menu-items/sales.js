// assets
import { IconReportMoney } from '@tabler/icons'; // Use the appropriate icon for money-related content

// constant
const icons = { IconReportMoney }; // Update the icons object with the new icon

const sales = {
  id: 'sales',
  type: 'group',
  children: [
    {
      id: 'sales',
      title: 'Sales',
      type: 'item',
      url: '#', // Change this URL to the desired URL
      icon: icons.IconReportMoney, // Update the icon to ReportMoney
      breadcrumbs: false
    }
  ]
};

export default sales;
