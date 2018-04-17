import React from 'react';
import { storiesOf } from '@storybook/react';

import JsonQuery from './src/index';

const stories = storiesOf('Data', module);

stories.add('jsonQuery', () => (
  <JsonQuery />
));
