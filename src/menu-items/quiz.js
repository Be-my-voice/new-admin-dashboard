// assets
import { IconQuestionMark } from '@tabler/icons'; 

// constant
const icons = { IconQuestionMark };

const pages = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'quiz',
      title: 'Quiz',
      type: 'item', 
      icon: icons.IconQuestionMark, 
      url: '/quiz/view-quiz/', 
    }
  ]
};

export default pages;
