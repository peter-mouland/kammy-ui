import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import BrowserRouter from 'react-router-dom/BrowserRouter';

import AppConfigProvider from '@kammy-ui/app-config-provider';

import NamedLink from './src/NamedLink';

storiesOf('Components', module)
  .add('NamedLink', () => (
    <AppConfigProvider>
      <BrowserRouter>
        <NamedLink to={text('to', 'homepage')} />
      </BrowserRouter>
    </AppConfigProvider>
  ));
