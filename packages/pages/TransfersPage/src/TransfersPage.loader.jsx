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
    this.props.fetchDbPlayers();
    this.props.fetchTeams();
    this.props.fetchTransfers();
    this.props.fetchGameWeeks();
  }

  render() {
    const {
      loaded, managersSeason,
      playersLoading, playersCount,
      teamsLoading, teams, teamsCount,
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
              Teams :
              {teamsLoading ? <Interstitial /> : teamsCount}
            </p>
          </div>
        </div>
        {
          loaded && (
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
  managersSeason: PropTypes.object,
  gameWeeks: PropTypes.array,
  teams: PropTypes.object,

  fetchDbPlayers: PropTypes.func.isRequired,
  fetchGameWeeks: PropTypes.func.isRequired,
  fetchTransfers: PropTypes.func.isRequired,
  fetchTeams: PropTypes.func.isRequired,

  playersLoading: PropTypes.bool,
  gameWeeksLoading: PropTypes.bool,
  transfersLoading: PropTypes.bool,
  teamsLoading: PropTypes.bool,

  playersCount: PropTypes.number,
  gameWeeksCount: PropTypes.number,
  transfersCount: PropTypes.number,
  teamsCount: PropTypes.number,
};

TransfersPageLoader.defaultProps = {
  loaded: false,
  playersLoading: false,
  gameWeeksLoading: false,
  transfersLoading: false,
  teamsLoading: false,
  managersSeason: {},
  Players: {},
  PlayersCount: null,
  gameWeeks: [],
  gameWeeksCount: null,
  transfersCount: null,
  teams: {},
  teamsCount: null,
};

export default TransfersPageLoader;