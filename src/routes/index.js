// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
// const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Rooms = lazy(() => import('../pages/protected/Rooms'))
const Testimony = lazy(() => import('../pages/protected/Testimony'))
const Gallery = lazy(() => import('../pages/protected/Gallery'))
const Events = lazy(() => import('../pages/protected/Events'))
const Partners = lazy(() => import('../pages/protected/Partners'))
// const News = lazy(() => import('../pages/protected/News'))
// const Team = lazy(() => import('../pages/protected/Team'))
// const Programs = lazy(() => import('../pages/protected/Programs'))
// const Course = lazy(() => import('../pages/protected/Course'))
// const HostCenter = lazy(() => import('../pages/protected/HostCenters'))
// const Integration = lazy(() => import('../pages/protected/Integration'))
// const Calendar = lazy(() => import('../pages/protected/Calendar'))
// const Teams = lazy(() => import('../pages/protected/Team'))
const Bookings = lazy(() => import('../pages/protected/Bookings'))
// const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
// const GettingStarted = lazy(() => import('../pages/GettingStarted'))
// const DocFeatures = lazy(() => import('../pages/DocFeatures'))
// const DocComponents = lazy(() => import('../pages/DocComponents'))



const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  // {
  //   path: '/welcome', // the url
  //   component: Welcome, // view rendered
  // },
  {
    path: '/rooms',
    component: Rooms,
  },
  {
    path: '/testimony',
    component: Testimony,
  },
  {
    path: '/gallery',
    component: Gallery,
  },
  {
    path: '/events',
    component: Events,
  },
  {
    path: '/partners',
    component: Partners,
  },
  // {
  //   path: '/news',
  //   component: News,
  // },
  // {
  //   path: '/team',
  //   component: Team,
  // },
  // {
  //   path: '/hostcenters',
  //   component: HostCenter,
  // },
  // {
  //   path: '/programs',
  //   component: Programs,
  // },
  // {
  //   path: '/Courses',
  //   component: Course,
  // },
  // {
  //   path: '/settings-team',
  //   component: Team,
  // },
  // {
  //   path: '/calendar',
  //   component: Calendar,
  // },
  {
    path: '/bookings',
    component: Bookings,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  // {
  //   path: '/settings-billing',
  //   component: Bills,
  // },
  // {
  //   path: '/getting-started',
  //   component: GettingStarted,
  // },
  // {
  //   path: '/features',
  //   component: DocFeatures,
  // },
  // {
  //   path: '/components',
  //   component: DocComponents,
  // },
  // {
  //   path: '/integration',
  //   component: Integration,
  // },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
