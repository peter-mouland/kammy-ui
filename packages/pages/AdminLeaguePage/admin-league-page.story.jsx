import React from 'react';
import { storiesOf } from '@storybook/react';

import AdminLeaguePage from './src/AdminLeaguePage';

storiesOf('Pages', module)
  .add('AdminLeaguePage', () => (
    <AdminLeaguePage />
  ));
