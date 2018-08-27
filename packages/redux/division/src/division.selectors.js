import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';

const currentTeamSelector = (state, division) => get(state, `division.${division}.players`) || [];
const statusSelector = (state, division) => get(state, `division.${division}.status`) || {};

export const getStatus = createSelector(
  statusSelector,
  (status) => status,
);

export const getCurrentPlayers = createSelector(
  currentTeamSelector,
  (players) => ({
    data: players,
    byName: players.reduce((prev, player) => ({
      ...prev,
      [player.name]: player,
    }), {}),
    count: players.length,
  }),
);

export const getCurrentTeams = createSelector(
  currentTeamSelector,
  (players) => ({
    data: players.reduce((prev, player) => ({
      ...prev,
      [player.manager]: [...prev[player.manager], player],
    }), {}),
    count: players.length,
  }),
);
