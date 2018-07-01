import React from 'react';
import { storiesOf } from '@storybook/react';

import degea from './fixtures/player-stats-1002.json';

const stories = storiesOf('Data-Helpers', module);

degea.pos = 'GK';

stories.add('TeamSeason', () => (
  <div>
    Pete
  </div>
));
