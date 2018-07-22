import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '@kammy-ui/redux-store';
import Root from '@kammy-ui/app-root';

const reducer = require('./config/reducers').default;

const store = configureStore(window.__INITIAL_STATE__, reducer); // eslint-disable-line

const HmrContainer = (
  (process.env.NODE_ENV === 'development')
    ? require('react-hot-loader').AppContainer // eslint-disable-line
    : ({ children }) => (children)
);

const rootEl = document.getElementById('html');
const App = (
  <HmrContainer>
    <Root store={store} />
  </HmrContainer>
);

try {
  ReactDOM.render(App, rootEl);
  if (module.hot) {
    module.hot.accept('@kammy-ui/app-root', () => {
      const NextApp = require('@kammy-ui/app-root').default; // eslint-disable-line
      ReactDOM.render(
        <HmrContainer>
          <NextApp store={store} />
        </HmrContainer>,
        rootEl,
      );
    });
  }
} catch (err) {
  console.log('Render error', err); // eslint-disable-line no-console
}