import { connect } from 'react-redux';
import { actions as dbActions } from '@kammy-ui/redux-players';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';

import TransfersPage from './TransfersPage';

const { fetchGameWeeks, fetchTransfers, fetchTeams } = spreadsheetActions;
const { fetchPlayers: fetchDbPlayers } = dbActions;

function mapStateToProps(state) {
  const props = {
    playersCount: state.players.count,
    playersLoading: state.players.loading,
    playersErrors: state.players.errors,
    gameWeeks: state.spreadsheet.gameWeeks,
    gameWeeksCount: state.spreadsheet.gameWeeksCount,
    gameWeeksLoading: state.spreadsheet.gameWeeksLoading,
    gameWeeksErrors: state.spreadsheet.gameWeeksErrors,
    transfersCount: state.spreadsheet.transfersCount,
    transfersLoading: state.spreadsheet.transfersLoading,
    transfersErrors: state.spreadsheet.transfersErrors,
    teams: state.spreadsheet.teams,
    teamsCount: state.spreadsheet.teamsCount,
    teamsLoading: state.spreadsheet.teamsLoading,
    teamsErrors: state.spreadsheet.teamsErrors,
  };

  const loaded = (
    state.players.loaded
    && state.spreadsheet.gameWeeksLoaded
    && state.spreadsheet.transfersLoaded
    && state.spreadsheet.teamsLoaded
  );

  return {
    ...props,
    loaded,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchGameWeeks, fetchTeams, fetchTransfers, fetchDbPlayers,
  },
)(TransfersPage);
