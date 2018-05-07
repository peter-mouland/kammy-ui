import { connect } from 'react-redux';
import { actions as skySportActions } from '@kammy-ui/redux-skysports';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';
import { actions as dbPlayerActions } from '@kammy-ui/redux-players';

import TeamsPage from './TeamsPage';

const { fetchPlayers: fetchSpreadsheetPlayers } = spreadsheetActions;
const { fetchPlayers: fetchSkySportsPlayers } = skySportActions;
const { fetchPlayers: fetchDbPlayers, importPlayers } = dbPlayerActions;

function mapStateToProps(state) {
  return {
    dbPlayers: state.players.data,
    dbPlayersCount: state.players.count,
    dbLoading: state.players.loading,
    dbLoaded: state.players.loaded,
    dbErrors: state.players.errors,
    skySportsPlayers: state.skySports.data,
    skySportsPlayersCount: state.skySports.count,
    skySportsLoading: state.skySports.loading,
    skySportsLoaded: state.skySports.loaded,
    skySportsErrors: state.skySports.errors,
    spreadsheetPlayers: state.spreadsheet.data,
    spreadsheetPlayersCount: state.spreadsheet.count,
    spreadsheetLoading: state.spreadsheet.loading,
    spreadsheetLoaded: state.spreadsheet.loaded,
    spreadsheetErrors: state.spreadsheet.errors,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchSpreadsheetPlayers, fetchSkySportsPlayers, fetchDbPlayers, importPlayers,
  },
)(TeamsPage);
