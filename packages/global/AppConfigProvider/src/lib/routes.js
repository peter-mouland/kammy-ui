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
    path: '/admin/players/',
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
    name: 'transfers',
    exact: true,
    path: '/admin/transfers/',
    meta: {
      title: 'Kammy Admin - Transfers',
      description: 'Kammy : Fantasy Football',
    },
    label: 'Transfers',
    requiresAuthentication: false,
    component: 'TransfersPage',
    template: 'default',
  },
  {
    name: 'premierLeague-teams',
    exact: true,
    path: '/premier-league/teams',
    meta: {
      title: 'Kammy - Premier League Teams',
      description: 'Kammy : Fantasy Football',
    },
    label: 'Teams',
    requiresAuthentication: false,
    component: 'PremierLeagueTeams',
    template: 'default',
  },
  {
    name: 'premierLeague-rankings',
    exact: true,
    path: '/premier-league/rankings',
    meta: {
      title: 'Kammy - Premier League Rankings',
      description: 'Kammy : Fantasy Football',
    },
    label: 'League Table',
    requiresAuthentication: false,
    component: 'PremierLeagueRankings',
    template: 'default',
  },
  {
    name: 'championship-teams',
    exact: true,
    path: '/championship/teams',
    meta: {
      title: 'Kammy - Championship Teams',
      description: 'Kammy : Fantasy Football',
    },
    label: 'Teams',
    requiresAuthentication: false,
    component: 'ChampionshipTeams',
    template: 'default',
  },
  {
    name: 'championship-rankings',
    exact: true,
    path: '/championship/rankings',
    meta: {
      title: 'Kammy - Championship Rankings',
      description: 'Kammy : Fantasy Football',
    },
    label: 'League Table',
    requiresAuthentication: false,
    component: 'ChampionshipRankings',
    template: 'default',
  },
  {
    name: 'leagueOne-teams',
    exact: true,
    path: '/league-one/teams',
    meta: {
      title: 'Kammy - League One Teams',
      description: 'Kammy : Fantasy Football',
    },
    label: 'Teams',
    requiresAuthentication: false,
    component: 'LeagueOneTeams',
    template: 'default',
  },
  {
    name: 'leagueOne-rankings',
    exact: true,
    path: '/league-one/rankings',
    meta: {
      title: 'Kammy - League One Rankings',
      description: 'Kammy : Fantasy Football',
    },
    label: 'League Table',
    requiresAuthentication: false,
    component: 'LeagueOneRankings',
    template: 'default',
  },
];
