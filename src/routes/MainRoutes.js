import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/')));

// change password routing
const ChangePassword = Loadable(lazy(() => import('views/change-password')));

// ssales routing
const Sales = Loadable(lazy(() => import('views/sales')));

// reported errors routing
const ReportedErrors = Loadable(lazy(() => import('views/reported-errors')));

// user routing
const User = Loadable(lazy(() => import('views/user')));

// lesson routing
const ViewLesson = Loadable(lazy(() => import('views/lesson/view-lesson')));
const AddLesson = Loadable(lazy(() => import('views/lesson/add-lesson')));

// quiz routing
const ViewQuiz = Loadable(lazy(() => import('views/quiz/view-quiz')));
const AddQuiz = Loadable(lazy(() => import('views/quiz/add-quiz')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      children: [
        {
          path: 'dashboard',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'lesson',
      children: [
        {
          path: 'add-lesson',
          element: <AddLesson />
        }
      ]
    },
    {
      path: 'lesson',
      children: [
        {
          path: 'view-lesson',
          element: <ViewLesson />
        }
      ]
    },
    {
      path: 'quiz',
      children: [
        {
          path: 'add-quiz',
          element: <AddQuiz />
        }
      ]
    },
    {
      path: 'quiz',
      children: [
        {
          path: 'view-quiz',
          element: <ViewQuiz />
        }
      ]
    },
    {
      path: 'reported-errors',
      element: <ReportedErrors />
    },
    {
      path: 'sales',
      element: <Sales />
    }, 
    {
      path: 'change-password',
      element: <ChangePassword />
    },
    {
      path: 'user',
      element: <User />
    }
  ]
};

export default MainRoutes;
