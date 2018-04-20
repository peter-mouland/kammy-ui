import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';

import './game-week-fixtures.scss';

const bem = bemHelper({ block: 'club-fixtures' });

class ClubFixtures extends React.Component {
  static propTypes = {
    fetchFixtures: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    fixtures: PropTypes.arrayOf(PropTypes.shape({
      hTname: PropTypes.string,
      aTname: PropTypes.string,
      date: PropTypes.string,
      aScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      hScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })),
  };

  componentDidMount() {
    const { loading, fixtures, fetchFixtures } = this.props;
    if (!loading && !fixtures) {
      fetchFixtures();
    }
  }

  render() {
    const { fixtures, loading } = this.props;
    return (
      <div>
        <h3>Fixtures</h3>
        {loading && 'Loading...'}
        {
          fixtures && fixtures.map((fixture, i) => (
            <div key={`${fixture.date}-${fixture.hTname}`}>
              <strong className={bem('event')}>{i + 1}</strong>
              <span className={bem('fixture')}>
                <span className={bem('team', 'home')}>{fixture.hTname} {fixture.hScore}</span>
                vs
                <span className={bem('team', 'away')}>{fixture.aScore} {fixture.aTname}</span>
              </span>
            </div>
          ))
        }
      </div>
    );
  }
}

export default ClubFixtures;
