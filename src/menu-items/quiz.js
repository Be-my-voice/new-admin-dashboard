// assets
import { IconQuestionMark } from '@tabler/icons'; // Use the appropriate question mark icon from Tabler Icons

// constant
const icons = { IconQuestionMark }; // Update the icons object with the new icon

const pages = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'quiz',
      title: 'Quiz',
      type: 'collapse',
      icon: icons.IconQuestionMark, // Update the icon to IconQuestionMark

      children: [
        {
          id: 'viewQuiz',
          title: 'View Quizzes',
          type: 'item',
          url: '#', // Change this URL
          target: true
        },
        {
          id: 'addQuiz',
          title: 'Add New Quiz',
          type: 'item',
          url: '#', // Change this URL
          target: true
        }
      ]
    }
  ]
};

export default pages;

