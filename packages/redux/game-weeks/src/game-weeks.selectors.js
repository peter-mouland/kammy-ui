import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';

const gameWeeksSelector = (state) => get(state, 'gameWeeks') || {};
const statusSelector = (state) => get(state, 'gameWeeks.status') || {};

export const getStatus = createSelector(
  statusSelector,
  ({ loading, loaded, errors }) => ({
    loading,
    loaded,
    errors,
  }),
);

export const getData = createSelector(
  gameWeeksSelector,
  ({ data = [], selectedGameWeek }) => {
    const currentGameWeekIndex = (data.findIndex((gw) => (
      new Date() < new Date(gw.end) && new Date() > new Date(gw.start)
    )));
    const currentGameWeek = currentGameWeekIndex < 1 ? 1 : currentGameWeekIndex + 1;
    return {
      data,
      selectedGameWeek: selectedGameWeek || currentGameWeek,
      currentGameWeek,
      count: data.length,
    };
  },
);
