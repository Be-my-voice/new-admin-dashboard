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
      type: 'item', 
      icon: icons.IconBook,
      url: '/lesson/view-lesson/', 
    },
  ],
};

export default pages;
