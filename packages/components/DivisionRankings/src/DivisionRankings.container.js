import { connect } from 'react-redux';
import { actions as dbActions } from '@kammy-ui/redux-players';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';
import { actions as gameWeekActions, selectors as gameWeekSelectors } from '@kammy-ui/redux.game-weeks';

import DivisionStats from './DivisionRankings';
import calculateManagerSeason from './lib/manager-season';

const { fetchTransfers, fetchDivision } = spreadsheetActions;
const { fetchGameWeeks } = gameWeekActions;
const { fetchAllPlayerData: fetchDbPlayers } = dbActions;

function mapStateToProps(state, ownProps) {
  const { selectedGameWeek, data: gameWeeks } = gameWeekSelectors.getData(state);
  const { loading: gameWeeksLoading, loaded: gameWeeksLoaded } = gameWeekSelectors.getStatus(state);
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
    transfers: state.spreadsheet.transfers,
    transfersCount: state.spreadsheet.transfersCount,
    transfersLoading: state.spreadsheet.transfersLoading,
    transfersLoaded: state.spreadsheet.transfersLoaded,
    transfersErrors: state.spreadsheet.transfersErrors,
  };
  const teams = state.spreadsheet[ownProps.divisionId];
  const divisionLoaded = state.spreadsheet[`${ownProps.divisionId}Loaded`];

  const loaded = (
    state.players.loaded
    && gameWeeksLoaded
    && state.spreadsheet.transfersLoaded
    && divisionLoaded
  );

  const managersSeason = loaded ? calculateManagerSeason({
    teams,
    gameWeeks,
    players: props.players,
    transfers: props.transfers,
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
  fetchTransfers: () => dispatch(fetchTransfers()),
  fetchDbPlayers: () => dispatch(fetchDbPlayers()),
  fetchDivision: (division) => dispatch(fetchDivision(division)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DivisionStats);
