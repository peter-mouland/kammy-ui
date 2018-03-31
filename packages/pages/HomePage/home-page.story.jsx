import React from 'react';
import { storiesOf } from '@storybook/react';

import HomePage from './src/HomePage';

storiesOf('Pages', module)
  .add('HomePage', () => (
    <HomePage />
  ));
