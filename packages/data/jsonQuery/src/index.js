import React from 'react';
import jsonQuery from 'json-query';

// import hart from '../fixtures/player-stats-1001.json';
import dataMap from './data-map';
import degea from '../fixtures/player-stats-1002.json';

const emptyStats = Array.from(Array(26), () => 0);

const summariseStats = (stats) => stats.reduce((prev, curr) => (
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

const addSummaryToStats = ({ data, start, end }) => {
  const playerFixtures = getStatsWithinTimeFrame(data, { start, end });
  const statsWithinTeamArray = summariseStats(playerFixtures.value);
  const statsWithinTeam = dataMap(statsWithinTeamArray);
  const fixturesWithinTeam = playerFixtures.value;
  return { ...data, fixturesWithinTeam, statsWithinTeam };
};



const start = new Date('2018-01-01 16:00:00');
const end = new Date('2018-04-01 16:00:00');
const statsWithSummary = addSummaryToStats({ data: degea, start, end });

const show = () => (
  <pre>
    {JSON.stringify(statsWithSummary, null, 2)}
  </pre>
);

export default show;
