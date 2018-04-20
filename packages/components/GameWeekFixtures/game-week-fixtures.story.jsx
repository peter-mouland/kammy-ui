import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { text, array, object } from '@storybook/addon-knobs';
import { reducer } from '@kammy-ui/redux-players';
import configureStore from '@kammy-ui/redux-store';

import { fixtures } from './fixtures/game-week-fixtures.json';
import GameWeekFixturesComponent from './src/GameWeekFixtures.table';

/**
 * REDUX SETUP
 */
// const preloadedState = { };
// const rootReducer = combineReducers({ players: reducer });
// const store = configureStore(preloadedState, rootReducer);

/**
 * STORIES
 */
storiesOf('Components/GameWeekFixtures', module)
  .add('Component', () => (
    <GameWeekFixturesComponent
      fixtures={array('fixtures', fixtures)}
    />
  ))
  // .add('Container', () => (
  //   <Provider store={store}>
  //     <ClubFixtures
  //       showFixtures={text('showFixtures', '3277')}
  //     />
  //   </Provider>
  // ));
