import { connect } from 'react-redux';
import { actions as dbActions } from '@kammy-ui/redux-players';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';

import TeamsPage from './TeamsPage';
import formatGameWeeks from './lib/formatGameWeeks';

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

  const gwTeams = (loaded)
    ? formatGameWeeks({
      teams: props.teams,
      gameWeeks: state.spreadsheet.gameWeeks,
      players: state.players.data,
      transfers: state.spreadsheet.transfers,
    })
    : {};

  return {
    ...props,
    loaded,
    gwTeams,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchGameWeeks, fetchTeams, fetchTransfers, fetchDbPlayers,
  },
)(TeamsPage);
