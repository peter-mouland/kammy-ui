import React from 'react';
import { storiesOf } from '@storybook/react';

import TeamsPage from './src/TeamsPage';

storiesOf('Pages', module)
  .add('TeamsPage', () => (
    <TeamsPage />
  ));
