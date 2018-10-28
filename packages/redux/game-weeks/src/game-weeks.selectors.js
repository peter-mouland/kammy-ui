import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';

const selectedGameWeekSelector = (state) => get(state, 'gameWeeks.selectedGameWeek') || 0;
const gameWeeksSelector = (state) => get(state, 'gameWeeks.data.gameWeeks') || [];
const statusSelector = (state) => get(state, 'gameWeeks.status') || {};

export const getStatus = createSelector(
  statusSelector,
  ({ loading, loaded, errors }) => ({
    loading,
    loaded,
    errors,
  }),
);

export const getGameWeeks = createSelector(
  gameWeeksSelector,
  selectedGameWeekSelector,
  (gameWeeks, selectedGameWeek) => {
    const currentGameWeekIndex = (gameWeeks.findIndex((gw) => (
      new Date() < new Date(gw.end) && new Date() > new Date(gw.start)
    )));
    const currentGameWeek = currentGameWeekIndex < 1 ? 1 : currentGameWeekIndex + 1;
    return {
      gameWeeks,
      selectedGameWeek: selectedGameWeek || currentGameWeek,
      currentGameWeek,
      count: gameWeeks.length,
    };
  },
);
