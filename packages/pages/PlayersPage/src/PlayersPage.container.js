import { connect } from 'react-redux';
import { actions as skySportActions } from '@kammy-ui/redux-skysports';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';
import { actions as dbPlayerActions } from '@kammy-ui/redux-players';

import PlayersPage from './PlayersPage';

const { fetchPlayers: fetchSpreadsheetPlayers } = spreadsheetActions;
const { fetchPlayers: fetchSkySportsPlayers } = skySportActions;
const { fetchPlayers: fetchDbPlayers, initPlayers } = dbPlayerActions;

function mapStateToProps(state) {
  const loaded = (state.players.loaded && state.skySports.loaded && state.spreadsheet.playersLoaded);
  return {
    loaded,
    dbPlayers: state.players.data,
    dbPlayersCount: state.players.count,
    dbImporting: state.players.importing,
    dbLoading: state.players.loading,
    dbErrors: state.players.errors,
    skySportsPlayers: state.skySports.data,
    skySportsPlayersCount: state.skySports.count,
    skySportsLoading: state.skySports.loading,
    skySportsErrors: state.skySports.errors,
    spreadsheetPlayers: state.spreadsheet.players,
    spreadsheetPlayersCount: state.spreadsheet.playersCount,
    spreadsheetLoading: state.spreadsheet.playersLoading,
    spreadsheetErrors: state.spreadsheet.playersErrors,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchSpreadsheetPlayers, fetchSkySportsPlayers, fetchDbPlayers, initPlayers,
  },
)(PlayersPage);
