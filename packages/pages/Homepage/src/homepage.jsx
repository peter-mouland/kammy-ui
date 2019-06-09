import React from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy-ui/bem';
import DivisionRankings from '@kammy-ui/division-rankings';
import Interstitial from '@kammy-ui/interstitial';

const bem = bemHelper({ block: 'home-page' });

class Homepage extends React.Component {
  componentDidMount() {
    const {
      fetchAllPlayerData, fetchGameWeeks, playersLoaded, gameWeeksLoaded,
    } = this.props;
    if (!playersLoaded) fetchAllPlayerData();
    if (!gameWeeksLoaded) fetchGameWeeks();
  }

  render() {
    if (!this.props.loaded) return <Interstitial message='Data Gathering...'/>;
    return (
      <section id="home-page" className={bem()} >
        <DivisionRankings
          label={'Premier League'}
          divisionId={'premierLeague'}
          showGameWeekSwitcher={false}
          showChart={false}
          showWeekly={false}
        />
        <DivisionRankings
          label={'Championship'}
          divisionId={'championship'}
          showGameWeekSwitcher={false}
          showChart={false}
          showWeekly={false}
        />
        <DivisionRankings
          label={'League One'}
          divisionId={'leagueOne'}
          showGameWeekSwitcher={false}
          showChart={false}
          showWeekly={false}
        />
      </section>
    );
  }
}

Homepage.propTypes = {
  fetchAllPlayerData: PropTypes.func,
  fetchGameWeeks: PropTypes.func,
  loaded: PropTypes.bool,
  playersLoaded: PropTypes.bool,
  gameWeeksLoaded: PropTypes.bool,
};

export default Homepage;
