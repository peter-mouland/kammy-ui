import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { text, array, object } from '@storybook/addon-knobs';
import { reducer } from '@kammy-ui/redux-players';
import configureStore from '@kammy-ui/redux-store';

import fixtures from './club-fixtures.json';
import ClubFixtures from './src/ClubFixtures.container';
import ClubFixturesTable from './src/ClubFixtures.table';
import ClubFixturesModal from './src/ClubFixtures.modal';

const data = { name: 'Courtois, Thibaut', club: 'Chelsea', code: '1058' };
const playerFixtures = {
  1058: {
    fixtures,
    ...data,
  },
};

/**
 * REDUX SETUP
 */
const preloadedState = { };
const rootReducer = combineReducers({ players: reducer });
const store = configureStore(preloadedState, rootReducer);

/**
 * STORIES
 */
storiesOf('Components/ClubFixtures', module)
  .add('Table component', () => (
    <ClubFixturesTable
      code={text('code', data.code)}
      club={text('club', data.club)}
      fixtures={array('fixtures', fixtures)}
    />
  ))
  .add('modal component', () => (
    <ClubFixturesModal
      showFixtures={text('showFixtures', '1058')}
      player={object('player', playerFixtures)}
    />
  ))
  .add('todo: Container', () => (
    <Provider store={store}>
      <ClubFixtures
        showFixtures={text('showFixtures', '3277')}
      />
    </Provider>
  ));
