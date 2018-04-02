import React from 'react';
import { storiesOf } from '@storybook/react';
import AuthProvider from '@kammy/auth-provider';

import ChangePasswordForm from './src/ChangePasswordForm';

storiesOf('Authentication', module)
  .add('ChangePasswordForm', () => (
    <AuthProvider cookieToken={'demo-token'}>
      <ChangePasswordForm />
    </AuthProvider>
  ));
