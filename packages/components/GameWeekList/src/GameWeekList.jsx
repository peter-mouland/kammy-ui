import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import addDays from 'date-fns/add_days';

import bemHelper from '@kammy-ui/bem';
import GameWeekFixtures from '@kammy-ui/game-week-fixtures';

import './game-week-list.scss';

const bem = bemHelper({ block: 'game-week-list' });
const firstGameDate = '2017-08-10';
const formatDate = (date) => format(date, 'YYYY-MM-DD');

const defaultGameWeekDates = (gameWeeksArray) => (
  gameWeeksArray.reduce((prev, curr, currentIndex) => ({
    ...prev,
    [`gw-${currentIndex + 1}`]: {
      start: formatDate(addDays(firstGameDate, currentIndex * 7)),
      end: formatDate(addDays(firstGameDate, ((currentIndex + 1) * 7) - 1)),
    },
  }), {})
);

class GameWeekCalendar extends React.Component {
  static propTypes = {
    gameWeeksCount: PropTypes.number,
    gameWeeks: PropTypes.object,
  };

  static defaultProps = {
    gameWeeks: defaultGameWeekDates(new Array(42).fill('')),
    gameWeeksCount: 42,
  };

  constructor(props) {
    super(props);

    const { gameWeeks } = props;
    const today = formatDate(new Date());
    const weekend = 'Sat,Sun';
    const customCssClasses = { weekend, ...gameWeeks };

    this.state = {
      year: today.year(),
      selectedDay: today,
      selectedRange: [today, addDays(today, 15)],
      showDaysOfWeek: true,
      showTodayBtn: true,
      showWeekSeparators: true,
      selectRange: false,
      firstDayOfWeek: 0, // sunday
      customCssClasses,
    };
  }

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
        ? [format(selectedRange.start), format(selectedRange.end)]
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

  changeGwStart = () => {
    this.setState({ changeGwStart: true, changeGwEnd: false });
  };

  changeGwEnd = () => {
    this.setState({ changeGwStart: false, changeGwEnd: true });
  };

  removeGameWeek = () => {
    const { customCssClasses, selectedGW } = this.state;

    const deletedGw = parseInt(selectedGW.replace('gw-', ''), 10);
    const newClasses = (Object.keys(customCssClasses)).reduce((prev, currentItem) => {
      if (currentItem.indexOf('gw-') === -1) {
        return {
          ...prev,
          [currentItem]: customCssClasses[currentItem],
        };
      }
      const currentGw = parseInt(currentItem.replace('gw-', ''), 10);
      const newGw = currentGw <= deletedGw ? currentGw : currentGw - 1;
      delete prev[currentItem]; // eslint-disable-line no-param-reassign
      return {
        ...prev,
        [`gw-${newGw}`]: customCssClasses[currentItem],
      };
    }, customCssClasses);

    this.setState({
      customCssClasses: newClasses,
    });
  };

  render() {
    const {
      selectedRange,
      error,
      selectedGW,
      changeGwStart,
      changeGwEnd,
    } = this.state;

    const [start, end] = selectedRange;

    return (
      <div className={bem()}>
        <div id="calendar">
        </div>
        {selectedGW && (
          <div>
            <section>
              <strong>GameWeek {selectedGW}</strong>:
              {
                selectedRange && selectedRange.length > 0
                  ? (
                    <div>
                      <p>
                        Starts: {formatDate(start)}
                        <button onClick={this.changeGwStart}> change start date </button>
                        {changeGwStart && 'Select a new start date'}
                      </p>
                      <p>
                        Ends: {formatDate(end)}
                        <button onClick={this.changeGwEnd}> change end date </button>
                        {changeGwEnd && 'Select a new end date'}
                      </p>
                      <p><button onClick={this.removeGameWeek}>! Remove Game Week !</button></p>
                    </div>
                  )
                  : null
              }
              {error && <p>{error}</p>}
            </section>
            <section>
              <GameWeekFixtures start={start} end={end} />
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default GameWeekCalendar;
