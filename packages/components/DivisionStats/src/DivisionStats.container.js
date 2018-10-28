import { connect } from 'react-redux';
import { actions as dbActions } from '@kammy-ui/redux-players';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';
import { actions as gameWeekActions, selectors as gameWeekSelectors } from '@kammy-ui/redux.game-weeks';
import { actions as divisionActions, selectors as divisionSelectors } from '@kammy-ui/redux.division';

import DivisionStats from './DivisionStats';
import calculateManagerSeason from './lib/manager-season';

const { fetchTransfers, fetchDivision } = spreadsheetActions;
const { fetchAllPlayerData: fetchDbPlayers } = dbActions;
const { fetchGameWeeks } = gameWeekActions;

function mapStateToProps(state, ownProps) {
  const { gameWeeks, selectedGameWeek } = gameWeekSelectors.getGameWeeks(state);
  const { loaded: gameWeeksLoaded } = gameWeekSelectors.getStatus(state);
  const props = {
    selectedGameWeek,
    gameWeeksLoaded,
    players: state.players.data,
    playersCount: state.players.count,
    playersLoading: state.players.loading,
    playersLoaded: state.players.loaded,
    playersErrors: state.players.errors,
    transfers: state.spreadsheet.transfers,
    transfersCount: state.spreadsheet.transfersCount,
    transfersLoading: state.spreadsheet.transfersLoading,
    transfersLoaded: state.spreadsheet.transfersLoaded,
    transfersErrors: state.spreadsheet.transfersErrors,
  };
  const division = state.spreadsheet[ownProps.divisionId];
  const divisionLoaded = state.spreadsheet[`${ownProps.divisionId}Loaded`];

  const loaded = (
    state.players.loaded
    && state.spreadsheet.transfersLoaded
    && gameWeeksLoaded
    && divisionLoaded
  );

  const managersSeason = loaded ? calculateManagerSeason({
    teams: division,
    gameWeeks,
    players: props.players,
    transfers: props.transfers,
    withStats: true,
  }) : null;

  return {
    ...props,
    division,
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
