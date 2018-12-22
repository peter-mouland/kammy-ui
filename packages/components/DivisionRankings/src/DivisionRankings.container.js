import { connect } from 'react-redux';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';
import { actions as playerActions, selectors as playerSelectors } from '@kammy-ui/redux.players';
import { actions as gameWeekActions, selectors as gameWeekSelectors } from '@kammy-ui/redux.game-weeks';
import { actions as transferActions, selectors as transferSelectors } from '@kammy-ui/redux.transfers';

import DivisionStats from './DivisionRankings';
import calculateManagerSeason from './lib/manager-season';

const { fetchTransfers } = transferActions;
const { fetchDivision } = spreadsheetActions;
const { fetchGameWeeks } = gameWeekActions;
const { fetchAllPlayerData } = playerActions;

function mapStateToProps(state, { divisionId }) {
  const players = playerSelectors.getAllPlayerData(state);
  const { gameWeeks, selectedGameWeek } = gameWeekSelectors.getGameWeeks(state);
  const { transfers } = transferSelectors.getValidTransfers(state, divisionId);

  const {
    loaded: transfersLoaded, loading: transfersLoading, errors: transfersErrors,
  } = transferSelectors.getStatus(state, divisionId);

  const {
    loading: gameWeeksLoading, loaded: gameWeeksLoaded,
  } = gameWeekSelectors.getStatus(state);

  const props = {
    players: players.data,
    playersCount: players.count,
    playersLoading: players.loading,
    playersLoaded: players.loaded,
    playersErrors: players.errors,
    selectedGameWeek,
    gameWeeks,
    gameWeeksLoading,
    gameWeeksLoaded,
    transfers,
    transfersCount: transfers.length,
    transfersLoading,
    transfersLoaded,
    transfersErrors,
  };

  const teams = state.spreadsheet[divisionId];
  const divisionLoaded = state.spreadsheet[`${divisionId}Loaded`];

  const loaded = (
    players.loaded
    && transfersLoaded
    && gameWeeksLoaded
    && divisionLoaded
  );

  const managersSeason = loaded ? calculateManagerSeason({
    teams,
    gameWeeks,
    players: players.data,
    transfers,
    withStats: true,
  }) : null;

  return {
    ...props,
    teams,
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

export default connect(mapStateToProps, mapDispatchToProps)(DivisionStats);
