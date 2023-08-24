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
      url: '#', // Change this 
      icon: icons.IconUsers, 
      breadcrumbs: false
    }
  ]
};

export default user;
