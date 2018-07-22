import RulesPage from '@kammy-ui/rules-page';
import PlayersPage from '@kammy-ui/players-page';

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
    Component: RulesPage,
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
    Component: PlayersPage,
    template: 'default',
  },
];
