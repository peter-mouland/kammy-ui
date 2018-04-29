import { connect } from 'react-redux';
import { actions as skySportActions } from '@kammy-ui/redux-skysports';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';

import PlayersPage from './PlayersPage';

const { fetchPlayers: fetchSpreadsheetPlayers } = spreadsheetActions;
const { fetchPlayers: fetchSkySportsPlayers } = skySportActions;

function mapStateToProps(state) {
  return {
    skySportsPlayers: state.skySports.data,
    skySportsLoading: state.skySports.loading,
    skySportsErrors: state.skySports.errors,
    spreadsheetPlayers: state.spreadsheet.data,
    spreadsheetLoading: state.spreadsheet.loading,
    spreadsheetErrors: state.spreadsheet.errors,
  };
}

export default connect(
  mapStateToProps,
  { fetchSpreadsheetPlayers, fetchSkySportsPlayers },
)(PlayersPage);
