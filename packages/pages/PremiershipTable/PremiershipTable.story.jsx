import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import configureStore from '@kammy-ui/redux-store';
import AppConfigProvider from '@kammy-ui/app-config-provider';

import { reducer as skySportsReducer } from '@kammy-ui/redux-skysports';
import { reducer as spreadsheetReducer } from '@kammy-ui/redux-spreadsheet';
import { reducer as dbReducer } from '@kammy-ui/redux-players';

import PremiershipTable from './src/PremiershipTable';

const reducer = {
  skySports: skySportsReducer,
  spreadsheet: spreadsheetReducer,
  players: dbReducer,
};

/**
 * REDUX SETUP
 */
const preloadedState = { };
const store = configureStore(preloadedState, combineReducers(reducer));

storiesOf('Pages', module)
  .add('PremiershipTable', () => (
    <Provider store={store}>
      <AppConfigProvider>
        <PremiershipTable />
      </AppConfigProvider>
    </Provider>
  ));
