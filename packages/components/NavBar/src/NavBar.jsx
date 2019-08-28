import React from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy-ui/bem';
import NamedLink from '@kammy-ui/named-link';
import { withCookies, Cookies } from 'react-cookie';

import NavItem from './components/NavItem';

import './nav-bar.scss';

const bem = bemHelper({ block: 'nav' });
const linkClass = bem('link');

const AdminLinks = ({ cookies }) => (
  cookies.get('is-admin')
    ? (
      <div className={bem('link', 'right')}>
        <NavItem label='Admin' to='admin'>
          <NamedLink to="admin-players" className={linkClass}/>
          <NamedLink to="admin-cup" className={linkClass}/>
          <a href="/google-spreadsheet/cache/reset" className={linkClass}>Reset Spreadsheet Cache</a>
        </NavItem>
      </div>
    )
    : null
);

AdminLinks.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

const NavBar = ({ cookies }, { appConfig }) => (
  <nav className={bem()}>
    <div className={bem('content')}>
      <NavItem label='DraftFF' className={linkClass}>
        <NamedLink to="homepage" />
        <NamedLink to="rules" />
        <NamedLink to="prize-money" />
      </NavItem>
      <NamedLink to="cup" className={linkClass} />
      {
        appConfig.divisionLabels.map((division) => (
          <div key={division} className={linkClass}>
            <NavItem label={division} openOnClick>
              <NamedLink to={`${appConfig.divisionSheets[division]}-rankings`} className={linkClass} />
              <NamedLink to={`${appConfig.divisionSheets[division]}-teams`} className={linkClass} />
              <NamedLink to={`${appConfig.divisionSheets[division]}-players`} className={linkClass} />
              <NamedLink to={`${appConfig.divisionSheets[division]}-transfers`} className={linkClass} />
              <NamedLink to={`${appConfig.divisionSheets[division]}-draft`} className={linkClass} />
            </NavItem>
          </div>
        ))
      }
      <AdminLinks cookies={cookies} />
    </div>
  </nav>
);

NavBar.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

NavBar.contextTypes = {
  appConfig: PropTypes.object,
};

export default withCookies(NavBar);
