import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object } from '@storybook/addon-knobs';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from '@kammy-ui/redux-fixtures';
import configureStore from '@kammy-ui/redux-store';

import fixtures from './fixtures/game-week-fixtures.json';
import GameWeekFixturesComponent from './src/GameWeekFixtures.table';
import GameWeekFixturesContainer from './src/GameWeekFixtures.container';

/**
 * REDUX SETUP
 */
const preloadedState = { };
const rootReducer = combineReducers({ fixtures: reducer });
const store = configureStore(preloadedState, rootReducer);

/**
 * STORIES
 */
storiesOf('Components/GameWeekFixtures', module)
  .add('Component', () => (
    <GameWeekFixturesComponent
      fetchFixtures={() => {}}
      start={text('start', '2017-01-01')}
      end={text('end', '2019-01-01')}
      fixtures={object('fixtures', fixtures)}
    />
  ))
  .add('todo: Container', () => (
    <Provider store={store}>
      <GameWeekFixturesContainer
        start={text('start', '2017-01-01')}
        end={text('end', '2019-01-01')}
      />
    </Provider>
  ));
