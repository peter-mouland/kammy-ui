import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { array } from '@storybook/addon-knobs';
import configureStore from '@kammy-ui/redux-store';
import { reducer } from '@kammy-ui/redux-players';

import fixtures from './players-table.fixtures.json';
import Players from './src/Players';
import PlayersContainer from './src/Players.container';

const visibleStats = ['apps', 'subs', 'gls', 'asts', 'cs', 'con', 'pensv', 'tb', 'sb', 'ycard', 'rcard', 'points'];
const positions = ['GK', 'CB', 'FB', 'MID', 'AM', 'STR', 'SUB'];

/**
 * REDUX SETUP
 */
const preloadedState = { };
const rootReducer = combineReducers({ players: reducer });
const store = configureStore(preloadedState, rootReducer);

/**
 * STORIES
 */
storiesOf('Components/PlayersTable', module)
  .add('Component', () => (
    <Players
      players={fixtures.players}
      visibleStats={array('visibleStats', visibleStats)}
      positions={positions}
      loading={false}
    />
  ))
  .add('todo: Container', () => (
    <Provider store={store}>
      <PlayersContainer
        visibleStats={array('visibleStats', visibleStats)}
        positions={positions}
      />
    </Provider>
  ));
