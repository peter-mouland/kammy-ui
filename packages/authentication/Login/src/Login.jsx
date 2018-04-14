import React from 'react';
import PropTypes from 'prop-types';
import Redirect from 'react-router-dom/Redirect';

import { validateLoginForm, validateSignUpForm } from './validation';
import './login.scss';

const actions = {
  signUp: {
    type: 'signUp',
    url: '/auth/signup',
  },
  login: {
    type: 'login',
    url: '/auth/login',
  },
};

const getAndRemoveMessage = (key) => {
  const storedMessage = localStorage.getItem(key);
  let successMessage = '';

  if (storedMessage) {
    successMessage = storedMessage;
    localStorage.removeItem(key);
  }
  return successMessage;
};

class Login extends React.Component {
  static propTypes = {
    location: PropTypes.object,
  };

  static defaultProps = {
    location: { },
  };

  static contextTypes = {
    auth: PropTypes.object,
  };


  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
      redirectTo: null,
      successMessage: getAndRemoveMessage('successMessage'),
      user: {
        email: '',
        password: '',
        action: actions.login,
      },
      loginAttemptCount: 0,
    };
  }

  processForm = (event) => {
    event.preventDefault();
    const { user } = this.state;
    const { auth } = this.context;
    const validationResponse = user.action.type === 'login'
      ? validateLoginForm(user)
      : validateSignUpForm(user);

    if (!validationResponse.success) {
      this.setState({ errors: validationResponse.errors });
    } else {
      auth[user.action.type](user.action.url, user, (errors) => {
        const { location } = this.props;
        const { loginAttemptCount } = this.state;
        if (errors) {
          this.setState({ errors, loginAttemptCount: loginAttemptCount + 1 });
        } else if (location.state && location.state.from) {
          this.setState({ redirectTo: location.state.from, loginAttemptCount: 0 });
        } else {
          this.setState({ redirectTo: '/', loginAttemptCount: 0 });
        }
      });
    }
  };

  changeUser = (event) => {
    const { user } = this.state;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  };

  render() {
    const { location } = this.props;
    const { from } = location.state || {};
    const {
      redirectTo, errors, successMessage, user,
    } = this.state;

    const redirect = redirectTo ? (<Redirect to={from || '/'}/>) : null;
    const form = (
      <div id="login-page">
        {from
          ? (
            <p className="message message--warning">
              You must log in to view the page at
              <code>{from.pathname}</code>
            </p>
          )
          : null
        }
        <form action="/nojs-login" onSubmit={this.processForm} method="post" className="form">
          <div className="bg" />
          <fieldset>
            <legend>Login</legend>

            {successMessage && <p className="form__success">{successMessage}</p>}
            {errors.summary && <p className="form__error">{errors.summary}</p>}

            <input type="hidden" name="action" value={actions.login} />

            <div className="field-group">
              <label>
                <input
                  type="radio"
                  name="action"
                  value={actions.login}
                  defaultChecked={true}
                  onChange={this.changeUser}
                />
                I am an existing User</label>
            </div>

            <div className="field-group">
              <label>
                <input
                  type="radio"
                  name="action"
                  value={actions.signUp}
                  onChange={this.changeUser}
                />
                I&#39;m new here, please create an account!
              </label>
              <span className="separator"> </span>
            </div>

            <div className="field-group">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                onChange={this.changeUser}
                value={user.email}
              />
              <label htmlFor="email" className="animated-label">Email</label>
              <span className="separator"> </span>
              <p className="field__error">{errors.email}</p>
            </div>

            <div className="field-group">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                onChange={this.changeUser}
                value={user.password}
              />
              <label htmlFor="password" className="animated-label">Password</label>
              <span className="separator"> </span>
              <p className="field__error">{errors.password}</p>
              <p>Try <em>password123</em></p>
            </div>
            <div className="field form__bottom">
              <input type="submit" className="form__action" value="Log In" />
            </div>
          </fieldset>
        </form>
      </div>
    );

    return redirect || form;
  }
}

export default Login;
export { validateLoginForm, validateSignUpForm };
