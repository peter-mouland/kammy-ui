import { reducer as skySportsReducer } from '@kammy-ui/redux-skysports';
import { reducer as spreadsheetReducer } from '@kammy-ui/redux-spreadsheet';
import { reducer as dbReducer } from '@kammy-ui/redux-players';
import { reducer as gameWeekReducer } from '@kammy-ui/redux.game-weeks';
import { reducer as transferReducer } from '@kammy-ui/redux.transfers';

export default {
  skySports: skySportsReducer,
  spreadsheet: spreadsheetReducer,
  players: dbReducer,
  transfers: transferReducer,
  gameWeeks: gameWeekReducer,
};
