import { connect } from 'react-redux';
import { actions as dbActions } from '@kammy-ui/redux-players';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';

import TeamsPage from './TeamsPage';

const {
  fetchPlayers: fetchSpreadsheetPlayers, fetchGameWeeks, fetchTransfers, fetchTeams,
} = spreadsheetActions;
const { fetchPlayers: fetchDbPlayers } = dbActions;

function mapStateToProps(state) {
  return {
    dbPlayers: state.players.data,
    dbPlayersCount: state.players.count,
    dbLoading: state.players.loading,
    dbLoaded: state.players.loaded,
    dbErrors: state.players.errors,
    spreadsheetPlayers: state.spreadsheet.players,
    spreadsheetPlayersCount: state.spreadsheet.playersCount,
    spreadsheetPlayersLoading: state.spreadsheet.playersLoading,
    spreadsheetPlayersLoaded: state.spreadsheet.playersLoaded,
    spreadsheetPlayersErrors: state.spreadsheet.playersErrors,
    spreadsheetGameWeeks: state.spreadsheet.gameWeeks,
    spreadsheetGameWeeksCount: state.spreadsheet.gameWeeksCount,
    spreadsheetGameWeeksLoading: state.spreadsheet.gameWeeksLoading,
    spreadsheetGameWeeksLoaded: state.spreadsheet.gameWeeksLoaded,
    spreadsheetGameWeeksErrors: state.spreadsheet.gameWeeksErrors,
    spreadsheetTransfers: state.spreadsheet.transfers,
    spreadsheetTransfersCount: state.spreadsheet.transfersCount,
    spreadsheetTransfersLoading: state.spreadsheet.transfersLoading,
    spreadsheetTransfersLoaded: state.spreadsheet.transfersLoaded,
    spreadsheetTransfersErrors: state.spreadsheet.transfersErrors,
    spreadsheetTeams: state.spreadsheet.teams,
    spreadsheetTeamsCount: state.spreadsheet.teamsCount,
    spreadsheetTeamsLoading: state.spreadsheet.teamsLoading,
    spreadsheetTeamsLoaded: state.spreadsheet.teamsLoaded,
    spreadsheetTeamsErrors: state.spreadsheet.teamsErrors,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchSpreadsheetPlayers, fetchGameWeeks, fetchTeams, fetchTransfers, fetchDbPlayers,
  },
)(TeamsPage);
