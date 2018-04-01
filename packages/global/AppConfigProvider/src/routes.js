
const baseMetaData = {
  title: 'Fantasy Football',
  description: '',
  meta: {
    charSet: 'utf-8',
    name: {
      keywords: 'react,example',
    },
  },
};

const routesConfig = [
  {
    name: 'homepage',
    exact: true,
    path: '/',
    meta: {
      ...baseMetaData,
      title: 'Fantasy Football',
    },
    label: 'Homepage',
  },
  {
    name: 'admin',
    path: '/admin/',
    meta: {
      ...baseMetaData,
      title: 'Admin',
    },
    label: 'Admin',
    requiresAuthentication: true,
  },
  {
    name: 'teams',
    path: '/teams/',
    label: 'Teams',
    meta: {
      ...baseMetaData,
      title: 'Teams',
    },
  },
  {
    name: 'myTeam',
    path: '/my-team/',
    label: 'My Team',
    meta: {
      ...baseMetaData,
      title: 'My Team',
    },
    requiresAuthentication: true,
  },
  {
    name: 'logout',
    path: '/logout/',
    label: 'Logout',
    meta: {
      ...baseMetaData,
      title: 'Logout',
    },
  },
  {
    name: 'profile',
    path: '/profile/',
    label: 'Profile',
    meta: {
      ...baseMetaData,
      title: 'profile',
    },
    requiresAuthentication: true,
  },
  {
    name: 'login',
    path: '/login/',
    label: 'Login',
    meta: {
      ...baseMetaData,
      title: 'Login',
    },
  },
  {
    name: 'rules',
    path: '/rules/',
    label: 'Rules',
    meta: {
      ...baseMetaData,
      title: 'Rules',
    },
  },
  {
    name: 'divisions',
    path: '/divisions/',
    label: 'Divisions',
    meta: {
      ...baseMetaData,
      title: 'Divisions',
    },
  },
  {
    name: 'change-password',
    path: '/change-password/',
    requiresAuthentication: true,
    label: 'Change Password',
    meta: {
      ...baseMetaData,
      title: 'Change Password',
    },
  },
];

export default routesConfig;
