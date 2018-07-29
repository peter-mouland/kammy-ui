import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';

import calculateManagerSeason from './lib/manager-season';
import TransfersPage from './TransfersPage';

const bem = bemHelper({ block: 'transfers-page' });

class TransfersPageLoader extends React.Component {
  state = { }

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

  updateDivision = (division) => {
    const {
      premiership, championship, leagueOne, gameWeeks, players, transfers,
    } = this.props;
    const { divisionSheets } = this.context.appConfig;

    const divisions = {
      premiership, championship, leagueOne,
    };

    const teams = divisions[divisionSheets[division]];
    const managersSeason = calculateManagerSeason({
      teams,
      gameWeeks,
      players,
      transfers,
      withStats: true,
    });
    this.setState({ division, managersSeason, teams });
  };

  render() {
    const {
      loaded,
      playersLoading, playersCount,
      premiershipLoading, premiershipCount,
      championshipLoading, championshipCount,
      leagueOneLoading, leagueOneCount,
      gameWeeksLoading, gameWeeks, gameWeeksCount,
      transfersLoading, transfersCount,
    } = this.props;
    const { division, managersSeason, teams } = this.state;
    const { divisionLabels } = this.context.appConfig;
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
        <h2>Change Team-Sheet</h2>
        {
          loaded && (
            <MultiToggle
              label={'Which division are you in?'}
              id={'division'}
              options={divisionLabels}
              checked={division}
              onChange={this.updateDivision}
            />
          )
        }
        {
          loaded && managersSeason && (
            <TransfersPage
              managersSeason={managersSeason}
              teams={teams}
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
  players: PropTypes.object,
  transfers: PropTypes.object,
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
  transfers: {},
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

TransfersPageLoader.contextTypes = {
  appConfig: PropTypes.object,
};

export default TransfersPageLoader;
