import { connect } from 'react-redux';
import { actions as divisionActions, selectors as divisionSelectors } from '@kammy-ui/redux.division';

import ChampionshipPlayersPage from './ChampionshipPlayersPage';

const { fetchCurrentTeams } = divisionActions;

function mapStateToProps(state) {
  const { byName: playersByName } = divisionSelectors.getCurrentPlayers(state, 'Championship');
  const { loaded } = divisionSelectors.getStatus(state, 'Championship');
  return {
    playersByName,
    loaded,
  };
}

export default connect(
  mapStateToProps,
  { fetchCurrentTeams },
)(ChampionshipPlayersPage);
