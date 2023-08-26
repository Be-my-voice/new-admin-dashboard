// assets
import { IconKey } from '@tabler/icons'; 

// constant
const icons = { IconKey }; 

const changePassword = {
  id: 'changePassword',
  type: 'group',
  children: [
    {
      id: 'changePassword',
      title: 'Change Password',
      type: 'item',
      url: '/change-password/', 
      icon: icons.IconKey, 
      breadcrumbs: false
    }
  ]
};

export default changePassword;
