import jsonQuery from 'json-query';

import extractFFStats from './extract-ff-stats';
import { calculateTotalPoints } from './calculatePoints';

const emptyStatsArray = Array.from(Array(26), () => 0);
const emptyStats = extractFFStats(emptyStatsArray);

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
export const getGameWeekFixtures = (data, gameWeeks) => (
  jsonQuery('fixtures[*status!=PENDING][*:date]:fixturesWithStats', {
    data,
    locals: {
      date(item) {
        const fixtureDate = new Date(item.date);
        return gameWeeks.reduce((prev, gameWeek) => (
          prev || (fixtureDate <= new Date(gameWeek.end) && fixtureDate >= new Date(gameWeek.start))
        ), false);
      },
      fixturesWithStats(fixtures) {
        return fixtures.map((fixture) => ({
          ...fixture,
          stats: extractFFStats(fixture.stats),
        }));
      },
    },
  })
);

export const calculatePoints = calculateTotalPoints;

export const playerStats = ({ data, gameWeeks }) => {
  if (!data) return {};
  const playerFixtures = getGameWeekFixtures(data, gameWeeks);
  const fixturesWithinTeam = playerFixtures.value.map((fixture) => ({
    ...fixture,
    stats: {
      ...fixture.stats,
      points: calculateTotalPoints({ stats: fixture.stats, pos: data.pos }).total,
    },
  }));
  const stats = totalUpStats(fixturesWithinTeam);
  const gameWeekStats = {
    ...stats,
    points: calculateTotalPoints({ stats, pos: data.pos }).total,
  };
  return {
    ...data, fixturesWithinTeam, gameWeekStats,
  };
};

export default ({ children, gameWeeks, data }) => (
  children(playerStats({ data, gameWeeks }))
);
