import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from '@kammy-ui/redux-fixtures';
import configureStore from '@kammy-ui/redux-store';

import GameWeekList from './src/GameWeekList';

/**
 * REDUX SETUP
 */
const preloadedState = { };
const rootReducer = combineReducers({ fixtures: reducer });
const store = configureStore(preloadedState, rootReducer);


storiesOf('Components', module)
  .add('GameWeekList', () => (
    <Provider store={store}>
      <GameWeekList
        gameWeeksCount={number('gameWeeksCount', 38)}
      />
    </Provider>
  ));
