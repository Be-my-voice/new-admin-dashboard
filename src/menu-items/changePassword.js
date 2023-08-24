// assets
import { IconKey } from '@tabler/icons'; // Use the appropriate key icon from Tabler Icons

// constant
const icons = { IconKey }; // Update the icons object with the new icon

const changePassword = {
  id: 'changePassword',
  type: 'group',
  children: [
    {
      id: 'changePassword',
      title: 'Change Password',
      type: 'item',
      url: '/dashboard/', // Change this to the appropriate URL
      icon: icons.IconKey, // Update the icon here
      breadcrumbs: false
    }
  ]
};

export default changePassword;
