import { connect } from 'react-redux';

import { actions } from '@kammy-ui/redux-players';
import Players from './Players';

const { fetchAllPlayerData: fetchPlayers, fetchPositions } = actions;

function mapStateToProps(state) {
  const {
    loadingDeprecated: loading,
    errorsDeprecated: errors,
    dataDeprecated: data,
  } = state.players;
  return {
    players: data, loading, errors,
  };
}

const WrappedComponent = connect(
  mapStateToProps,
  { fetchPlayers, fetchPositions },
)(Players);

export default WrappedComponent;
