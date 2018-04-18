import React from 'react';
import PropTypes from 'prop-types';
import Svg from '@kammy-ui/svg';

import football from './football.svg';

import './interstitial.scss';

const Interstitial = ({ message }) => (
  <div className="interstitial">
    <Svg>{football}</Svg>
    { message || 'Please wait' }...
  </div>
);

Interstitial.propTypes = {
  message: PropTypes.string,
};

Interstitial.defaultProps = {
  message: null,
};

export default Interstitial;
