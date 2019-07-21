import { connect } from 'react-redux';
import { actions as playerActions, selectors as playerSelectors } from '@kammy-ui/redux.players';
import { actions as gameWeekActions, selectors as gameWeekSelectors } from '@kammy-ui/redux.game-weeks';
import { actions as transferActions, selectors as transferSelectors } from '@kammy-ui/redux.transfers';
import { actions as divisionActions, selectors as divisionSelectors } from '@kammy-ui/redux.division';
import { selectors as draftSetupSelectors } from '@kammy-ui/redux.draft-setup';

import { withCookies } from 'react-cookie';

import DivisionStats from './DivisionStats';

const { fetchDivision } = divisionActions;
const { fetchAllPlayerData } = playerActions;
const { fetchGameWeeks } = gameWeekActions;
const { fetchTransfers } = transferActions;

function mapStateToProps(state, { divisionId }) {
  const players = playerSelectors.getAllPlayerData(state);
  const { selectedGameWeek } = gameWeekSelectors.getGameWeeks(state);
  const { loaded: gameWeeksLoaded } = gameWeekSelectors.getStatus(state);
  const { loaded: divisionLoaded } = divisionSelectors.getStatus(state, divisionId);
  const managersSeason = divisionSelectors[divisionId].season(state) || {};
  const { transfers } = transferSelectors[`${divisionId}Valid`](state);
  const {
    loaded: transfersLoaded, loading: transfersLoading, errors: transfersErrors,
  } = transferSelectors.getStatus(state, divisionId);
  const { byDivision } = draftSetupSelectors.getDraftSetup(state);

  const props = {
    selectedGameWeek,
    gameWeeksLoaded,
    managers: byDivision.managers[divisionId],
    players: players.data,
    playersCount: players.count,
    playersLoading: players.loading,
    playersLoaded: players.loaded,
    playersErrors: players.errors,
    divisionId,
    transfers,
    transfersCount: transfers.length,
    transfersLoading,
    transfersLoaded,
    transfersErrors,
  };

  const loaded = (
    players.loaded
    && transfersLoaded
    && gameWeeksLoaded
    && divisionLoaded
  );

  return {
    ...props,
    divisionLoaded,
    managersSeason,
    loaded,
  };
}


const mapDispatchToProps = (dispatch) => ({
  fetchGameWeeks: () => dispatch(fetchGameWeeks()),
  fetchTransfers: (division) => dispatch(fetchTransfers(division)),
  fetchAllPlayerData: () => dispatch(fetchAllPlayerData()),
  fetchDivision: (division) => dispatch(fetchDivision(division)),
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(DivisionStats));
