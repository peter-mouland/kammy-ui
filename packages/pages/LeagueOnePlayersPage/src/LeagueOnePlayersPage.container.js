import { connect } from 'react-redux';
import { actions as dbPlayerActions } from '@kammy-ui/redux-players';
import { actions as divisionActions, selectors as divisionSelectors } from '@kammy-ui/redux.division';

import LeagueOnePlayersPage from './LeagueOnePlayersPage';

const { fetchPlayers } = dbPlayerActions;
const { fetchCurrentTeams } = divisionActions;

function mapStateToProps(state) {
  const { byName: leagueOnePlayersByName } = divisionSelectors.getCurrentPlayers(state, 'LeagueOne');
  const { loaded: leagueOneLoaded } = divisionSelectors.getStatus(state, 'LeagueOne');
  return {
    leagueOnePlayersByName,
    leagueOneLoaded,
    players: state.players.data,
    playersLoaded: state.players.loaded,
    loaded: leagueOneLoaded && state.players.loaded,
  };
}

export default connect(
  mapStateToProps,
  { fetchPlayers, fetchCurrentTeams },
)(LeagueOnePlayersPage);
