import React from 'react';

import bemHelper from '@kammy-ui/bem';
import NamedLink from '@kammy-ui/named-link';

import './nav-bar.scss';

const bem = bemHelper({ block: 'nav' });
const linkClass = bem('link');

const NavBar = () => (
  <nav className={bem()}>
    <span className={bem('header')}>FF</span>
    <NamedLink to="players" className={linkClass} />
    <NamedLink to="rules" className={linkClass} />
  </nav>
);

export default NavBar;
