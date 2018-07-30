import { connect } from 'react-redux';
import { actions as dbActions } from '@kammy-ui/redux-players';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';

import DivisionStats from './DivisionStats';
import calculateManagerSeason from './lib/manager-season';

const {
  fetchGameWeeks, fetchTransfers, fetchDivision,
} = spreadsheetActions;
const { fetchPlayers: fetchDbPlayers } = dbActions;

function mapStateToProps(state, ownProps) {
  const props = {
    players: state.players.data,
    playersCount: state.players.count,
    playersLoading: state.players.loading,
    playersLoaded: state.players.loaded,
    playersErrors: state.players.errors,
    gameWeeks: state.spreadsheet.gameWeeks,
    gameWeeksCount: state.spreadsheet.gameWeeksCount,
    gameWeeksLoading: state.spreadsheet.gameWeeksLoading,
    gameWeeksLoaded: state.spreadsheet.gameWeeksLoaded,
    gameWeeksErrors: state.spreadsheet.gameWeeksErrors,
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
    && state.spreadsheet.gameWeeksLoaded
    && state.spreadsheet.transfersLoaded
    && divisionLoaded
  );

  const managersSeason = loaded ? calculateManagerSeason({
    teams: division,
    gameWeeks: props.gameWeeks,
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


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DivisionStats);
