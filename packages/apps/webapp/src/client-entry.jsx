import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '@kammy-ui/redux-store';
import Root from '@kammy-ui/app-root';

const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line
const routesConfig = require('./config/routes.config');

try {
  ReactDOM.render(<Root store={store} routesConfig={routesConfig} />, document.getElementById('react-app'));
} catch (err) {
  console.log('Render error', err); // eslint-disable-line no-console
}
