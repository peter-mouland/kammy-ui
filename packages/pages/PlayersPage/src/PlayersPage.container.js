import { connect } from 'react-redux';
import { actions as divisionActions, selectors as divisionSelectors } from '@kammy-ui/redux.division';
import { actions as playerActions, selectors as playerSelectors } from '@kammy-ui/redux.players';

import PlayersPage from './PlayersPage';

const { fetchCurrentTeams } = divisionActions;
const { fetchAllPlayerData } = playerActions;

function mapStateToProps(state, { division }) { // PremierLeague, Championship, LeagueOne
  const { byName: playersByName } = divisionSelectors.getCurrentPlayers(state, division);
  const divisionStatus = divisionSelectors.getStatus(state, division);
  const players = playerSelectors.getAllPlayerData(state);
  return {
    playersByName,
    divisionLoaded: divisionStatus.loaded,
    playersLoaded: players.loaded,
    players: players.data,
    loaded: players.loaded && divisionStatus.loaded,
  };
}

export default connect(
  mapStateToProps,
  { fetchCurrentTeams, fetchAllPlayerData },
)(PlayersPage);
