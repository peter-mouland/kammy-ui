/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';

import TransfersPage from './TransfersPage';

const bem = bemHelper({ block: 'transfers-page' });

class TransfersPageLoader extends React.Component {
  componentDidMount() {
    const {
      fetchDbPlayers, fetchPremiership, fetchChampionship, fetchLeagueOne, fetchTransfers, fetchGameWeeks,
      playersLoaded, premiershipLoaded, championshipLoaded, leagueOneLoaded, transfersLoaded, gameWeeksLoaded,
    } = this.props;
    if (!playersLoaded) fetchDbPlayers();
    if (!premiershipLoaded) fetchPremiership();
    if (!championshipLoaded) fetchChampionship();
    if (!leagueOneLoaded) fetchLeagueOne();
    if (!transfersLoaded) fetchTransfers();
    if (!gameWeeksLoaded) fetchGameWeeks();
  }

  render() {
    const {
      loaded, premiershipSeason,
      playersLoading, playersCount,
      premiershipLoading, premiership, premiershipCount,
      championshipLoading, championship, championshipCount,
      leagueOneLoading, leagueOne, leagueOneCount,
      gameWeeksLoading, gameWeeks, gameWeeksCount,
      transfersLoading, transfersCount,
    } = this.props;
    return (
      <section id="transfers-page" className={bem()}>
        <h1>Transfers</h1>
        <div>
          <p>
            The purpose of this page is to enable managers to make transfers that do not violate the rules.
          </p>
        </div>
        <div className="page-content">
          <h3>Data Gathering...</h3>
          <div>
            <p>
              Players :
              {playersLoading ? <Interstitial /> : playersCount}
            </p>
            <p>
              GameWeeks :
              {gameWeeksLoading ? <Interstitial /> : gameWeeksCount}
            </p>
            <p>
              Transfers :
              {transfersLoading ? <Interstitial /> : transfersCount}
            </p>
            <p>
              Premiership Teams :
              {premiershipLoading ? <Interstitial /> : premiershipCount}
            </p>
            <p>
              Championship Teams :
              {championshipLoading ? <Interstitial /> : championshipCount}
            </p>
            <p>
              League One Teams :
              {leagueOneLoading ? <Interstitial /> : leagueOneCount}
            </p>
          </div>
        </div>
        {
          loaded && (
            <TransfersPage
              managersSeason={premiershipSeason}
              teams={premiership}
              gameWeeks={gameWeeks}
            />
          )
        }
      </section>
    );
  }
}

TransfersPageLoader.propTypes = {
  loaded: PropTypes.bool,
  managersSeason: PropTypes.object,
  gameWeeks: PropTypes.array,
  premiership: PropTypes.object,
  championship: PropTypes.object,
  leagueOne: PropTypes.object,

  fetchDbPlayers: PropTypes.func.isRequired,
  fetchGameWeeks: PropTypes.func.isRequired,
  fetchTransfers: PropTypes.func.isRequired,
  fetchPremiership: PropTypes.func.isRequired,
  fetchChampionship: PropTypes.func.isRequired,
  fetchLeagueOne: PropTypes.func.isRequired,

  playersLoading: PropTypes.bool,
  gameWeeksLoading: PropTypes.bool,
  transfersLoading: PropTypes.bool,
  premiershipLoading: PropTypes.bool,
  championshipLoading: PropTypes.bool,
  leagueOneLoading: PropTypes.bool,

  playersLoaded: PropTypes.bool,
  gameWeeksLoaded: PropTypes.bool,
  transfersLoaded: PropTypes.bool,
  premiershipLoaded: PropTypes.bool,
  championshipLoaded: PropTypes.bool,
  leagueOneLoaded: PropTypes.bool,

  playersCount: PropTypes.number,
  gameWeeksCount: PropTypes.number,
  transfersCount: PropTypes.number,
  premiershipCount: PropTypes.number,
  championshipCount: PropTypes.number,
  leagueOneCount: PropTypes.number,
};

TransfersPageLoader.defaultProps = {
  loaded: false,
  playersLoading: false,
  gameWeeksLoading: false,
  transfersLoading: false,
  premiershipLoading: false,
  championshipLoading: false,
  playersLoaded: false,
  gameWeeksLoaded: false,
  transfersLoaded: false,
  premiershipLoaded: false,
  championshipLoaded: false,
  leagueOneLoading: false,
  premiershipSeason: {},
  Players: {},
  PlayersCount: null,
  gameWeeks: [],
  gameWeeksCount: null,
  transfersCount: null,
  premiership: {},
  premiershipCount: null,
  championship: {},
  championshipCount: null,
  leagueOne: {},
  leagueOneCount: null,
};

export default TransfersPageLoader;
