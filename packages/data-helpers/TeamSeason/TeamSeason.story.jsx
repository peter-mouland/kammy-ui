import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';

import degea from './fixtures/player-stats-1002.json';

import TeamSeason from './src/index';

const stories = storiesOf('Data-Helpers', module);

degea.pos = 'GK';

stories.add('TeamSeason', () => (
  <div
  >
    Pete
  </div>
));
