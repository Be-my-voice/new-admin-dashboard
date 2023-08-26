// assets
import { IconUsers } from '@tabler/icons'; 

// constant
const icons = { IconUsers }; 

const user = {
  id: 'user',
  type: 'group',
  children: [
    {
      id: 'user',
      title: 'Users',
      type: 'item',
      url: '/user', 
      icon: icons.IconUsers, 
      breadcrumbs: false
    }
  ]
};

export default user;
