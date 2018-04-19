import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Calendar, CalendarControls } from 'react-yearly-calendar';
import moment from 'moment';
// import jsonQuery from 'json-query';

import bemHelper from '@kammy-ui/bem';

import './game-week-calendar.scss';

const bem = bemHelper({ block: 'game-week-calendar' });
const gameWeeksArray = new Array(38).fill('');
const firstGameDate = '2017-08-11';
const formatDate = (date) => moment(date).format('YYYY-MM-DD');

const defaultGameWeekDates = () => (
  gameWeeksArray.reduce((prev, curr, currentIndex) => ({
    ...prev,
    [`gw-${currentIndex + 1}`]: {
      start: moment(firstGameDate).add(currentIndex * 7, 'days').format('YYYY-MM-DD'),
      end: moment(firstGameDate).add(((currentIndex + 1) * 7) - 1, 'days').format('YYYY-MM-DD'),
    },
  }), {})
);

class GameWeekCalendar extends React.Component {
  static propTypes = {
    gameWeeksCount: PropTypes.number,
    gameWeeks: PropTypes.object,
  };

  static defaultProps = {
    gameWeeks: defaultGameWeekDates(),
    gameWeeksCount: 38,
  };

  constructor(props) {
    super(props);

    const { gameWeeks } = props;
    const today = moment();
    const weekend = 'Sat,Sun';
    const customCssClasses = { weekend, ...gameWeeks };

    this.state = {
      year: today.year(),
      selectedDay: today,
      selectedRange: [today, moment(today).add(15, 'day')],
      showDaysOfWeek: true,
      showTodayBtn: true,
      showWeekSeparators: true,
      selectRange: false,
      firstDayOfWeek: 0, // sunday
      customCssClasses,
    };
  }

  onPrevYear = () => {
    this.setState((prevState) => ({
      year: prevState.year - 1,
    }));
  };

  onNextYear = () => {
    this.setState((prevState) => ({
      year: prevState.year + 1,
    }));
  };

  goToToday = () => {
    const today = moment();

    this.setState({
      selectedDay: today,
      // selectedRange: [today, moment(today).add(15, 'day')],
      year: today.year(),
    });
  };

  datePickedGW = (date, dayClasses) => {
    const { customCssClasses } = this.state;
    return dayClasses.split(' ').filter((dayClass) => (
      dayClass.indexOf('gw') > -1 && customCssClasses[dayClass]
    )).join('');
  }

  selectGW = (date, dayClasses) => {
    const { customCssClasses } = this.state;
    const gw = this.datePickedGW(date, dayClasses);
    const selectedRange = customCssClasses[gw];
    this.setState({
      error: null,
      selectedGW: gw,
      selectedDay: date,
      selectedRange: selectedRange
        ? [moment(selectedRange.start), moment(selectedRange.end)]
        : null,
    });
  };

  datePicked = (date, dayClasses) => {
    const {
      changeGwStart,
      changeGwEnd,
      customCssClasses,
      selectedGW,
    } = this.state;
    const datePickedGW = this.datePickedGW(date, dayClasses);
    if (changeGwStart && datePickedGW && datePickedGW !== selectedGW) {
      this.setState({
        error: 'Chosen Date is already in a GW.',
        changeGwStart: false,
      });
    } else if (changeGwStart) {
      this.setState({
        error: null,
        changeGwStart: false,
        customCssClasses: {
          ...customCssClasses,
          [selectedGW]: {
            ...customCssClasses[selectedGW],
            start: formatDate(date),
          },
        },
      });
    } else if (changeGwEnd && datePickedGW && datePickedGW !== selectedGW) {
      this.setState({
        error: 'Chosen Date is already in a GW.',
        changeGwEnd: false,
      });
    } else if (changeGwEnd) {
      this.setState({
        error: null,
        changeGwEnd: false,
        customCssClasses: {
          ...customCssClasses,
          [selectedGW]: {
            ...customCssClasses[selectedGW],
            end: formatDate(date),
          },
        },
      });
    } else {
      this.selectGW(date, dayClasses);
    }
  };

  rangePicked = (start, end) => {
    this.updateClasses({ start, end });
    this.setState({
      selectedRange: [start, end],
      selectedDay: start,
    });
  };

  changeGwStart = () => {
    this.setState({ changeGwStart: true, changeGwEnd: false });
  };

  changeGwEnd = () => {
    this.setState({ changeGwStart: false, changeGwEnd: true });
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
      error,
      customCssClasses,
      selectedGW,
      changeGwStart,
      changeGwEnd,
    } = this.state;

    return (
      <div className={bem()}>
        <strong>GameWeek {selectedGW}</strong>:
        {
          selectedRange && selectedRange.length > 0
            ? (
              <Fragment>
                <p>
                  Starts: {selectedRange[0].format('YYYY-MM-DD')}
                  <button onClick={this.changeGwStart}> change start date </button>
                  {changeGwStart && 'Select a new start date'}
                </p>
                <p>
                  Ends: {selectedRange[1].format('YYYY-MM-DD')}
                  <button onClick={this.changeGwEnd}> change end date </button>
                  {changeGwEnd && 'Select a new end date'}
                </p>
              </Fragment>
            )
            : null
        }
        {error && <p>{error}</p>}
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
