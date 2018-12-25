import jsonQuery from 'json-query';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';
import isEqual from 'date-fns/is_equal';

import extractFFStats from './extract-ff-stats';
import { calculateTotalPoints } from './calculatePoints';

const emptyStatsArray = Array.from(Array(26), () => 0);
const emptyStats = extractFFStats(emptyStatsArray);

// exported for tests
export const addPointsToFixtures = (fixture, pos) => {
  const stats = extractFFStats(fixture.stats || emptyStatsArray);
  return ({
    ...fixture,
    stats: {
      ...stats,
      points: calculateTotalPoints({ stats, pos }).total,
    },
  });
};

// exported for tests
export const totalUpStats = (fixtures) => (
  fixtures.reduce((totals, gw) => (
    Object.keys(totals).reduce((prev, stat) => ({
      ...prev,
      [stat]: (gw.stats[stat] || 0) + totals[stat],
    }), emptyStats)
  ), emptyStats)
);

// exported for tests
export const getGameWeekFixtures = (player, gameWeeks) => (
  jsonQuery('fixtures[*status!=PENDING][*:date]', {
    data: player,
    locals: {
      date(item) {
        const fixtureDate = item.date;
        return gameWeeks.reduce((prev, gameWeek) => {
          const beforeEnd = isBefore(fixtureDate, gameWeek.end) || isEqual(fixtureDate, gameWeek.end);
          const afterStart = isAfter(fixtureDate, gameWeek.start) || isEqual(fixtureDate, gameWeek.start);
          return (
            prev || (afterStart && beforeEnd)
          );
        }, false);
      },
    },
  }).value || []
);

export const calculatePoints = calculateTotalPoints;

export const playerStats = ({ player, gameWeeks }) => {
  if (!player) return {};
  const playerFixtures = getGameWeekFixtures(player, gameWeeks);
  const gameWeekFixtures = playerFixtures.map((fixture) => addPointsToFixtures(fixture, player.pos));
  const stats = totalUpStats(gameWeekFixtures);
  const gameWeekStats = {
    ...stats,
    points: calculateTotalPoints({ stats, pos: player.pos }).total,
  };
  const fixtures = player.fixtures.map((fixture) => addPointsToFixtures(fixture, player.pos));
  return {
    ...player, fixtures, gameWeekFixtures, gameWeekStats,
  };
};

export default ({ children, gameWeeks, player }) => (
  children(playerStats({ player, gameWeeks }))
);
