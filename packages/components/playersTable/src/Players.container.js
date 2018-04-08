import { connect } from 'react-redux';

import { actions } from '@kammy/redux-players';
import Players from './Players';

const { fetchPlayers, fetchPositions } = actions;

function mapStateToProps(state) {
  const {
    loading,
    errors,
    data,
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
