/* eslint-disable react/prop-types */
import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import StaticRouter from 'react-router-dom/StaticRouter';
import { Provider } from 'react-redux';

import makeRoutes from './routes';
import { isBrowser } from './utils';

export const Router = isBrowser ? BrowserRouter : StaticRouter;

const Root = ({ store, ...props }) => (
  <Provider store={store}>
    <Router {...props} >
      {makeRoutes()}
    </Router>
  </Provider>
);

export default Root;
