import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip, Legend,
} from 'recharts';

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

const Chart = ({ data, xAxis, lines }) => (
  <LineChart width={800} height={300} data={data} style={{ margin: '0 auto' }}>
    <Legend verticalAlign="bottom" width={800} height={30} />
    {lines
      .map((line, i) => (
        <Line key={line} type="monotone" dataKey={line} stroke={strokes[i]} />
      ))
    }
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey={xAxis} />
    <YAxis />
    <Tooltip />
  </LineChart>
);

Chart.propTypes = {
  xAxis: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  lines: PropTypes.array.isRequired,
};

export default Chart;
