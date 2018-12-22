import { connect } from 'react-redux';
import { actions as skySportActions } from '@kammy-ui/redux-skysports';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';
import { actions as playerActions, selectors as playerSelectors } from '@kammy-ui/redux.players';

import PlayersPage from './PlayersPage';

const { fetchPlayers: fetchSpreadsheetPlayers } = spreadsheetActions;
const { fetchPlayers: fetchSkySportsPlayers } = skySportActions;
const { fetchAllPlayerData: fetchDbPlayers, mergePlayers } = playerActions;

function mapStateToProps(state) {
  const players = playerSelectors.getAllPlayerData(state);
  const dbPlayersImporting = playerSelectors.getImporting(state);
  const loaded = (players.loaded && state.skySports.loaded && state.spreadsheet.playersLoaded);

  return {
    loaded,
    dbPlayers: players.data,
    dbPlayersCount: players.count,
    dbPlayersArray: players.playersArray,
    dbImporting: dbPlayersImporting,
    dbPlayersLoading: players.loading,
    dbPlayersLoaded: players.loaded,
    dbPlayersErrors: players.errors,
    skySportsPlayers: state.skySports.data,
    skySportsPlayersCount: state.skySports.count,
    skySportsLoading: state.skySports.loading,
    skySportsLoaded: state.skySports.loaded,
    skySportsErrors: state.skySports.errors,
    spreadsheetPlayers: state.spreadsheet.players,
    spreadsheetPlayersCount: state.spreadsheet.playersCount,
    spreadsheetLoading: state.spreadsheet.playersLoading,
    spreadsheetLoaded: state.spreadsheet.playersLoaded,
    spreadsheetErrors: state.spreadsheet.playersErrors,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchSpreadsheetPlayers, fetchSkySportsPlayers, fetchDbPlayers, mergePlayers,
  },
)(PlayersPage);
