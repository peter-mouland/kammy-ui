import React from 'react';
import { storiesOf } from '@storybook/react';

import SkyPlayers from './SkySports';

storiesOf('Data Sources', module)
  .add('Sky Players', () => (
    <SkyPlayers />
  ));
