import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';

import formatDivision from './format-division';

const currentTeamSelector = (state, division) => get(state, `division.${formatDivision(division)}.currentTeams`) || {};
const statusSelector = (state, division) => get(state, `division.${formatDivision(division)}.status`) || {};

export const getStatus = createSelector(
  statusSelector,
  (status) => status,
);

export const getCurrentPlayers = createSelector(
  currentTeamSelector,
  ({ players = [] }) => ({
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
  ({ players = [] }) => ({
    data: players.reduce((prev, player) => ({
      ...prev,
      [player.manager]: [...prev[player.manager] || {}, player],
    }), {}),
    count: players.length,
  }),
);
