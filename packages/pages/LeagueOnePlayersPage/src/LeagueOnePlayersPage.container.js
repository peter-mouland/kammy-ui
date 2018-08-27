import { connect } from 'react-redux';
import { actions as divisionActions, selectors as divisionSelectors } from '@kammy-ui/redux.division';

import LeagueOnePlayersPage from './LeagueOnePlayersPage';

const { fetchCurrentTeams } = divisionActions;

function mapStateToProps(state) {
  const { byName: playersByName } = divisionSelectors.getCurrentPlayers(state, 'LeagueOne');
  const { loaded } = divisionSelectors.getStatus(state, 'LeagueOne');
  return {
    playersByName,
    loaded,
  };
}

export default connect(
  mapStateToProps,
  { fetchCurrentTeams },
)(LeagueOnePlayersPage);
