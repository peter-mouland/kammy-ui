import { connect } from 'react-redux';
import { actions as playerActions, selectors as playerSelectors } from '@kammy-ui/redux.players';

import PlayersPage from './PlayersPage';

const { fetchAllPlayerData } = playerActions;

function mapStateToProps(state) {
  const players = playerSelectors.getAllPlayerData(state);
  return {
    playersLoaded: players.loaded,
    players: players.data,
  };
}

export default connect(
  mapStateToProps,
  { fetchAllPlayerData },
)(PlayersPage);
