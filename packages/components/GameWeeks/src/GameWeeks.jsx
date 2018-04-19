// or http://belkalab.github.io/react-yearly-calendar
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import jsonQuery from 'json-query';

import bemHelper from '@kammy-ui/bem';

import './game-weeks.scss';

const bem = bemHelper({ block: 'game-weeks' });
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = [2017, 2018, 2019];
const daysInMonth = ({ month, year }) => new Date(year, month, 0).getDate();

const DisplayDate = ({ day, month, year }) => {
  if (month === months[0] && day === 1) {
    return (
      <Fragment>
        <div className={bem('year-header')}>{year}</div>
        <div className={bem('month-header')}>{month}</div>
        <div className={bem('day')}>{day}</div>
      </Fragment>
    );
  }
  if (day === 1) {
    return (
      <Fragment>
        <div className={bem('month-header')}>{month}</div>
        <div className={bem('day')}>{day}</div>
      </Fragment>
    );
  }
  return (
    <div className={bem('day')}>{day}</div>
  );
};

DisplayDate.propTypes = {
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.number.isRequired,
};

const GameWeeks = ({ total }) => {
  const gameWeeks = new Array(total).fill('');
  const maxDays = new Array(31).fill('');

  return (
    <div className={ bem() }>
      <h2>Game Weeks</h2>
      <div className={bem('calendar')}>
        <ul className={bem('week-list')}>
          {gameWeeks.map((_, i) => ( // eslint-disable-line id-length
            <li className={bem('week-item')} key={`gw-${i}`}>
              gw {i + 1}
            </li>
          ))}
        </ul>
        <ul className={bem('date-list')}>
          {years.map((year, yearIndex) => ( // eslint-disable-line id-length
            months.map((month, monthIndex) => ( // eslint-disable-line id-length
              maxDays.map((day, dayIndex) => { // eslint-disable-line id-length
                if (dayIndex + 1 > daysInMonth({ year, month: monthIndex + 1 })) return null;
                return (
                  <li className={bem('date-item')} key={`date-${yearIndex}-${monthIndex}-${dayIndex}`}>
                    <DisplayDate year={year} month={month} day={dayIndex + 1} />
                  </li>
                );
              })
            ))
          ))}
        </ul>
      </div>
    </div>
  );
};

GameWeeks.propTypes = {
  fixtures: PropTypes.object.isRequired,
  total: PropTypes.number,
  initDate: PropTypes.string,
};

GameWeeks.defaultProps = {
  total: 38,
  initDate: String(new Date()),
};

export default GameWeeks;
