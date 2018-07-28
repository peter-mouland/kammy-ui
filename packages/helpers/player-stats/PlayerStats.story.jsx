import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';

import degea from './fixtures/player-stats-1002.json';

import PlayerStats from './src/index';

const stories = storiesOf('Helpers', module);

degea.pos = 'GK';

stories.add('PlayerStats', () => (
  <PlayerStats
    gameWeeks={object('gameWeeks', [
      {
        gameWeek: 1, start: new Date('2018-01-01 16:00:00'), end: new Date('2018-04-01 16:00:00'),
      },
      {
        gameWeek: 2, start: new Date('2018-04-02 10:00:00'), end: new Date('2018-04-08 16:00:00'),
      },
    ])}
    data={degea}
  >
    {(player) => (
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
