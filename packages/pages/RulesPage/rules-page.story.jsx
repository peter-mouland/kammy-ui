import React from 'react';
import { storiesOf } from '@storybook/react';

import RulesPage from './src/RulesPage';

storiesOf('Pages', module)
  .add('RulesPage', () => (
    <RulesPage />
  ));
