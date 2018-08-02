import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import configureStore from '@kammy-ui/redux-store';
import AppConfigProvider from '@kammy-ui/app-config-provider';

import reducer from './src/lib/reducer';
import DivisionRankings from './src/DivisionRankings.container';
import Component from './src/DivisionRankings';

const gameWeeks = require('./test-fixtures/gameweeks.json');
const managersSeason = require('./test-fixtures/manager-season.json');

/**
 * REDUX SETUP
 */
const preloadedState = { };
const store = configureStore(preloadedState, combineReducers(reducer));
const teams = { Olly: 'Manager details', Nick: 'Manager details', Pete: 'Manager details' };

storiesOf('Components/DivisionRankings', module)
  .addDecorator(withKnobs)
  .add('Premier League (connected)', () => (
    <Provider store={store}>
      <AppConfigProvider>
        <DivisionRankings
          divisionId={'premierLeague'}
          label={text('label', 'Premier League')}
        />
      </AppConfigProvider>
    </Provider>
  ))
  .add('Premier League (Table with fixtures)', () => (
    <Component
      loaded={true}
      label={'Demo'}
      gameWeeks={gameWeeks}
      teams={teams}
      managersSeason={managersSeason}
      divisionId={'premierLeague'}
      fetchDbPlayers={() => {}}
      fetchDivision={() => {}}
      fetchTransfers={() => {}}
      fetchGameWeeks={() => {}}
      playersLoaded={true}
      divisionLoaded={true}
      transfersLoaded={true}
      gameWeeksLoaded={true}
    />
  ));
