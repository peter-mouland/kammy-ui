import { createSelector } from 'reselect';
import get from '@kammy-ui/helpers.get';
import toDate from '@kammy-ui/helpers-to-date';

const inDateRange = ({ start, end }, comparison) => (
  toDate(comparison) < toDate(end) && toDate(comparison) > toDate(start)
);

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
    const currentGameWeekIndex = gameWeeks.findIndex(({ start, end }) => inDateRange({ start, end }, new Date()));
    const currentGameWeek = currentGameWeekIndex < 1 ? 1 : currentGameWeekIndex + 1;
    return {
      gameWeeks,
      selectedGameWeek: selectedGameWeek || currentGameWeek,
      currentGameWeek,
      currentGameWeekDates: gameWeeks[currentGameWeek - 1],
      count: gameWeeks.length,
    };
  },
);

export const dateIsInCurrentGameWeek = createSelector(
  getGameWeeks,
  ({ currentGameWeekDates }) => (comparisonDate) => {
    try {
      return inDateRange(currentGameWeekDates, comparisonDate);
    } catch (e) {
      console.log('ERROR');
      console.log({ currentGameWeekDates, comparisonDate });
      return false;
    }
  },
);
