import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { storiesOf } from '@storybook/react';
import { AuthProvider } from '@kammy-ui/auth-provider';
import AppConfigProvider from '@kammy-ui/app-config-provider';

import Login from './src/Login';

class DemoAuthOutput extends React.Component {
  componentWillMount() {
    // if you care about auth status, SUBSCRIBE!
    this.context.auth.subscribe(() => this.forceUpdate());
  }
  render() {
    const { auth } = this.context;
    return (
      <div>
        <h1>Auth Response</h1>
        <p>IsAdmin: <span>{String(auth.isAdmin())}</span></p>
        <p>User: <span>{JSON.stringify(auth.user())}</span></p>
      </div>
    );
  }
}

DemoAuthOutput.contextTypes = {
  appConfig: PropTypes.object,
  auth: PropTypes.object,
};

storiesOf('Authentication', module)
  .add('Login', () => (
    <AppConfigProvider>
      <AuthProvider cookieToken={'demo-token'}>
        <BrowserRouter>
          <Fragment>
            <DemoAuthOutput />
            <Login />
          </Fragment>
        </BrowserRouter>
      </AuthProvider>
    </AppConfigProvider>
  ));
