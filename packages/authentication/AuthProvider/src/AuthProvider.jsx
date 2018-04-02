import React from 'react';
import PropTypes from 'prop-types';
import Auth from './Auth';

class AuthProvider extends React.Component {
  constructor(props, state) {
    super(props, state);
    this.auth = new Auth({ cookieToken: props.cookieToken });
  }

  getChildContext() {
    return { auth: this.auth };
  }

  render() {
    return this.props.children;
  }
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.string]).isRequired,
  cookieToken: PropTypes.string.isRequired,
};

AuthProvider.childContextTypes = {
  auth: PropTypes.object,
};

export default AuthProvider;
