import { connect } from 'react-redux';
import { actions as skySportActions } from '@kammy-ui/redux-skysports';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';

import TeamsPage from './TeamsPage';

const {
  fetchPlayers: fetchSpreadsheetPlayers, fetchGameWeeks, fetchTransfers, fetchTeams,
} = spreadsheetActions;
const { fetchPlayersFull: fetchSkySportsPlayersFull } = skySportActions;

function mapStateToProps(state) {
  return {
    skySportsPlayers: state.skySports.fullData,
    skySportsPlayersCount: state.skySports.fullDataCount,
    skySportsLoading: state.skySports.loading,
    skySportsLoaded: state.skySports.loaded,
    skySportsErrors: state.skySports.errors,
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
    fetchSpreadsheetPlayers, fetchGameWeeks, fetchTeams, fetchTransfers, fetchSkySportsPlayersFull,
  },
)(TeamsPage);
