/* eslint-disable react/no-deprecated */
import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';

import PlayersPageTable from '@kammy-ui/players-page';

const bem = bemHelper({ block: 'players-page' });

class ChampionshipPlayersPage extends React.Component {
  componentDidMount() {
    const { fetchCurrentTeams, loaded } = this.props;
    if (!loaded) fetchCurrentTeams('Championship');
  }

  render() {
    const { loaded, playersByName } = this.props;

    return (
      <section id="players-page" className={bem(null, 'page-content')}>
        {!loaded && <Interstitial />}
        {loaded && (
          <PlayersPageTable disabledPlayers={playersByName} />
        )}
      </section>
    );
  }
}

ChampionshipPlayersPage.propTypes = {
  loaded: PropTypes.bool,
  fetchCurrentTeams: PropTypes.func,
  playersByName: PropTypes.object,
};

ChampionshipPlayersPage.defaultProps = {
  loaded: false,
  fetchCurrentTeams: () => {},
  playersByName: {},
};

export default ChampionshipPlayersPage;
