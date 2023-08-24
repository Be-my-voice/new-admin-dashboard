// assets
import { IconBook } from '@tabler/icons'; // Use the appropriate book icon from Tabler Icons

// constant
const icons = { IconBook }; // Update the icons object with the new icon

const pages = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'lesson',
      title: 'Lesson',
      type: 'collapse',
      icon: icons.IconBook, // Update the icon to IconBook for book-related icon

      children: [
        {
          id: 'viewLesson',
          title: 'View Lessons',
          type: 'item',
          url: '#', // Change this URL
          target: true
        },
        {
          id: 'addLesson',
          title: 'Add New Lesson',
          type: 'item',
          url: '#', // Change this URL
          target: true
        }
      ]
    }
  ]
};

export default pages;
