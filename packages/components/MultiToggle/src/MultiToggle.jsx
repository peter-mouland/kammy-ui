import React from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy-ui/bem';

import './multi-toggle.scss';

const bem = bemHelper({ block: 'multi-toggle' });

const MultiToggle = ({
  id, checked, options = [], label, className, onChange, ...props
}) => (
  <span className={bem(null, null, className)} id={ id } { ...props }>
    {label && <span className={bem('label')}>{label}</span>}
    <span className={bem('group')} id={ id } { ...props }>
      {
        options.map((option, i) => (
          <div className={ bem('option') } key={ `${id}-${i}` }>
            <input
              checked={checked === option}
              id={ `${id}-${i}` }
              name={ id }
              type={'radio'}
              value={option}
              onChange={ () => onChange(option) }
            />
            <label className={ bem('option-label') } htmlFor={ `${id}-${i}` }>{option}</label>
          </div>
        ))
      }
    </span>
  </span>
);

MultiToggle.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  checked: PropTypes.string,
  label: PropTypes.string,
};

MultiToggle.defaultProps = {
  checked: null,
  label: null,
};

export default MultiToggle;
