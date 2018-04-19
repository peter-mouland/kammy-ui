import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';

import GameWeeks from './src/GameWeeks';
import fixtures from './fixtures/fixtures.json';

storiesOf('Components', module)
  .add('GameWeeks', () => (
    <GameWeeks
      fixtures={fixtures}
      total={number('total', 38)}
    />
  ));
