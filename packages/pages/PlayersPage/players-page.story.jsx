import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import configureStore from '@kammy-ui/redux-store';

import reducer from './src/lib/reducer';
import PlayersPage from './src/PlayersPage.container';

/**
 * REDUX SETUP
 */
const preloadedState = { };
const store = configureStore(preloadedState, combineReducers(reducer));

storiesOf('Pages', module)
  .add('PlayersPage', () => (
    <Provider store={store}>
      <PlayersPage />
    </Provider>
  ));
