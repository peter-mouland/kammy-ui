import { reducer as skySportsReducer } from '@kammy-ui/redux-skysports';
import { reducer as spreadsheetReducer } from '@kammy-ui/redux-spreadsheet';
import { reducer as playersReducer } from '@kammy-ui/redux.players';
import { reducer as gameWeeksReducer } from '@kammy-ui/redux.game-weeks';

export default {
  skySports: skySportsReducer,
  spreadsheet: spreadsheetReducer,
  players: playersReducer,
  gameWeeks: gameWeeksReducer,
};
