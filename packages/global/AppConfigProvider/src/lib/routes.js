/*
  DO NOT IMPORT PAGE COMPONENTS HERE: WILL CAUSE CYCLIC LOOPS
  note: consumed by <AppRoot>
 */
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
      title: 'Kammy Admin - Players',
      description: 'Kammy : Fantasy Football',
    },
    label: 'Players',
    requiresAuthentication: false,
    component: 'PlayersPage',
    template: 'default',
  },
  {
    name: 'teams',
    exact: true,
    path: '/teams/',
    meta: {
      title: 'Kammy Admin - Teams',
      description: 'Kammy : Fantasy Football',
    },
    label: 'Teams',
    requiresAuthentication: false,
    component: 'TeamsPage',
    template: 'default',
  },
  {
    name: 'transfers',
    exact: true,
    path: '/transfers/',
    meta: {
      title: 'Kammy Admin - Transfers',
      description: 'Kammy : Fantasy Football',
    },
    label: 'Transfers',
    requiresAuthentication: false,
    component: 'TransfersPage',
    template: 'default',
  },
  // {
  //   name: 'premiership-table',
  //   exact: true,
  //   path: '/premiership/table',
  //   meta: {
  //     title: 'Kammy - Premiership Table',
  //     description: 'Kammy : Fantasy Football',
  //   },
  //   label: 'Table',
  //   requiresAuthentication: false,
  //   component: 'PremiershipTablePage',
  //   template: 'default',
  // },
];
