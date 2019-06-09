/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import StaticRouter from 'react-router-dom/StaticRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import loadable from '@loadable/component';

import DefaultTemplate from '@kammy-ui/default-template';
import AppConfigProvider from '@kammy-ui/app-config-provider';
import bemHelper from '@kammy-ui/bem';

const navigator = global.navigator && global.navigator.userAgent;
export const isBrowser = typeof navigator !== 'undefined' && navigator.indexOf('jsdom/') === -1 && navigator.indexOf('Node.js') === -1;
export const Router = isBrowser ? BrowserRouter : StaticRouter;

export const Routes = ({ ...props }, { appConfig }) => (
  <Router {...props} >
    <Switch>
      {appConfig.routes.map(({
        name, component, props: componentProps, id, ...routeProps
      }) => (
        <Route key={name} {...routeProps} render={(matchProps) => {
          const Component = loadable(() => import(`../dynamic-pages/${component}`));
          const bem = bemHelper({ block: id || name });
          return (
            <DefaultTemplate>
              <section id={id} className={bem()}>
                <Component {...matchProps} {...componentProps} />
              </section>
            </DefaultTemplate>
          );
        }}/>
      ))}
    </Switch>
  </Router>
);

Routes.contextTypes = {
  appConfig: PropTypes.object,
};

const AppRoot = ({ store, ...props }) => (
  <Provider store={store}>
    <AppConfigProvider>
      <CookiesProvider>
        <Routes { ...props } />
      </CookiesProvider>
    </AppConfigProvider>
  </Provider>
);

export default AppRoot;
