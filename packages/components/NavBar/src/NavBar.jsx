import React from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy/bem';
import NamedLink from '@kammy/named-link';
import MyAccountNavItem from '@kammy/my-account-nav-item';

import './nav-bar.scss';

const bem = bemHelper({ block: 'nav' });

const NavBar = ({ isUserAuthenticated, isAdmin }) => (
  <nav className={bem()}>
    <span className={bem('header')}>FF</span>
    <NamedLink to="teams" className={bem('link')} />
    <NamedLink to="myTeam" className={bem('link')} />
    <NamedLink to="divisions" className={bem('link')} />
    <NamedLink to="rules" className={bem('link')} />
    { isAdmin ? <NamedLink to="admin" className={bem('link')} /> : null }
    <MyAccountNavItem isUserAuthenticated={ isUserAuthenticated } />
  </nav>
);

NavBar.propTypes = {
  isUserAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

NavBar.defaultProps = {
  isUserAuthenticated: false,
  isAdmin: false,
};

export default NavBar;
