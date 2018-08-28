import { connect } from 'react-redux';
import { actions as dbActions } from '@kammy-ui/redux-players';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';

import TransfersPageLoader from './TransfersPage.loader';

const {
  fetchGameWeeks, fetchTransfers, fetchPremierLeague, fetchLeagueOne, fetchChampionship,
} = spreadsheetActions;
const { fetchAllPlayerData: fetchDbPlayers } = dbActions;

function mapStateToProps(state) {
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
    premierLeague: state.spreadsheet.premierLeague,
    premierLeagueCount: state.spreadsheet.premierLeagueCount,
    premierLeagueLoading: state.spreadsheet.premierLeagueLoading,
    premierLeagueLoaded: state.spreadsheet.premierLeagueLoaded,
    premierLeagueErrors: state.spreadsheet.premierLeagueErrors,
    championship: state.spreadsheet.championship,
    championshipCount: state.spreadsheet.championshipCount,
    championshipLoading: state.spreadsheet.championshipLoading,
    championshipLoaded: state.spreadsheet.championshipLoaded,
    championshipErrors: state.spreadsheet.championshipErrors,
    leagueOne: state.spreadsheet.leagueOne,
    leagueOneCount: state.spreadsheet.leagueOneCount,
    leagueOneLoading: state.spreadsheet.leagueOneLoading,
    leagueOneLoaded: state.spreadsheet.leagueOneLoaded,
    leagueOneErrors: state.spreadsheet.leagueOneErrors,
  };

  const loaded = (
    state.players.loaded
    && state.spreadsheet.gameWeeksLoaded
    && state.spreadsheet.transfersLoaded
    && state.spreadsheet.premierLeagueLoaded
    && state.spreadsheet.championshipLoaded
    && state.spreadsheet.leagueOneLoaded
  );

  return {
    ...props,
    loaded,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchGameWeeks, fetchPremierLeague, fetchChampionship, fetchLeagueOne, fetchTransfers, fetchDbPlayers,
  },
)(TransfersPageLoader);
