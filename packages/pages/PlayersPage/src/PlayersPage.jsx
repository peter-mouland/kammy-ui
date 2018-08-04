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
    const { fetchPlayers, loaded } = this.props;
    if (!loaded) fetchPlayers();
  }

  render() {
    const { loaded, players } = this.props;

    return (
      <section id="players-page" className={bem(null, 'page-content')}>
        <h1>Players</h1>
        {!loaded && <Interstitial />}
        {loaded && (
          <ErrorBoundary>
            <PlayersPageTable players={players} />
          </ErrorBoundary>
        )}
      </section>
    );
  }
}

PlayersPage.propTypes = {
  loaded: PropTypes.bool,
  fetchPlayers: PropTypes.func,
  players: PropTypes.object,
};

PlayersPage.defaultProps = {
  fetchPlayers: () => {},
  loaded: false,
  dbPlayers: {},
};

export default PlayersPage;
