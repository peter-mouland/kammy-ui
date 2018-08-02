import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import configureStore from '@kammy-ui/redux-store';
import AppConfigProvider from '@kammy-ui/app-config-provider';

import reducer from './src/lib/reducer';
import DivisionRankings from './src/DivisionRankings.container';
import Component from './src/DivisionRankings.table';

const gameWeeks = require('./test-fixtures/gameweeks.json');
const managersSeason = require('./test-fixtures/manager-season.json');

/**
 * REDUX SETUP
 */
const preloadedState = { };
const store = configureStore(preloadedState, combineReducers(reducer));
const teams = { Olly: 'Manager details', Nick: 'Manager details' };

storiesOf('Components/DivisionRankings', module)
  .addDecorator(withKnobs)
  .add('Premier League (connected)', () => (
    <Provider store={store}>
      <AppConfigProvider>
        <DivisionRankings
          divisionId={'premiership'}
          label={text('label', 'Premiership')}
        />
      </AppConfigProvider>
    </Provider>
  ))
  .add('Premier League (Table with fixtures)', () => (
    <Component
      gameWeeks={gameWeeks}
      teams={teams}
      managersSeason={managersSeason}
    />
  ));
