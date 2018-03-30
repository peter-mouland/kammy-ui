import React from 'react';

import bemHelper from '@kammy/bem';
import Auth from '../authentication/auth-helper';
import { NamedLink } from '../routes';

import './classicLayout.scss';

class MyAccount extends React.Component {
  render() {
    const bem = bemHelper({ name: 'my-account' });
    const { className, isUserAuthenticated, ...props } = this.props;
    const linkClass = bem('link');
    const loggedOut = (
      <span>
        <NamedLink to="login" {...linkClass} />
      </span>
    );
    const loggedIn = (
      <span>
      Hey <NamedLink to="profile" {...linkClass}>{Auth.user().name}</NamedLink>;
        <NamedLink to="logout" {...linkClass} />
      </span>
    );
    return (
      <div {...bem(null, null, className)} { ...props } >
        { isUserAuthenticated
          ? loggedIn
          : loggedOut
        }
      </div>
    );
  }
}

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserAuthenticated: Auth.validateToken(),
    };
    this.updateAuth = this.updateAuth.bind(this);
  }

  updateAuth(isUserAuthenticated) {
    this.setState({ isUserAuthenticated });
  }

  componentWillMount() {
    Auth.onChange = this.updateAuth;
  }

  render() {
    const bem = bemHelper({ name: 'layout' });
    const { children } = this.props;
    const { isUserAuthenticated } = this.state;
    return (
      <div {...bem(null, 'main')}>
        <nav {...bem('nav')}>
          <span {...bem('nav', 'header')}>FF</span>
          <NamedLink to="teams" {...bem('nav-link')} />
          <NamedLink to="myTeam" {...bem('nav-link')} />
          <NamedLink to="divisions" {...bem('nav-link')} />
          <NamedLink to="rules" {...bem('nav-link')} />
          { Auth.isAdmin() ? <NamedLink to="admin" {...bem('nav-link')} /> : null }
          <MyAccount isUserAuthenticated={ isUserAuthenticated } />
        </nav>
        <main {...bem('content')}>
          { children}
        </main>
        <footer {...bem('footer')}>
          Hosted at <a href="http://github.com/peter-mouland/kammy">github.com/peter-mouland/kammy</a>
        </footer>
      </div>
    );
  }
}
