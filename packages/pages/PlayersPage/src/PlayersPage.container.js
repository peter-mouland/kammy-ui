import { connect } from 'react-redux';
import { actions as dbPlayerActions } from '@kammy-ui/redux-players';
import { calculatePoints, addPointsToFixtures, totalUpStats } from '@kammy-ui/data-player-stats';

import PlayersPage from './PlayersPage';

const { fetchPlayers } = dbPlayerActions;

const calculatePlayerSeason = (player) => {
  const fixturesWithStats = player.fixtures.map((fixture) => addPointsToFixtures(fixture, player.pos));
  const totalStats = totalUpStats(fixturesWithStats);
  return {
    ...totalStats,
    points: calculatePoints({ stats: totalStats, pos: player.pos }).total,
  };
};

const calculatePlayersSeason = (players) => (
  Object.keys(players).reduce((acc, playerName) => ({
    ...acc,
    [playerName]: {
      ...players[playerName],
      season: calculatePlayerSeason(players[playerName]),
    },
  }), {})
);

function mapStateToProps(state) {
  return {
    loaded: state.players.loaded,
    players: state.players.loaded ? calculatePlayersSeason(state.players.data) : state.players.data,
  };
}

export default connect(
  mapStateToProps,
  { fetchPlayers },
)(PlayersPage);
