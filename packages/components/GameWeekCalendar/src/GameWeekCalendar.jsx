import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, CalendarControls } from 'react-yearly-calendar';
import moment from 'moment';
// import jsonQuery from 'json-query';

import bemHelper from '@kammy-ui/bem';

import './game-week-calendar.scss';

const bem = bemHelper({ block: 'game-week-calendar' });
const gameWeeks = new Array(38).fill('');

class GameWeekCalendar extends React.Component {
  constructor(props) {
    super(props);

    const today = moment();

    const customCssClasses = {
      weekend: 'Sat,Sun',
    };

    this.state = {
      year: today.year(),
      selectedDay: today,
      selectedRange: [today, moment(today).add(15, 'day')],
      showDaysOfWeek: true,
      showTodayBtn: true,
      showWeekSeparators: true,
      selectRange: true,
      firstDayOfWeek: 0, // sunday
      customCssClasses,
      gameWeek: 1,
    };
  }

  onPrevYear = () => {
    this.setState((prevState) => ({
      year: prevState.year - 1,
    }));
  }

  onNextYear = () => {
    this.setState((prevState) => ({
      year: prevState.year + 1,
    }));
  }

  goToToday = () => {
    const today = moment();

    this.setState({
      selectedDay: today,
      selectedRange: [today, moment(today).add(15, 'day')],
      year: today.year(),
    });
  }

  datePicked = (date) => {
    console.log('datePicked', {date});
    this.setState({
      selectedDay: date,
      selectedRange: [date, moment(date).add(15, 'day')],
    });
  }

  rangePicked = (start, end) => {
    this.updateClasses({ start, end });
    this.setState({
      selectedRange: [start, end],
      selectedDay: start,
    });
  };

  updateGameweek = (e) => {
    this.setState({ gameWeek: e.target.value });
  };

  updateClasses = ({ start, end }) => {
    const { customCssClasses, gameWeek } = this.state;

    customCssClasses[`gw-${gameWeek}`] = { start, end };

    this.setState({ customCssClasses });
  };

  render() {
    const {
      year,
      showTodayBtn,
      selectedDay,
      showDaysOfWeek,
      forceFullWeeks,
      showWeekSeparators,
      firstDayOfWeek,
      selectRange,
      selectedRange,
      customCssClasses,
      gameWeek,
    } = this.state;

    return (
      <div className={bem()}>
        GameWeek
        <select onChange={this.updateGameweek}>
          {gameWeeks.map((gw, index) => (
            <option key={index} defaultChecked={index + 1 === gameWeek}>{index + 1}</option>
          ))}
        </select>
        <div id="calendar">
          <CalendarControls
            year={year}
            showTodayButton={showTodayBtn}
            onPrevYear={this.onPrevYear}
            onNextYear={this.onNextYear}
            goToToday={this.goToToday}
          />
          <Calendar
            year={year}
            selectedDay={selectedDay}
            showDaysOfWeek={showDaysOfWeek}
            forceFullWeeks={forceFullWeeks}
            showWeekSeparators={showWeekSeparators}
            firstDayOfWeek={firstDayOfWeek}
            selectRange={selectRange}
            selectedRange={selectedRange}
            onPickDate={this.datePicked}
            onPickRange={this.rangePicked}
            customClasses={customCssClasses}
          />
        </div>
      </div>
    );
  }
}

export default GameWeekCalendar;
