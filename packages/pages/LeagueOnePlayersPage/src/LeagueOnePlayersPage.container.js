import { connect } from 'react-redux';
import { actions as dbPlayerActions } from '@kammy-ui/redux-players';
import { actions as divisionActions, selectors as divisionSelectors } from '@kammy-ui/redux.division';

import LeagueOnePlayersPage from './LeagueOnePlayersPage';

const { fetchPlayers } = dbPlayerActions;
const { fetchDivision } = divisionActions;

function mapStateToProps(state) {
  const { data: leagueOne } = divisionSelectors.getData(state);
  const { loaded } = divisionSelectors.getStatus(state);
  return {
    loaded,
    leagueOne,
    players: state.players.data,
  };
}

export default connect(
  mapStateToProps,
  { fetchPlayers, fetchDivision },
)(LeagueOnePlayersPage);
