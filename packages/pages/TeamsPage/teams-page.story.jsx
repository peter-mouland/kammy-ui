import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import configureStore from '@kammy-ui/redux-store';
import AppConfigProvider from '@kammy-ui/app-config-provider';

import reducer from './src/lib/reducer';
import TeamsPage from './src/TeamsPage.container';

/**
 * REDUX SETUP
 */
const preloadedState = { };
const store = configureStore(preloadedState, combineReducers(reducer));

storiesOf('Pages', module)
  .add('TeamsPage', () => (
    <Provider store={store}>
      <AppConfigProvider>
        <TeamsPage />
      </AppConfigProvider>
    </Provider>
  ));
