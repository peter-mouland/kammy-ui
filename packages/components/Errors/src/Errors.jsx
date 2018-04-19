import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';

const bem = bemHelper({ block: 'error' });

const Errors = ({ errors }) => (
  <div className={ bem() }>
    <p>Error!</p>
    {errors.map((error, i) => <p key={i}>{error.message}</p>)}
  </div>
);

Errors.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default Errors;
