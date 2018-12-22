import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';

const playersSelector = (state) => get(state, 'players.players') || {};

const fixturesSelector = (state) => get(state, 'players.playerFixtures') || {};

const allDataSelector = (state) => get(state, 'players.allPlayersData') || {};

export const getPlayers = createSelector(
  playersSelector,
  ({
    data, count, errors, loaded, loading,
  }) => ({
    data, playersArray: Object.values(data || {}), count, errors, loaded, loading,
  }),
);

export const getFixtures = createSelector(
  fixturesSelector,
  ({
    data, count, errors, loaded, loading,
  }) => ({
    data, count, errors, loaded, loading,
  }),
);


export const getAllPlayerData = createSelector(
  allDataSelector,
  ({
    data, count, errors, loaded, loading,
  }) => ({
    data, playersArray: Object.values(data || {}), count, errors, loaded, loading,
  }),
);
