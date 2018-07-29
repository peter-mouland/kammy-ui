import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import configureStore from '@kammy-ui/redux-store';
import AppConfigProvider from '@kammy-ui/app-config-provider';

import reducer from './src/lib/reducer';
import DivisionTable from './src/DivisionTable.container';

/**
 * REDUX SETUP
 */
const preloadedState = { };
const store = configureStore(preloadedState, combineReducers(reducer));

storiesOf('Components/DivisionTable', module)
  .addDecorator(withKnobs)
  .add('premiership', () => (
    <Provider store={store}>
      <AppConfigProvider>
        <DivisionTable
          divisionId={'premiership'}
          label={text('label', 'Premiership')}
        />
      </AppConfigProvider>
    </Provider>
  ))
  .add('Championship', () => (
    <Provider store={store}>
      <AppConfigProvider>
        <DivisionTable
          divisionId={'championship'}
          label={text('label', 'Championship')}
        />
      </AppConfigProvider>
    </Provider>
  ))
  .add('League One', () => (
    <Provider store={store}>
      <AppConfigProvider>
        <DivisionTable
          divisionId={'leagueOne'}
          label={text('label', 'League One')}
        />
      </AppConfigProvider>
    </Provider>
  ));
