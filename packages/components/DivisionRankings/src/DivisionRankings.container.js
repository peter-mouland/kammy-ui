import { connect } from 'react-redux';
import { actions as dbActions } from '@kammy-ui/redux-players';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';
import { actions as gameWeekActions, selectors as gameWeekSelectors } from '@kammy-ui/redux.game-weeks';
import { actions as transferActions, selectors as transferSelectors } from '@kammy-ui/redux.transfers';

import DivisionStats from './DivisionRankings';
import calculateManagerSeason from './lib/manager-season';

const { fetchTransfers } = transferActions;
const { fetchDivision } = spreadsheetActions;
const { fetchGameWeeks } = gameWeekActions;
const { fetchAllPlayerData: fetchDbPlayers } = dbActions;

function mapStateToProps(state, { divisionId }) {
  const { selectedGameWeek, gameWeeks } = gameWeekSelectors.getGameWeeks(state);
  const { loading: gameWeeksLoading, loaded: gameWeeksLoaded } = gameWeekSelectors.getStatus(state);
  const { transfers } = transferSelectors.getValidTransfers(state, divisionId);
  const {
    loaded: transfersLoaded, loading: transfersLoading, errors: transfersErrors,
  } = transferSelectors.getStatus(state, divisionId);

  const props = {
    players: state.players.data,
    playersCount: state.players.count,
    playersLoading: state.players.loading,
    playersLoaded: state.players.loaded,
    playersErrors: state.players.errors,
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
    props.playersLoaded
    && transfersLoaded
    && gameWeeksLoaded
    && divisionLoaded
  );

  const managersSeason = loaded ? calculateManagerSeason({
    teams,
    gameWeeks,
    players: props.players,
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
  fetchDbPlayers: () => dispatch(fetchDbPlayers()),
  fetchDivision: (division) => dispatch(fetchDivision(division)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DivisionStats);
