import dashboard from './dashboard';
import lesson from './lesson';
import quiz from './quiz';
import reportedError from './reportedError';
import sales from './sales';
import user from './user';
import ChangePassword from './changePassword';


const menuItems = {
  // items: [dashboard, pages, utilities, other]
  items: [dashboard, user, lesson, quiz, reportedError, sales, ChangePassword]
};

export default menuItems;
