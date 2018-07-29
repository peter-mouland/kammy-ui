import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './nav-item.scss';

const propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

export default class NavItem extends Component {
  static propTypes = propTypes;

  render() {
    const { label, children } = this.props;
    const links = Array.isArray(children) ? children : [children];
    return (
      <div className='nav-item'>
        <div className='nav-item__label'>{label}</div>
        <div className='nav-item__children'>
          {links.map((child, i) => (
            <div key={i} className='nav-item__child'>{child}</div>
          ))}
        </div>
      </div>
    );
  }
}
