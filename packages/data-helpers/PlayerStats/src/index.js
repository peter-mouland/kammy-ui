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

export const calculatePoints = calculateTotalPoints;

export const playerStats = ({ data, gameWeeks }) => {
  if (!data) return {};
  const playerFixtures = getStatsWithinTimeFrame(data, gameWeeks);
  const summaryArray = totalUpStats(playerFixtures.value);
  const fixturesWithinTeam = playerFixtures.value;
  const gameWeekStats = extractFFStats(summaryArray);

  // not needed when looking at team scores
  const seasonStats = data.stats
    ? extractFFStats(data.stats.season)
    : {};
  const points = calculateTotalPoints({ stats: gameWeekStats, pos: data.pos });
  return {
    ...data, fixturesWithinTeam, gameWeekStats, seasonStats, points,
  };
};

export default ({ children, gameWeeks, data }) => (
  children(playerStats({ data, gameWeeks }))
);
