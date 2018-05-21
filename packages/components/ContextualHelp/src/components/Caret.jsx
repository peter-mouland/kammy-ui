/* eslint-disable id-length */
import React from 'react';
import PropTypes from 'prop-types';

import Bem from '@kammy-ui/bem';

import './caret.scss';

const bem = new Bem({ block: 'caret' });

export default function Caret(props) {
  const caretClass = bem(null, {
    up: props.isUp, down: !props.isUp,
  });
  return (<div style={{ transform: `translate(${props.x || 0}px)` }} className={caretClass} />);
}

Caret.propTypes = {
  isUp: PropTypes.bool,
  x: PropTypes.number,
};
