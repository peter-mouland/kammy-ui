import { connect } from 'react-redux';
import { actions as playerActions, selectors as playerSelectors } from '@kammy-ui/redux.players';
import { actions as gameWeekActions, selectors as gameWeekSelectors } from '@kammy-ui/redux.game-weeks';
import { actions as divisionActions, selectors as divisionSelectors } from '@kammy-ui/redux.division';
import { actions as transferActions, selectors as transferSelectors } from '@kammy-ui/redux.transfers';

import TransfersPageLoader from './TransfersPage.loader';

const { fetchGameWeeks } = gameWeekActions;
const { fetchPlayers } = playerActions;
const { fetchCurrentTeams } = divisionActions;
const { fetchTransfers, saveTransfers } = transferActions;

function mapStateToProps(state, { division }) {
  const { count: gameWeeksCount, gameWeeks, currentGameWeek } = gameWeekSelectors.getGameWeeks(state);
  const dateIsInCurrentGameWeek = gameWeekSelectors.dateIsInCurrentGameWeek(state);
  const players = playerSelectors.getPlayers(state);
  const { allRequests: transfers } = transferSelectors.getTransfers(state, division);
  const {
    loaded: transfersLoaded, loading: transfersLoading, errors: transfersErrors, saving: transfersSaving,
  } = transferSelectors.getStatus(state, division);

  const { data: teams } = divisionSelectors.getCurrentTeams(state, division);
  const { data: pendingTransfers } = divisionSelectors.getPendingTransfers(state, division);
  const { loaded: teamsLoaded } = divisionSelectors.getStatus(state, division);

  const {
    loading: gameWeeksLoading, loaded: gameWeeksLoaded, errors: gameWeeksErrors,
  } = gameWeekSelectors.getStatus(state);

  const props = {
    pendingTransfers,
    dateIsInCurrentGameWeek,
    currentGameWeek,
    division,
    teams,
    teamsLoaded,
    players: players.data,
    playersArray: players.playersArray,
    playersCount: players.count,
    playersLoading: players.loading,
    playersLoaded: players.loaded,
    playersErrors: players.errors,
    gameWeeks,
    gameWeeksCount,
    gameWeeksLoading,
    gameWeeksLoaded,
    gameWeeksErrors,
    transfers,
    transfersCount: transfers.length,
    transfersSaving,
    transfersLoading,
    transfersLoaded,
    transfersErrors,
  };

  const loaded = (
    players.loaded
    && gameWeeksLoaded
    && transfersLoaded
    && teamsLoaded
  );

  return {
    ...props,
    teams,
    loaded,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchGameWeeks,
    fetchTransfers,
    saveTransfers,
    fetchPlayers,
    fetchCurrentTeams,
  },
)(TransfersPageLoader);
