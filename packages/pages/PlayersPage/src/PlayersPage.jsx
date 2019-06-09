/* eslint-disable react/no-deprecated */
import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';

import PlayersPageTable from './players-page.table';

const bem = bemHelper({ block: 'players-page' });

class PlayersPage extends React.Component {
  componentDidMount() {
    const {
      fetchCurrentTeams, fetchAllPlayerData, playersLoaded, divisionLoaded, division,
    } = this.props;
    if (!divisionLoaded) fetchCurrentTeams(division);
    if (!playersLoaded) fetchAllPlayerData();
  }

  render() {
    const {
      playersByName, label, loaded, players,
    } = this.props;

    return (
      <section id="players-page" className={bem(null, 'page-content')} data-b-layout="container">
        <h1>{label}</h1>
        {!loaded && <Interstitial />}
        {loaded && (
          <PlayersPageTable disabledPlayers={playersByName} players={players} />
        )}
      </section>
    );
  }
}

PlayersPage.propTypes = {
  division: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  fetchAllPlayerData: PropTypes.func.isRequired,
  fetchCurrentTeams: PropTypes.func.isRequired,
  loaded: PropTypes.bool,
  divisionLoaded: PropTypes.bool,
  playersLoaded: PropTypes.bool,
  players: PropTypes.object,
  playersByName: PropTypes.object,
};

PlayersPage.defaultProps = {
  loaded: false,
  playersLoaded: false,
  divisionLoaded: false,
  playersByName: {},
  players: {},
};

export default PlayersPage;
