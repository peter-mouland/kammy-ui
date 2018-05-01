import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import { reducer as spreadsheetReducer } from '@kammy-ui/redux-spreadsheet';
import { reducer as skySportsReducer } from '@kammy-ui/redux-skysports';
import { reducer as dbReducer } from '@kammy-ui/redux-players';
import configureStore from '@kammy-ui/redux-store';

import PlayersPage from './src/PlayersPage.container';

/**
 * REDUX SETUP
 */
const preloadedState = { };
const rootReducer = combineReducers({
  skySports: skySportsReducer,
  spreadsheet: spreadsheetReducer,
  players: dbReducer,
});
const store = configureStore(preloadedState, rootReducer);

storiesOf('Pages', module)
  .add('PlayersPage', () => (
    <Provider store={store}>
      <PlayersPage />
    </Provider>
  ));
