import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import './formattedGameWeekDate.scss';

const FormattedGameWeekDate = ({ gameWeek }) => {
  const { start, end } = gameWeek;
  return (
    <p className={'formatted-gameweek-date'}>
      <span className={'formatted-gameweek-date__year'}>{format(start, 'YYYY')}</span>
      <span>{format(start, 'do MMMM')} - {format(end, 'do MMMM')}</span>
      <span className={'formatted-gameweek-date__time'}>{format(end, 'HH:mm')}</span>
    </p>
  );
};

FormattedGameWeekDate.propTypes = {
  gameWeek: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }).isRequired,
};

export default FormattedGameWeekDate;
