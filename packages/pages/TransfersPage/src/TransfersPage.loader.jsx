import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import bemHelper from '@kammy-ui/bem';

import TransfersPage from './TransfersPage';

const bem = bemHelper({ block: 'transfers-page' });

class TransfersPageLoader extends React.Component {
  state = { }

  componentDidMount() {
    const {
      fetchPlayers, fetchPremierLeague, fetchChampionship, fetchLeagueOne, fetchTransfers, fetchGameWeeks,
      playersLoaded, premierLeagueLoaded, championshipLoaded, leagueOneLoaded, transfersLoaded, gameWeeksLoaded,
      fetchCurrentTeams, division, divisionTeamsLoaded,
    } = this.props;

    if (!divisionTeamsLoaded) fetchCurrentTeams(division);
    if (!playersLoaded) fetchPlayers();
    if (!premierLeagueLoaded) fetchPremierLeague();
    if (!championshipLoaded) fetchChampionship();
    if (!leagueOneLoaded) fetchLeagueOne();
    if (!transfersLoaded) fetchTransfers(division);
    if (!gameWeeksLoaded) fetchGameWeeks();
  }

  render() {
    return (
      <section id="transfers-page" className={bem(null, 'page-content')}>
        <h1>Transfers</h1>
        <TransfersPage { ...this.props} />
      </section>
    );
  }
}

TransfersPageLoader.propTypes = {
  division: PropTypes.string.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  fetchGameWeeks: PropTypes.func.isRequired,
  fetchTransfers: PropTypes.func.isRequired,
  fetchPremierLeague: PropTypes.func.isRequired,
  fetchChampionship: PropTypes.func.isRequired,
  fetchLeagueOne: PropTypes.func.isRequired,
  fetchCurrentTeams: PropTypes.func.isRequired,
  divisionTeamsLoaded: PropTypes.bool,
  playersLoaded: PropTypes.bool,
  gameWeeksLoaded: PropTypes.bool,
  transfersLoaded: PropTypes.bool,
  premierLeagueLoaded: PropTypes.bool,
  championshipLoaded: PropTypes.bool,
  leagueOneLoaded: PropTypes.bool,
};

TransfersPageLoader.defaultProps = {
  divisionTeamsLoaded: false,
  playersLoaded: false,
  gameWeeksLoaded: false,
  transfersLoaded: false,
  premierLeagueLoaded: false,
  championshipLoaded: false,
  leagueOneLoading: false,
};

TransfersPageLoader.contextTypes = {
  appConfig: PropTypes.object,
};

export default TransfersPageLoader;
