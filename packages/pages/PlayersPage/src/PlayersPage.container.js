import { connect } from 'react-redux';
import { actions as dbPlayerActions } from '@kammy-ui/redux-players';

import PlayersPage from './PlayersPage';

const { fetchPlayers } = dbPlayerActions;

function mapStateToProps(state) {
  return {
    loaded: state.players.loaded,
    players: state.players.data,
  };
}

export default connect(
  mapStateToProps,
  { fetchPlayers },
)(PlayersPage);
