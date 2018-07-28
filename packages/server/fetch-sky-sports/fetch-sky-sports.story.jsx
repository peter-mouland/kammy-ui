import React from 'react';
import { storiesOf } from '@storybook/react';

import SkyPlayers from './SkySports';

storiesOf('Server', module)
  .add('Sky Players', () => (
    <SkyPlayers />
  ));
