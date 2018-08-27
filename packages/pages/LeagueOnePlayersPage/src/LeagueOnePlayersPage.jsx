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
    const { fetchPlayers, fetchDivision, loaded } = this.props;
    if (!loaded) fetchPlayers();
    if (!loaded) fetchDivision('LeagueOne');
  }

  render() {
    const { loaded, players } = this.props;

    return (
      <section id="players-page" className={bem(null, 'page-content')}>
        <h1>Players</h1>
        {!loaded && <Interstitial />}
        {loaded && (
          <ErrorBoundary>
            <LeagueOnePlayersPageTable players={players} />
          </ErrorBoundary>
        )}
      </section>
    );
  }
}

LeagueOnePlayersPage.propTypes = {
  loaded: PropTypes.bool,
  fetchPlayers: PropTypes.func,
  fetchDivision: PropTypes.func,
  players: PropTypes.object,
};

LeagueOnePlayersPage.defaultProps = {
  fetchPlayers: () => {},
  fetchDivision: () => {},
  loaded: false,
  dbPlayers: {},
};

export default LeagueOnePlayersPage;
