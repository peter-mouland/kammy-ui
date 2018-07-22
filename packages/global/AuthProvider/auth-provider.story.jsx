import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { storiesOf } from '@storybook/react';
import AppConfigProvider from '@kammy-ui/app-config-provider';

import AuthProvider from './src/AuthProvider';

class DemoAuthOutput extends React.Component {
  componentDidMount() {
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

class FauxForm extends React.Component {
  static contextTypes = {
    auth: PropTypes.object,
  };

  componentDidMount() {
    // if you care about auth status, SUBSCRIBE!
    this.context.auth.subscribe(() => this.forceUpdate());
  }

  processLogOut = (event) => {
    event.preventDefault();
    const { auth } = this.context;
    auth.logout((errors) => {
      if (errors) this.setState({ errors });
    });
  };

  processLogin = (event) => {
    event.preventDefault();
    const { auth } = this.context;
    const user = { email: 'demo@email.com', password: 'demo@password.com' };
    const url = '/auth/login';
    auth.login(url, user, (errors) => {
      if (errors) this.setState({ errors });
    });
  };

  render() {
    const { auth } = this.context;
    return auth.user().loggedIn
      ? (
        <form onSubmit={this.processLogOut} method="post" className="form">
          <input type="submit" className="form__action" value="Demo Log Out" />
        </form>
      ) : (
        <form onSubmit={this.processLogin} method="post" className="form">
          <input type="submit" className="form__action" value="Demo Log In" />
        </form>
      );
  }
}

storiesOf('Authentication', module)
  .add('AuthProvider', () => (
    <AppConfigProvider>
      <AuthProvider cookieToken={'demo-token'}>
        <BrowserRouter>
          <Fragment>
            <DemoAuthOutput />
            <FauxForm />
          </Fragment>
        </BrowserRouter>
      </AuthProvider>
    </AppConfigProvider>
  ));
