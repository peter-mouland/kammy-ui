import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';

import GameWeekCalendar from './src/GameWeekCalendar';
import fixtures from './fixtures/fixtures.json';

storiesOf('Components', module)
  .add('GameWeekCalendar', () => (
    <GameWeekCalendar
      fixtures={fixtures}
      gameWeeksCount={number('gameWeeksCount', 38)}
    />
  ));
