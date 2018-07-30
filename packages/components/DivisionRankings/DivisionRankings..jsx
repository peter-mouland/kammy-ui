import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import configureStore from '@kammy-ui/redux-store';
import AppConfigProvider from '@kammy-ui/app-config-provider';

import reducer from './src/lib/reducer';
import DivisionRankings from './src/DivisionRankings.container';

/**
 * REDUX SETUP
 */
const preloadedState = { };
const store = configureStore(preloadedState, combineReducers(reducer));

storiesOf('Components/DivisionRankings', module)
  .addDecorator(withKnobs)
  .add('premiership', () => (
    <Provider store={store}>
      <AppConfigProvider>
        <DivisionRankings
          divisionId={'premiership'}
          label={text('label', 'Premiership')}
        />
      </AppConfigProvider>
    </Provider>
  ));
