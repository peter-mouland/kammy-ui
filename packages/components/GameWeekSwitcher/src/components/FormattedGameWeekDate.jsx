import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import './formattedGameWeekDate.scss';

const FormattedGameWeekDate = ({ gameWeek }) => {
  const { start, end } = gameWeek;
  const startMonth = format(start, 'MMM');
  const endMonth = format(end, 'MMM');
  const startTime = format(start, 'HH:mm');
  const endTime = format(end, 'HH:mm');
  const startDay = format(start, 'Do');
  const endDay = format(end, 'Do');
  return (
    <p className={'formatted-gameweek-date'}>
      <span className='formatted-gameweek-date__calendar'>
        <span className='formatted-gameweek-date__month'>{startMonth}</span>
        <span className='formatted-gameweek-date__day'>{startDay}</span>
        {/* <span className='formatted-gameweek-date__year'></span> */}
        <span className='formatted-gameweek-date__time'>{startTime}</span>
      </span>
      to
      <span className='formatted-gameweek-date__calendar'>
        <span className='formatted-gameweek-date__month'>{endMonth}</span>
        <span className='formatted-gameweek-date__day'>{endDay}</span>
        {/* <span className='formatted-gameweek-date__year'></span> */}
        <span className='formatted-gameweek-date__time'>{endTime}</span>
      </span>
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
