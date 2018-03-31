import React from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy/bem';
import NamedLink from '@kammy/named-link';

import './my-account-nav-item.scss';

const bem = bemHelper({ block: 'my-account' });

const MyAccountNavItem = ({ isUserAuthenticated, name }) => {
  const linkClass = bem('link');
  return (
    <div className={bem()} >
      { isUserAuthenticated
        ? (
          <span>
          Hey <NamedLink to="profile" className={linkClass}>{name}</NamedLink>;
            <NamedLink to="logout" className={linkClass} />
          </span>
        )
        : <NamedLink to="login" className={linkClass} />
      }
    </div>
  );
};

MyAccountNavItem.propTypes = {
  isUserAuthenticated: PropTypes.bool,
  name: PropTypes.string,
};

export default MyAccountNavItem;
