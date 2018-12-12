import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';

import calculateManagerSeason from './lib/manager-season';
import TransfersPage from './TransfersPage';

const bem = bemHelper({ block: 'transfers-page' });

const playersArray = (players) => (
  Object.values(players).map((player) => ({ value: player.name, label: player.name, key: player.name }))
);

class TransfersPageLoader extends React.Component {
  state = { }

  componentDidMount() {
    const {
      fetchDbPlayers, fetchPremierLeague, fetchChampionship, fetchLeagueOne, fetchTransfers, fetchGameWeeks,
      playersLoaded, premierLeagueLoaded, championshipLoaded, leagueOneLoaded, transfersLoaded, gameWeeksLoaded,
    } = this.props;
    if (!playersLoaded) fetchDbPlayers();
    if (!premierLeagueLoaded) fetchPremierLeague();
    if (!championshipLoaded) fetchChampionship();
    if (!leagueOneLoaded) fetchLeagueOne();
    if (!transfersLoaded) fetchTransfers();
    if (!gameWeeksLoaded) fetchGameWeeks();
  }

  getTransferPageProps = () => {
    const {
      premierLeague, championship, leagueOne, gameWeeks, players, transfers, division,
    } = this.props;

    const divisions = {
      premierLeague, championship, leagueOne,
    };

    const teams = divisions[division];
    const managersSeason = calculateManagerSeason({
      teams,
      gameWeeks,
      players,
      transfers,
      withStats: true,
    });

    return {
      gameWeeks, managersSeason, teams, players: playersArray(players),
    };
  };

  render() {
    const {
      loaded, playersLoading, playersCount, transfersLoading, transfersCount,
    } = this.props;
    return (
      <section id="transfers-page" className={bem(null, 'page-content')}>
        <h1>Transfers</h1>
        <p>
          some stats while you wait...
        </p>
        <p>
          Players :
          {playersLoading ? <Interstitial /> : playersCount}
        </p>
        <p>
          Transfers :
          {transfersLoading ? <Interstitial /> : transfersCount}
        </p>
        {
          loaded && (
            <TransfersPage { ...this.getTransferPageProps()} />
          )
        }
      </section>
    );
  }
}

TransfersPageLoader.propTypes = {
  division: PropTypes.string.isRequired,
  loaded: PropTypes.bool,
  players: PropTypes.object,
  transfers: PropTypes.object,
  managersSeason: PropTypes.object,
  gameWeeks: PropTypes.array,
  premierLeague: PropTypes.object,
  championship: PropTypes.object,
  leagueOne: PropTypes.object,

  fetchDbPlayers: PropTypes.func.isRequired,
  fetchGameWeeks: PropTypes.func.isRequired,
  fetchTransfers: PropTypes.func.isRequired,
  fetchPremierLeague: PropTypes.func.isRequired,
  fetchChampionship: PropTypes.func.isRequired,
  fetchLeagueOne: PropTypes.func.isRequired,

  playersLoading: PropTypes.bool,
  gameWeeksLoading: PropTypes.bool,
  transfersLoading: PropTypes.bool,
  premierLeagueLoading: PropTypes.bool,
  championshipLoading: PropTypes.bool,
  leagueOneLoading: PropTypes.bool,

  playersLoaded: PropTypes.bool,
  gameWeeksLoaded: PropTypes.bool,
  transfersLoaded: PropTypes.bool,
  premierLeagueLoaded: PropTypes.bool,
  championshipLoaded: PropTypes.bool,
  leagueOneLoaded: PropTypes.bool,

  playersCount: PropTypes.number,
  gameWeeksCount: PropTypes.number,
  transfersCount: PropTypes.number,
  premierLeagueCount: PropTypes.number,
  championshipCount: PropTypes.number,
  leagueOneCount: PropTypes.number,
};

TransfersPageLoader.defaultProps = {
  loaded: false,
  playersLoading: false,
  gameWeeksLoading: false,
  transfersLoading: false,
  premierLeagueLoading: false,
  championshipLoading: false,
  playersLoaded: false,
  gameWeeksLoaded: false,
  transfersLoaded: false,
  premierLeagueLoaded: false,
  championshipLoaded: false,
  leagueOneLoading: false,
  premierLeagueSeason: {},
  transfers: {},
  Players: {},
  PlayersCount: null,
  gameWeeks: [],
  gameWeeksCount: null,
  transfersCount: null,
  premierLeague: {},
  premierLeagueCount: null,
  championship: {},
  championshipCount: null,
  leagueOne: {},
  leagueOneCount: null,
};

TransfersPageLoader.contextTypes = {
  appConfig: PropTypes.object,
};

export default TransfersPageLoader;
