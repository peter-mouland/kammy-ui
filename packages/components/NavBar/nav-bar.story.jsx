import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { storiesOf } from '@storybook/react';
import AppConfigProvider from '@kammy-ui/app-config-provider';

import NavBar from './src/NavBar';

storiesOf('Components', module)
  .add('NavBar', () => (
    <AppConfigProvider>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </AppConfigProvider>
  ));
