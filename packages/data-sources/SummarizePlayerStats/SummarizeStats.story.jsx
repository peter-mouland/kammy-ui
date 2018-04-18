import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { date } from '@storybook/addon-knobs';

import degea from './fixtures/player-stats-1002.json';

import SummarizePlayerStats from './src/index';

const stories = storiesOf('Data Sources', module);

const start = new Date('2018-01-01 16:00:00');
const end = new Date('2018-04-01 16:00:00');

stories.add('SummarizePlayerStats', () => (
  <SummarizePlayerStats
    start={date('start', start)}
    end={date('end', end)}
    data={degea}
  >
    {(data) => (
      <Fragment>
        <h2>Stats Summary</h2>
        <pre>{JSON.stringify(data.stats.summary, null, 2)}</pre>
        <hr />
        <h2>All Stats</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Fragment>
    )}
  </SummarizePlayerStats>
));
