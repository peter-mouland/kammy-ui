import React from 'react';
import PropTypes from 'prop-types';

import './formattedGameWeekDate.scss';

function getOrdinalNum(int) {
  return int + (int > 0 ? ['th', 'st', 'nd', 'rd'][(int > 3 && int < 21) || int % 10 > 3 ? 0 : int % 10] : '');
}

const FormattedGameWeekDate = ({ gameWeek }) => {
  const { start, end } = gameWeek;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startMonth = startDate.toLocaleString('en-gb', { month: 'long' });
  const endMonth = endDate.toLocaleString('en-gb', { month: 'long' });
  const startDay = getOrdinalNum(startDate.getDate());
  const endDay = getOrdinalNum(endDate.getDate());
  const mins = startDate.getMinutes();
  const minutes = String(mins).length === 1 ? `${mins}0` : mins;
  const time = `${startDate.getHours()}:${minutes}`;
  return (
    <p className={'formatted-gameweek-date'}>
      <span className={'formatted-gameweek-date__year'}>{startDate.getFullYear()}</span>
      <span>{startDay} {startMonth} - {endDay} {endMonth}</span>
      <span className={'formatted-gameweek-date__time'}>{time}</span>
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
