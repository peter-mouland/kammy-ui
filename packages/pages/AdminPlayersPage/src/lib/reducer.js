import { reducer as skySportsReducer } from '@kammy-ui/redux-skysports';
import { reducer as spreadsheetReducer } from '@kammy-ui/redux-spreadsheet';
import { reducer as dbPlayersReducer } from '@kammy-ui/redux.players';

export default {
  skySports: skySportsReducer,
  spreadsheet: spreadsheetReducer,
  players: dbPlayersReducer,
};
