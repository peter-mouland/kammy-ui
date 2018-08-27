/* eslint-disable react/no-deprecated */
import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';
import ErrorBoundary from '@kammy-ui/error-boundary';

import LeagueOnePlayersPageTable from './LeagueOnePlayersPage.table';

const bem = bemHelper({ block: 'players-page' });

class LeagueOnePlayersPage extends React.Component {
  componentDidMount() {
    const {
      fetchPlayers, fetchCurrentTeams, leagueOneLoaded, playersLoaded,
    } = this.props;
    if (!playersLoaded) fetchPlayers();
    if (!leagueOneLoaded) fetchCurrentTeams('LeagueOne');
  }

  render() {
    const { loaded, players, leagueOnePlayersByName } = this.props;

    return (
      <section id="players-page" className={bem(null, 'page-content')}>
        <h1>Players</h1>
        {!loaded && <Interstitial />}
        {loaded && (
          <ErrorBoundary>
            <LeagueOnePlayersPageTable
              players={players}
              disabledPlayers={leagueOnePlayersByName}
            />
          </ErrorBoundary>
        )}
      </section>
    );
  }
}

LeagueOnePlayersPage.propTypes = {
  loaded: PropTypes.bool,
  playersLoaded: PropTypes.bool,
  leagueOneLoaded: PropTypes.bool,
  fetchPlayers: PropTypes.func,
  fetchCurrentTeams: PropTypes.func,
  players: PropTypes.object,
  leagueOnePlayersByName: PropTypes.object,
};

LeagueOnePlayersPage.defaultProps = {
  fetchPlayers: () => {},
  fetchCurrentTeams: () => {},
  loaded: false,
  playersLoaded: false,
  leagueOneLoaded: false,
  dbPlayers: {},
  leagueOnePlayersByName: {},
};

export default LeagueOnePlayersPage;
