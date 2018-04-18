import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { date } from '@storybook/addon-knobs';

import degea from './fixtures/player-stats-1002.json';

import PlayerStats from './src/index';

const stories = storiesOf('Data Sources', module);

const start = new Date('2018-01-01 16:00:00');
const end = new Date('2018-04-01 16:00:00');
degea.pos = 'GK';

stories.add('PlayerStats', () => (
  <PlayerStats
    start={date('start', start)}
    end={date('end', end)}
    data={degea}
  >
    {(player) => console.log(player) || (
      <Fragment>
        <h2>Stats Summary</h2>
        <pre>{JSON.stringify(player.summary, null, 2)}</pre>
        <h2>Points Summary</h2>
        <pre>{JSON.stringify(player.points, null, 2)}</pre>
        <hr />
        <h2>Season Stats</h2>
        <pre>{JSON.stringify(player.seasonStats, null, 2)}</pre>
        <hr />
        <h2>All Stats</h2>
        <pre>{JSON.stringify(player, null, 2)}</pre>
      </Fragment>
    )}
  </PlayerStats>
));
