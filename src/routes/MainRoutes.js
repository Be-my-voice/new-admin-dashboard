import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/')));

// change password routing
const ChangePassword = Loadable(lazy(() => import('views/change-password')));

// sales routing
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

// user profile routing
const UserProfile = Loadable(lazy(() => import('views/user/[userId]')));

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
      children: [
        {
          path: '', // This is the default route for the User page
          element: <User />
        },
        {
          path: ':userId', // This matches user profile URLs like 'user/user123'
          element: <UserProfile />
        }
      ]
    },
  ]
};

export default MainRoutes;
