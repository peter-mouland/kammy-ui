import { connect } from 'react-redux';
import { actions as skySportActions } from '@kammy-ui/redux-skysports';
import { actions as spreadsheetActions } from '@kammy-ui/redux-spreadsheet';
import { actions as dbPlayerActions } from '@kammy-ui/redux-players';

import PlayersPage from './PlayersPage';

const { fetchPlayers: fetchSpreadsheetPlayers } = spreadsheetActions;
const { fetchPlayers: fetchSkySportsPlayers } = skySportActions;
const { fetchPlayers: fetchDbPlayers, importPlayers } = dbPlayerActions;

const mergePlayersData = ({ spreadsheetPlayers, skySportsPlayers }) => {
  const allPlayers = {
    ...spreadsheetPlayers,
    ...skySportsPlayers,
  };
  const mergedPlayers = Object.keys(allPlayers).reduce((prev, key) => ({
    ...prev,
    [key]: {
      pos: '', // pos is required but doesn't exist on skysports players
      ...spreadsheetPlayers && spreadsheetPlayers[key],
      ...skySportsPlayers && skySportsPlayers[key],
      // hidden: !spreadsheetPlayers[key],
      // new: !spreadsheetPlayers || !spreadsheetPlayers[key],
      season: {},
      gameWeek: {},
    },
  }), {});
  return mergedPlayers;
};

function mapStateToProps(state) {
  const mergedPlayers = mergePlayersData({
    spreadsheetPlayers: state.spreadsheet.players,
    skySportsPlayers: state.skySports.data,
  });
  const loaded = (state.players.loaded && state.skySports.loaded && state.spreadsheet.playersLoaded);
  return {
    loaded,
    mergedPlayers,
    dbPlayers: state.players.data,
    dbPlayersCount: state.players.count,
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
    fetchSpreadsheetPlayers, fetchSkySportsPlayers, fetchDbPlayers, importPlayers,
  },
)(PlayersPage);
