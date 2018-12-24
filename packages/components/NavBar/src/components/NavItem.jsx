import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NamedLink from '@kammy-ui/named-link';

import './nav-item.scss';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.string,
};

export default class NavItem extends Component {
  static propTypes = propTypes;

  render() {
    const {
      label, children, className = '', to,
    } = this.props;
    const links = Array.isArray(children) ? children : [children];
    const TopLevelItem = to ? NamedLink : 'div';
    return (
      <div className={`nav-item ${className}`}>
        {label && <TopLevelItem className='nav-item__label' to={to}>{label}</TopLevelItem>}
        {links.length === 1 && (links[0])}
        {links.length > 1 && (
          <div className='nav-item__children'>
            {links.map((child, i) => (
              <div key={i} className='nav-item__child'>{child}</div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
