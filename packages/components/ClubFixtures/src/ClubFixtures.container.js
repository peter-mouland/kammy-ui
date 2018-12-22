import { connect } from 'react-redux';
import { actions } from '@kammy-ui/redux.players';

import ClubFixturesModal from './ClubFixtures.modal';

const { fetchPlayerFixtures } = actions;

function mapStateToProps(state) {
  return {
    player: state.players.playerFixtures,
    loading: state.players.loading,
    errors: state.players.errors,
  };
}

export default connect(
  mapStateToProps,
  { fetchPlayerFixtures },
)(ClubFixturesModal);
