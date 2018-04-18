import React from 'react';
import { storiesOf } from '@storybook/react';

import SkyPlayers from './src/index';

/**
 * STORIES
 */
storiesOf('Data Sources', module)
  .add('Sky Players', () => (
    <SkyPlayers />
  ));
