import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import configureStore from '@kammy-ui/redux-store';

import reducer from './src/lib/reducer';
import GameWeekSwitcher from './src/GameWeekSwitcher.container';

/**
 * REDUX SETUP
 */
const preloadedState = { };
const store = configureStore(preloadedState, combineReducers(reducer));

storiesOf('Components/GameWeekSwitcher', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <Provider store={store}>
      <GameWeekSwitcher />
    </Provider>
  ));
