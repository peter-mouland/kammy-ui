import React from 'react';
import { storiesOf } from '@storybook/react';
import { AuthProvider } from '@kammy/auth-provider';

import ChangePassword from './src/ChangePassword';

storiesOf('Authentication', module)
  .add('ChangePassword', () => (
    <AuthProvider cookieToken={'demo-token'}>
      <ChangePassword />
    </AuthProvider>
  ));
