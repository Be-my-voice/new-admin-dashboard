// assets
import { IconMessageReport } from '@tabler/icons';

// constant
const icons = { IconMessageReport };


const reportedError = {
  id: 'reportedError',
  type: 'group',
  children: [
    {
      id: 'reportedError',
      title: 'Reported Errors',
      type: 'item',
      url: '/reported-errors/', 
      icon: icons.IconMessageReport,
      breadcrumbs: false
    }
  ]
};

export default reportedError;
