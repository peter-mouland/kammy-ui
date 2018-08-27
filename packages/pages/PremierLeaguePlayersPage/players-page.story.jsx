import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import configureStore from '@kammy-ui/redux-store';

import reducer from './src/lib/reducer';
import PlayersPage from './src/PremierLeaguePlayersPage.container';

/**
 * REDUX SETUP
 */
const preloadedState = { };
const store = configureStore(preloadedState, combineReducers(reducer));

storiesOf('Pages/Premier League', module)
  .add('Players Page', () => (
    <Provider store={store}>
      <PlayersPage />
    </Provider>
  ));
