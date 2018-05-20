import jsonQuery from 'json-query';

import extractFFStats from './extract-ff-stats';
import { calculateTotalPoints } from './calculatePoints';

const emptyStats = Array.from(Array(26), () => 0);

const totalUpStats = (stats) => stats.reduce((prev, curr) => (
  curr.stats.map((stat, index) => stat + prev[index])
), emptyStats);

const getStatsWithinTimeFrame = (data, gameWeeks) => (
  jsonQuery('fixtures[*status!=PENDING][*:date]', {
    data,
    locals: {
      date(item) {
        const fixtureDate = new Date(item.date);
        const inGameWeeks = gameWeeks.reduce((prev, gameWeek) => (
          prev || (fixtureDate <= new Date(gameWeek.end) && fixtureDate >= new Date(gameWeek.start))
        ), false);
        return inGameWeeks;
      },
    },
  })
);

const fixturesWithStats = (fixtures, position) => (
  fixtures.map((fixture) => ({
    ...fixture,
    stats: calculateTotalPoints({ stats: extractFFStats(fixture.stats), pos: position }),
  }))
);

export const calculatePoints = calculateTotalPoints;

export const playerStats = ({ data, gameWeeks }) => {
  if (!data) return {};
  const playerFixtures = getStatsWithinTimeFrame(data, gameWeeks);
  const summaryArray = totalUpStats(playerFixtures.value);
  const fixturesWithinTeam = fixturesWithStats(playerFixtures.value, data.pos);
  const gameWeekStats = extractFFStats(summaryArray);
  const points = calculateTotalPoints({ stats: gameWeekStats, pos: data.pos });
  return {
    ...data, fixturesWithinTeam, gameWeekStats, points,
  };
};

export default ({ children, gameWeeks, data }) => (
  children(playerStats({ data, gameWeeks }))
);
