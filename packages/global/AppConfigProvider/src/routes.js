export default [
  {
    name: 'rules',
    exact: true,
    path: '/',
    meta: {
      title: 'Kammy: Fantasy Football',
      description: 'Kammy : Fantasy Football',
    },
    label: 'Rules',
    requiresAuthentication: false,
    component: 'RulesPage',
    template: 'default',
  },
  {
    name: 'players',
    exact: true,
    path: '/players/',
    meta: {
      title: 'Kammy: Fantasy Football',
      description: 'Kammy : Fantasy Football',
    },
    label: 'Admin - Players',
    requiresAuthentication: false,
    component: 'PlayersPage',
    template: 'default',
  },
  {
    name: 'teams',
    exact: true,
    path: '/teams/',
    meta: {
      title: 'Kammy: Fantasy Football',
      description: 'Kammy : Fantasy Football',
    },
    label: 'Admin - Teams',
    requiresAuthentication: false,
    component: 'TeamsPage',
    template: 'default',
  },
];
