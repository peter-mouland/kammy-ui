/* eslint-disable react/prop-types */
import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import StaticRouter from 'react-router-dom/StaticRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { Provider } from 'react-redux';

const navigator = global.navigator && global.navigator.userAgent;
// hasWindow = true for tests + client
export const hasWindow = typeof window !== 'undefined';
// isBrowser = true for client only
export const isBrowser = typeof navigator !== 'undefined' && navigator.indexOf('jsdom/') === -1 && navigator.indexOf('Node.js') === -1;
export const Router = isBrowser ? BrowserRouter : StaticRouter;

const AppRoot = ({ store, routesConfig, ...props }) => (
  <Provider store={store}>
    <Router {...props} >
      <Switch>
        {routesConfig.map(({ name, Component, ...routeProps }) => (
          <Route key={name} {...routeProps} render={(matchProps) => (
            <Component {...matchProps} />
          )}/>
        ))}
      </Switch>
    </Router>
  </Provider>
);

export default AppRoot;
