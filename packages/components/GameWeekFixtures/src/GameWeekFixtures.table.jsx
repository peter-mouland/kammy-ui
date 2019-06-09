import React from 'react';
import PropTypes from 'prop-types';
import jsonQuery from 'json-query';
import bemHelper from '@kammy-ui/bem';

import './game-week-fixtures.scss';

const bem = bemHelper({ block: 'club-fixtures' });
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// todo: put in selector
const getGwFixtures = (data, { start, end }) => (
  jsonQuery('fixtures[*:date]', {
    data,
    locals: {
      date(item) {
        const fixtureDate = new Date(item.date);
        // todo: test this start and end dates with hours!
        const endDate = new Date(end).setHours(23, 59, 59, 999);
        const startDate = new Date(start).setHours(0, 0, 0, 0);
        return fixtureDate <= endDate && fixtureDate >= startDate;
      },
    },
  })
);

class GameWeekFixtures extends React.Component {
  static propTypes = {
    fetchFixtures: PropTypes.func.isRequired,
    start: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // string or moment
    end: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // string or moment
    loading: PropTypes.bool,
    fixtures: PropTypes.shape({
      hTname: PropTypes.string,
      aTname: PropTypes.string,
      date: PropTypes.string,
      aScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      hScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  };

  componentDidMount() {
    const { loading, fixtures, fetchFixtures } = this.props;
    if (!loading && !fixtures) {
      fetchFixtures();
    }
  }

  render() {
    const {
      fixtures, loading, start, end,
    } = this.props;

    const gwFixtures = fixtures ? getGwFixtures(fixtures, { start, end }) : null;
    let previousFullDate = '';
    return (
      <div>
        {loading && 'Loading...'}
        {
          gwFixtures && gwFixtures.value.map((fixture) => {
            const date = new Date(fixture.date);
            const fullDate = `${date.getFullYear()} ${months[date.getMonth()]} ${date.getDate()}`;
            const dateStr = fullDate === previousFullDate ? null : <h2>{fullDate}</h2>;
            previousFullDate = fullDate;
            return (
              <div key={`${fixture.date}-${fixture.hTname}`}>
                {dateStr}
                <span className={bem('fixture', 'desktop')}>
                  <span className={bem('team', 'home')}>{fixture.hTname} {fixture.hScore}</span>
                  vs
                  <span className={bem('team', 'away')}>{fixture.aScore} {fixture.aTname}</span>
                </span>
                <span className={bem('fixture', 'mobile')}>
                  <span className={bem('team', 'home')}>{fixture.hTcode} {fixture.hScore}</span>
                  vs
                  <span className={bem('team', 'away')}>{fixture.aScore} {fixture.aTcode}</span>
                </span>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default GameWeekFixtures;
