import React from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy/bem';

import './classic-layout.scss';

const bem = bemHelper({ block: 'layout' });

const MainLayout = ({ children, NavBar }) => (
  <div className={bem(null, 'main')}>
    <div className={bem('nav')}>
      {NavBar}
    </div>
    <main className={bem('content')}>
      { children}
    </main>
    <footer className={bem('footer')}>
      Hosted at <a href="http://github.com/peter-mouland/kammy">github.com/peter-mouland/kammy</a>
    </footer>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  NavBar: PropTypes.node.isRequired,
};

export default MainLayout;
