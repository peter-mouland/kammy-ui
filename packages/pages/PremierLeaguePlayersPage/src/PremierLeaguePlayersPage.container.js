import { connect } from 'react-redux';
import { actions as divisionActions, selectors as divisionSelectors } from '@kammy-ui/redux.division';

import PremierLeaguePlayersPage from './PremierLeaguePlayersPage';

const { fetchCurrentTeams } = divisionActions;

function mapStateToProps(state) {
  const { byName: playersByName } = divisionSelectors.getCurrentPlayers(state, 'PremierLeague');
  const { loaded } = divisionSelectors.getStatus(state, 'PremierLeague');
  return {
    playersByName,
    loaded,
  };
}

export default connect(
  mapStateToProps,
  { fetchCurrentTeams },
)(PremierLeaguePlayersPage);
