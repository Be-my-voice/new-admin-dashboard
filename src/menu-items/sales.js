// assets
import { IconReportMoney } from '@tabler/icons';

// constant
const icons = { IconReportMoney }; 

const sales = {
  id: 'sales',
  type: 'group',
  children: [
    {
      id: 'sales',
      title: 'Sales',
      type: 'item',
      url: '/sales/',
      icon: icons.IconReportMoney, 
      breadcrumbs: false
    }
  ]
};

export default sales;
