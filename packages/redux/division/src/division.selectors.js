import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';

const gameWeeksSelector = (state) => get(state, 'division') || {};
const statusSelector = (state) => get(state, 'division.status') || {};

export const getStatus = createSelector(
  statusSelector,
  ({
    loading, loaded, errors,
  }) => ({
    loading,
    loaded,
    errors,
  }),
);

export const getData = createSelector(
  gameWeeksSelector,
  ({ data = [], ...other }) => {
    console.log({ data, ...other });
    // todo: fetch transfers for league one and create Team Selector
    return {
      data,
      count: data.length,
    };
  },
);
