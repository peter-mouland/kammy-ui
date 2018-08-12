import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip, Legend,
} from 'recharts';

import getDivisionPoints from '../lib/calculate-division-points';
import getDivisionRank from '../lib/calculate-division-rank';

const strokes = [
  '#8884d8',
  '#82ca9d',
  '#911a1c',
  '#377eb8',
  '#4daf4a',
  '#984ea3',
  '#ff8f00',
  '#a65628',
  '#f781bf',
];

const makeLineChartData = (teams, gameWeeks, managersSeason) => (
  gameWeeks.map(({ gameWeek }, i) => {
    const points = getDivisionPoints(teams, managersSeason, i);
    const rank = getDivisionRank(points);
    return {
      gameWeek: `gw${gameWeek}`,
      ...rank.total,
    };
  })
);

const Chart = ({ teams, gameWeeks, managersSeason }) => {
  const data = makeLineChartData(teams, gameWeeks, managersSeason);
  return (
    <LineChart width={800} height={300} data={data} style={{ margin: '0 auto' }}>
      <Legend verticalAlign="bottom" width={800} height={30}/>
      {Object.keys(managersSeason).map((manager, i) => (
        <Line key={manager} type="monotone" dataKey={manager} stroke={strokes[i]} />
      ))}
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="gameWeek" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

Chart.propTypes = {
  gameWeeks: PropTypes.array.isRequired,
  teams: PropTypes.array.isRequired,
  managersSeason: PropTypes.object.isRequired,
};

export default Chart;
