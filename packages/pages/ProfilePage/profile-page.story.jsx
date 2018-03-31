import React from 'react';
import { storiesOf } from '@storybook/react';

import ProfilePage from './src/ProfilePage';

storiesOf('Pages', module)
  .add('ProfilePage', () => (
    <ProfilePage />
  ));
