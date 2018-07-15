import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '@kammy-ui/redux-store';
import Root from '@kammy-ui/app-root';

const reducer = require('./config/reducers').default;
const routesConfig = require('./config/routes.config').default;

const store = configureStore(window.__INITIAL_STATE__, reducer); // eslint-disable-line

try {
  ReactDOM.render(<Root store={store} routesConfig={routesConfig} />, document.getElementById('html'));
} catch (err) {
  console.log('Render error', err); // eslint-disable-line no-console
}
