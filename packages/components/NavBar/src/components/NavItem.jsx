import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './nav-item.scss';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default class NavItem extends Component {
  static propTypes = propTypes;

  render() {
    const { label, children, className = '' } = this.props;
    const links = Array.isArray(children) ? children : [children];
    return (
      <div className={`nav-item ${className}`}>
        {label && <div className='nav-item__label'>{label}</div>}
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
