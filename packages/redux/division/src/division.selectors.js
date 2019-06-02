import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';

import formatDiv from './format-division';

const currentTeamSelector = (state, div) => get(state, `division.${formatDiv(div)}.currentTeams`) || {};
const pendingTransfersSelector = (state, div) => get(state, `division.${formatDiv(div)}.pendingTransfers`) || [];
const statusSelector = (state, div) => get(state, `division.${formatDiv(div)}.status`) || {};

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
      [player.manager]: prev[player.manager] ? [...prev[player.manager], player] : [player],
    }), {}),
    count: players.length,
  }),
);


export const getPendingTransfers = createSelector(
  pendingTransfersSelector,
  (transfers = []) => ({
    data: transfers.reduce((prev, transfer) => ({
      ...prev,
      [transfer.manager]: prev[transfer.manager] ? [...prev[transfer.manager], transfer] : [transfer],
    }), {}),
    count: transfers.length,
  }),
);
