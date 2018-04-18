import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';

import './club-fixtures.scss';

const bem = bemHelper({ block: 'club-fixtures' });

const ClubFixtures = ({ fixtures, club, code }) => console.log({ fixtures }) || (
  <div>
    <h3>Fixtures</h3>
    {
      fixtures.map((fixture, i) => (
        <div key={`${fixture.event}-${code}`}>
          <strong className={bem('event')}>{i + 1}</strong>
          <span className={bem('home-or-away', { home: club === fixture.homeTeam })}>
            [{club === fixture.homeTeam ? 'H' : 'A'}]
          </span>
          <span className={bem('fixture')}>
            <span className={bem('team', 'home')}>{fixture.homeTeam} {fixture.homeScore}</span>
            vs
            <span className={bem('team', 'away')}>{fixture.awayScore} {fixture.awayTeam}</span>
          </span>
        </div>
      ))
    }
  </div>
);

ClubFixtures.propTypes = {
  club: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  fixtures: PropTypes.arrayOf(PropTypes.shape({
    homeTeam: PropTypes.string,
    awayTeam: PropTypes.string,
    awayScore: PropTypes.number,
    homeScore: PropTypes.number,
  })).isRequired,
};

export default ClubFixtures;
