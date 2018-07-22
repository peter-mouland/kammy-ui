import { connect } from 'react-redux';
import { actions as dbActions } from '@kammy-ui/redux-players';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';
import TeamSeason from '@kammy-ui/data-team-season';

import TeamsPage from './TeamsPage';

const { fetchGameWeeks, fetchTransfers, fetchTeams } = spreadsheetActions;
const { fetchPlayers: fetchDbPlayers } = dbActions;

const managerTeamSeason = ({
  teams, gameWeeks, transfers, players, withStats,
}) => (
  Object.keys(teams).reduce((prev, manager) => {
    const team = new TeamSeason({
      team: teams[manager], transfers: transfers[manager], gameWeeks, players,
    });
    return ({
      ...prev,
      [manager]: team.getSeason({ withStats }),
    });
  }, {})
);

function mapStateToProps(state) {
  const props = {
    playersCount: state.players.count,
    playersLoading: state.players.loading,
    playersLoaded: state.players.loaded,
    playersErrors: state.players.errors,
    gameWeeks: state.spreadsheet.gameWeeks,
    gameWeeksCount: state.spreadsheet.gameWeeksCount,
    gameWeeksLoading: state.spreadsheet.gameWeeksLoading,
    gameWeeksLoaded: state.spreadsheet.gameWeeksLoaded,
    gameWeeksErrors: state.spreadsheet.gameWeeksErrors,
    transfersCount: state.spreadsheet.transfersCount,
    transfersLoading: state.spreadsheet.transfersLoading,
    transfersLoaded: state.spreadsheet.transfersLoaded,
    transfersErrors: state.spreadsheet.transfersErrors,
    teams: state.spreadsheet.teams,
    teamsCount: state.spreadsheet.teamsCount,
    teamsLoading: state.spreadsheet.teamsLoading,
    teamsLoaded: state.spreadsheet.teamsLoaded,
    teamsErrors: state.spreadsheet.teamsErrors,
  };

  const loaded = (
    state.players.loaded
    && state.spreadsheet.gameWeeksLoaded
    && state.spreadsheet.transfersLoaded
    && state.spreadsheet.teamsLoaded
  );

  const managersSeason = loaded ? managerTeamSeason({
    teams: props.teams || {},
    gameWeeks: state.spreadsheet.gameWeeks,
    players: state.players.data,
    transfers: state.spreadsheet.transfers,
    withStats: true,
  }) : {};

  return {
    ...props,
    loaded,
    managersSeason,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchGameWeeks, fetchTeams, fetchTransfers, fetchDbPlayers,
  },
)(TeamsPage);
