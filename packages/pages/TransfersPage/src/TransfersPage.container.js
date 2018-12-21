import { connect } from 'react-redux';
import { actions as dbActions } from '@kammy-ui/redux-players';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';
import { actions as gameWeekActions, selectors as gameWeekSelectors } from '@kammy-ui/redux.game-weeks';
import { actions as divisionActions, selectors as divisionSelectors } from '@kammy-ui/redux.division';
import { actions as transferActions, selectors as transferSelectors } from '@kammy-ui/redux.transfers';

import TransfersPageLoader from './TransfersPage.loader';
import calculateManagerSeason from './lib/manager-season';

const {
  fetchPremierLeague, fetchLeagueOne, fetchChampionship,
} = spreadsheetActions;
const { fetchGameWeeks } = gameWeekActions;

const { fetchAllPlayerData: fetchDbPlayers } = dbActions;
const { fetchCurrentTeams } = divisionActions;
const { fetchTransfers, saveTransfers } = transferActions;

const playersArray = (players) => (
  Object.values(players).map((player) => (
    { value: player.name, label: `${player.name} (${player.pos}) `, key: player.name }
  ))
);


function mapStateToProps(state, { division }) {
  const { count: gameWeeksCount, gameWeeks, currentGameWeek } = gameWeekSelectors.getGameWeeks(state);
  const dateIsInCurrentGameWeek = gameWeekSelectors.dateIsInCurrentGameWeek(state);
  const { transfers } = transferSelectors.getTransfers(state, division);
  const {
    loaded: transfersLoaded, loading: transfersLoading, errors: transfersErrors, saving: transfersSaving,
  } = transferSelectors.getStatus(state, division);

  const { data: divisionTeams } = divisionSelectors.getCurrentTeams(state, division);
  const { loaded: divisionTeamsLoaded } = divisionSelectors.getStatus(state, division);

  const {
    loading: gameWeeksLoading, loaded: gameWeeksLoaded, errors: gameWeeksErrors,
  } = gameWeekSelectors.getStatus(state);

  const props = {
    dateIsInCurrentGameWeek,
    currentGameWeek,
    division,
    divisionTeams,
    divisionTeamsLoaded,
    playersCount: state.players.count,
    playersLoading: state.players.loading,
    playersLoaded: state.players.loaded,
    playersErrors: state.players.errors,
    gameWeeks,
    gameWeeksCount,
    gameWeeksLoading,
    gameWeeksLoaded,
    gameWeeksErrors,
    transfers,
    transfersCount: transfers.length,
    transfersSaving,
    transfersLoading,
    transfersLoaded,
    transfersErrors,
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
  const teams = props[division];
  const players = state.players.data ? Object.values(state.players.data) : null;

  const loaded = (
    state.players.loaded
    && gameWeeksLoaded
    && transfersLoaded
    && state.spreadsheet.premierLeagueLoaded
    && state.spreadsheet.championshipLoaded
    && state.spreadsheet.leagueOneLoaded
  );
  const managersSeason = loaded ? calculateManagerSeason({
    teams,
    gameWeeks,
    players,
    transfers,
    withStats: true,
  }) : {};

  return {
    ...props,
    teams,
    players: players && playersArray(players),
    managersSeason,
    loaded,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchGameWeeks,
    fetchPremierLeague,
    fetchChampionship,
    fetchLeagueOne,
    fetchTransfers,
    saveTransfers,
    fetchDbPlayers,
    fetchCurrentTeams,
  },
)(TransfersPageLoader);
