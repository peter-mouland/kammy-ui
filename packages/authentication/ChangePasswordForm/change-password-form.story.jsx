import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import ChangePasswordForm from './src/ChangePasswordForm';

storiesOf('Authentication', module)
  .add('ChangePasswordForm', () => (
    <ChangePasswordForm to={text('to', 'homepage')} />
  ));
