// assets
import { IconBook } from '@tabler/icons'; 

// constant
const icons = { IconBook }; 

const pages = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'lesson',
      title: 'Lesson',
      type: 'collapse',
      icon: icons.IconBook, 

      children: [
        {
          id: 'viewLesson',
          title: 'View Lessons',
          type: 'item',
          url: '/lesson/view-lesson/', 
        },
        {
          id: 'addLesson',
          title: 'Add New Lesson',
          type: 'item',
          url: '/lesson/add-lesson/', 
        }
      ]
    }
  ]
};

export default pages;
