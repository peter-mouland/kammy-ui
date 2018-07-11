import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '@kammy-ui/redux-store';

import Root from './app/Root';

const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line

try {
  ReactDOM.render(<Root store={store}/>, document.getElementById('react-app'));
} catch (err) {
  console.log('Render error', err); // eslint-disable-line no-console
}
