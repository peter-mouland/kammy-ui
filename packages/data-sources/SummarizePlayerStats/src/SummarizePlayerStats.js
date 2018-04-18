import jsonQuery from 'json-query';

import dataMap from './data-map';

const emptyStats = Array.from(Array(26), () => 0);

const totalUpStats = (stats) => stats.reduce((prev, curr) => (
  curr.stats.map((stat, index) => stat + prev[index])
), emptyStats);

const getStatsWithinTimeFrame = (data, { start, end }) => (
  jsonQuery('fixtures[*status!=PENDING][*:date]', {
    data,
    locals: {
      date(item) {
        const fixtureDate = new Date(item.date);
        return fixtureDate <= end && fixtureDate >= start;
      },
    },
  })
);

const summarizePlayerStats = ({ data, start, end }) => {
  const playerFixtures = getStatsWithinTimeFrame(data, { start, end });
  const summaryArray = totalUpStats(playerFixtures.value);
  const fixturesWithinTeam = playerFixtures.value;
  const summary = dataMap(summaryArray);
  return { ...data, fixturesWithinTeam, summary };
};

export default summarizePlayerStats;
