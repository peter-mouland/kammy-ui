import React from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy/bem';
import NavBar from '@kammy/nav-bar';

import './classic-layout.scss';

const bem = bemHelper({ block: 'layout' });

const MainLayout = ({ children, isUserAuthenticated, name }) => (
  <div className={bem(null, 'main')}>
    <div className={bem('nav')}>
      <NavBar isUserAuthenticated={isUserAuthenticated} isAdmin={true} name={name }/>
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
  isUserAuthenticated: PropTypes.bool,
  name: PropTypes.string,
};

MainLayout.defaultProps = {
  isUserAuthenticated: false,
  name: '',
};

export default MainLayout;
