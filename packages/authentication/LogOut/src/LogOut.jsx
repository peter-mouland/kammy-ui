/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';

class LogOutPage extends React.Component {
  componentDidMount() {
    this.context.auth.logout();
  }

  render() {
    return (
      <section id="logout-page">
        <p className="message message--success">You are now being logged out...</p>
      </section>
    );
  }
}

LogOutPage.contextTypes = {
  auth: PropTypes.object,
};

export default LogOutPage;
