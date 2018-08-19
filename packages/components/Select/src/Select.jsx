/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  onChange = (e) => this.props.onChange(e.target.value);

  render() {
    const {
      defaultValue, options, warn, disabled,
    } = this.props;
    return (
      <select onChange={this.onChange} defaultValue={defaultValue}>
        <option value={''}>all</option>
        {options.map((item = '') => (
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
  }
}

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({ _id: PropTypes.string, name: PropTypes.string }),
      PropTypes.string,
    ]),
  ).isRequired,
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
