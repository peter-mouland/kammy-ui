import { connect } from 'react-redux';
import { actions as dbPlayerActions } from '@kammy-ui/redux-players';

import PlayersPage from './PlayersPage';

const { fetchAllPlayerData: fetchPlayers } = dbPlayerActions;

function mapStateToProps(state) {
  return {
    playersLoaded: state.players.loadedDeprecated,
    players: state.players.dataDeprecated,
  };
}

export default connect(
  mapStateToProps,
  { fetchPlayers },
)(PlayersPage);
