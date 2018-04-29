import React from 'react';
import { storiesOf } from '@storybook/react';

import Teams from './src/Teams';

storiesOf('Components', module)
  .add('Teams', () => (
    <Teams />
  ));
