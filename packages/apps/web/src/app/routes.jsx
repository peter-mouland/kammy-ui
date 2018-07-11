import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import RulesPage from '@kammy-ui/rules-page';

import routesConfig from './routes.config';

export const routesComponent = {
  rules: RulesPage,
};

export default function makeRoutes() {
  return (
    <Switch>
      {routesConfig.map(({ name, ...props }) => {
        const Component = routesComponent[name];
        return (
          <Route key={name} {...props} render={(matchProps) => (<Component {...matchProps} />)}/>
        );
      })}
    </Switch>
  );
}
