import React from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';

import bemHelper from '@kammy/bem';

const bem = bemHelper({ block: 'named-link' });
const baseMetaData = {
  title: 'Fantasy Football',
  description: '',
  meta: {
    charSet: 'utf-8',
    name: {
      keywords: 'react,example',
    },
  },
};

const routesConfig = [
  {
    name: 'homepage',
    exact: true,
    path: '/',
    meta: {
      ...baseMetaData,
      title: 'Fantasy Football',
    },
    label: 'Homepage',
  },
  {
    name: 'admin',
    path: '/admin/',
    meta: {
      ...baseMetaData,
      title: 'Admin',
    },
    label: 'Admin',
    requiresAuthentication: true,
  },
  {
    name: 'teams',
    path: '/teams/',
    label: 'Teams',
    meta: {
      ...baseMetaData,
      title: 'Teams',
    },
  },
  {
    name: 'myTeam',
    path: '/my-team/',
    label: 'My Team',
    meta: {
      ...baseMetaData,
      title: 'My Team',
    },
    requiresAuthentication: true,
  },
  {
    name: 'logout',
    path: '/logout/',
    label: 'Logout',
    meta: {
      ...baseMetaData,
      title: 'Logout',
    },
  },
  {
    name: 'profile',
    path: '/profile/',
    label: 'Profile',
    meta: {
      ...baseMetaData,
      title: 'profile',
    },
    requiresAuthentication: true,
  },
  {
    name: 'login',
    path: '/login/',
    label: 'Login',
    meta: {
      ...baseMetaData,
      title: 'Login',
    },
  },
  {
    name: 'rules',
    path: '/rules/',
    label: 'Rules',
    meta: {
      ...baseMetaData,
      title: 'Rules',
    },
  },
  {
    name: 'divisions',
    path: '/divisions/',
    label: 'Divisions',
    meta: {
      ...baseMetaData,
      title: 'Divisions',
    },
  },
  {
    name: 'change-password',
    path: '/change-password/',
    requiresAuthentication: true,
    label: 'Change Password',
    meta: {
      ...baseMetaData,
      title: 'Change Password',
    },
  },
];

const findRoute = (to) => routesConfig.find((rt) => rt.name === to);

const NamedLink = ({ className, to }) => {
  const route = findRoute(to);
  if (!route) throw new Error(`Route to '${to}' not found`);
  const { path, label } = route;
  return (
    <Route path={ path }>
      {({ match }) => (
        <Link to={ path } className={ bem(null, { active: match }, className) }>
          { label }
        </Link>
      )}
    </Route>
  );
};

NamedLink.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default NamedLink;
