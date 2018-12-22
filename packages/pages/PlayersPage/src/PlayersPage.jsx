/* eslint-disable react/no-deprecated */
import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';
import ErrorBoundary from '@kammy-ui/error-boundary';

import PlayersPageTable from './PlayersPage.table';

const bem = bemHelper({ block: 'players-page' });

class PlayersPage extends React.Component {
  componentDidMount() {
    const { fetchAllPlayerData, playersLoaded } = this.props;
    if (!playersLoaded) fetchAllPlayerData();
  }

  render() {
    const { playersLoaded, players, disabledPlayers } = this.props;

    return (
      <section id="players-page" className={bem(null, 'page-content')}>
        <h1>Players</h1>
        {!playersLoaded && <Interstitial />}
        {playersLoaded && (
          <ErrorBoundary>
            <PlayersPageTable
              players={players}
              disabledPlayers={disabledPlayers}
            />
          </ErrorBoundary>
        )}
      </section>
    );
  }
}

PlayersPage.propTypes = {
  playersLoaded: PropTypes.bool,
  fetchAllPlayerData: PropTypes.func.isRequired,
  players: PropTypes.object,
  disabledPlayers: PropTypes.object,
};

PlayersPage.defaultProps = {
  playersLoaded: false,
  disabledPlayers: {},
};

export default PlayersPage;
