/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  onChange, defaultValue, options, warn = [], disabled = [],
}) => (
  <select onChange={onChange} defaultValue={defaultValue}>
    <option value={''}>all</option>
    {options.map((item) => (
      <option
        value={ item._id || item }
        key={ item._id || item }
        disabled={ disabled.indexOf(item._id || item) > -1 }
      >
        { item.name || item }{ warn.indexOf(item._id || item) > -1 ? '*' : '' }
      </option>
    ))}
  </select>
);

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultValue: PropTypes.string,
  warn: PropTypes.array,
  disabled: PropTypes.array,
};

Select.defaultProps = {
  defaultValue: null,
  warn: [],
  disabled: [],
};

export default Select;
