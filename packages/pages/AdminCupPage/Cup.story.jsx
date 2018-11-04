import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import configureStore from '@kammy-ui/redux-store';
import AppConfigProvider from '@kammy-ui/app-config-provider';

import reducer from './src/lib/reducer';
import Cup from './src/index';

/**
 * REDUX SETUP
 */
const preloadedState = { };
const store = configureStore(preloadedState, combineReducers(reducer));

storiesOf('Components/Cup', module)
  .addDecorator(withKnobs)
  .add('current', () => (
    <Provider store={store}>
      <AppConfigProvider>
        <Cup />
      </AppConfigProvider>
    </Provider>
  ));
