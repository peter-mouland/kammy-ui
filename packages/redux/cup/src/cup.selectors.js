import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';

const cupSelector = (state) => get(state, 'cup') || [];
const cupTeamSelector = (state) => get(state, 'cup.teams') || [];
const statusSelector = (state) => get(state, 'cup.status') || {};

export const getStatus = createSelector(
  statusSelector,
  (status) => status,
);

export const getTeams = createSelector(
  cupTeamSelector,
  (teams) => ({
    data: teams,
    count: teams.length,
  }),
);
export const getCupMetaData = createSelector(
  cupSelector,
  (cup) => ({
    managers: cup.managers,
    groups: cup.groups,
    rounds: cup.rounds,
  }),
);

export const cupGroups = createSelector(
  cupTeamSelector,
  (teams) => ({
    data: teams.reduce((prev, team) => ({
      ...prev,
      [team.group]: [
        ...prev[team.group] || [],
        team,
      ],
    }), {}),
    count: teams.length,
  }),
);
