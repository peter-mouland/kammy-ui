import React from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy-ui/bem';
import NamedLink from '@kammy-ui/named-link';

import './nav-bar.scss';

const bem = bemHelper({ block: 'nav' });
const linkClass = bem('link');

const NavBar = ({ isUserAuthenticated, isAdmin, name }) => (
  <nav className={bem()}>
    <span className={bem('header')}>FF</span>
    <NamedLink to="teams" className={linkClass} />
    <NamedLink to="myTeam" className={linkClass} />
    <NamedLink to="divisions" className={linkClass} />
    <NamedLink to="rules" className={linkClass} />
    { isAdmin ? <NamedLink to="admin" className={linkClass} /> : null }
    <span className={bem('my-account')} >
      { isUserAuthenticated
        ? (
          <span>
            Hey <NamedLink to="profile" className={linkClass}>{name}</NamedLink>;
            <NamedLink to="logout" className={linkClass} />
          </span>
        )
        : <NamedLink to="login" className={linkClass} />
      }
    </span>
  </nav>
);

NavBar.propTypes = {
  isUserAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  name: PropTypes.string,
};

NavBar.defaultProps = {
  isUserAuthenticated: false,
  isAdmin: false,
  string: null,
};

export default NavBar;
