/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import StaticRouter from 'react-router-dom/StaticRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { Provider } from 'react-redux';

import DefaultTemplate from '@kammy-ui/default-template';
import AppConfigProvider from '@kammy-ui/app-config-provider';
import RulesPage from '@kammy-ui/rules-page';
import PlayersPage from '@kammy-ui/players-page';
import TeamsPage from '@kammy-ui/teams-page';
import PremiershipTable from '@kammy-ui/premiership-table';
import ChampionshipTable from '@kammy-ui/championship-table';
import LeagueOneTable from '@kammy-ui/league-one-table';
import TransfersPage from '@kammy-ui/transfers-page';

// todo import pages dynamically
const pages = {
  RulesPage, PlayersPage, TeamsPage, TransfersPage, PremiershipTable, ChampionshipTable, LeagueOneTable,
};

const navigator = global.navigator && global.navigator.userAgent;
// hasWindow = true for tests + client
export const hasWindow = typeof window !== 'undefined';
// isBrowser = true for client only
export const isBrowser = typeof navigator !== 'undefined' && navigator.indexOf('jsdom/') === -1 && navigator.indexOf('Node.js') === -1;
export const Router = isBrowser ? BrowserRouter : StaticRouter;

export const Routes = ({ ...props }, { appConfig }) => (
  <Router {...props} >
    <Switch>
      {appConfig.routes.map(({ name, component, ...routeProps }) => (
        <Route key={name} {...routeProps} render={(matchProps) => {
          const Component = pages[component];
          return (
            <DefaultTemplate>
              <Component {...matchProps} />
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
      <Routes { ...props } />
    </AppConfigProvider>
  </Provider>
);

export default AppRoot;