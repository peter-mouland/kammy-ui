import React from 'react';
import { storiesOf } from '@storybook/react';

import NotFound from './src/NotFound';

storiesOf('Components', module)
  .add('NotFound', () => (
    <NotFound />
  ));
