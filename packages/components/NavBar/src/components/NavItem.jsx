import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './nav-item.scss';

const propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOf(PropTypes.node, PropTypes.arrayOf(PropTypes.node)).isRequired,
};

export default class NavItem extends Component {
  static propTypes = propTypes;

  render() {
    const { label, children } = this.props;
    return (
      <div className='nav-item'>
        <div className='nav-item__label'>{label}</div>
        <div className='nav-item__children'>
          {children.map((child, i) => (
            <div key={i} className='nav-item__child'>{child}</div>
          ))}
        </div>
      </div>
    );
  }
}
