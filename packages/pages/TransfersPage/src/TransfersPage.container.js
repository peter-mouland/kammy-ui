import { connect } from 'react-redux';
import { actions as dbActions } from '@kammy-ui/redux-players';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';
import { actions as gameWeekActions, selectors as gameWeekSelectors } from '@kammy-ui/redux.game-weeks';

import TransfersPageLoader from './TransfersPage.loader';

const {
  fetchTransfers, fetchPremierLeague, fetchLeagueOne, fetchChampionship,
} = spreadsheetActions;
const { fetchGameWeeks } = gameWeekActions;

const { fetchAllPlayerData: fetchDbPlayers } = dbActions;

function mapStateToProps(state) {
  const { count: gameWeeksCount, gameWeeks } = gameWeekSelectors.getGameWeeks(state);
  const {
    loading: gameWeeksLoading, loaded: gameWeeksLoaded, errors: gameWeeksErrors,
  } = gameWeekSelectors.getStatus(state);
  const props = {
    players: state.players.data,
    playersCount: state.players.count,
    playersLoading: state.players.loading,
    playersLoaded: state.players.loaded,
    playersErrors: state.players.errors,
    gameWeeks,
    gameWeeksCount,
    gameWeeksLoading,
    gameWeeksLoaded,
    gameWeeksErrors,
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
    && gameWeeksLoaded
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
