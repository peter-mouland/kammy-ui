import React from 'react';
import { storiesOf } from '@storybook/react';

import AddDivisions from './src/AddDivisions';

storiesOf('Components', module)
  .add('AddDivisions', () => (
    <AddDivisions />
  ));
