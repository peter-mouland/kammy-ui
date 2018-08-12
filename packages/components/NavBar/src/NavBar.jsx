import React from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy-ui/bem';
import NamedLink from '@kammy-ui/named-link';

import NavItem from './components/NavItem';

import './nav-bar.scss';

const bem = bemHelper({ block: 'nav' });
const linkClass = bem('link');

const NavBar = (__, { appConfig }) => (
  <nav className={bem()}>
    <div className={bem('content')}>
      <span className={bem('header')}>FF</span>
      <NavItem className={linkClass}><NamedLink to="rules" /></NavItem>
      <NavItem className={linkClass}><NamedLink to="players" /></NavItem>
      {
        appConfig.divisionLabels.map((division) => (
          <div key={division} className={linkClass}>
            <NavItem label={division}>
              <NamedLink to={`${appConfig.divisionSheets[division]}-rankings`} className={linkClass} />
              <NamedLink to={`${appConfig.divisionSheets[division]}-teams`} className={linkClass} />
            </NavItem>
          </div>
        ))
      }
      <div className={ bem('link', 'right')}>
        <NavItem label='Admin' >
          <NamedLink to="admin-players" className={linkClass} />
          <NamedLink to="transfers" className={linkClass} />
        </NavItem>
      </div>
    </div>
  </nav>
);

NavBar.contextTypes = {
  appConfig: PropTypes.object,
};

export default NavBar;
