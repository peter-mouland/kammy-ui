import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as skySportsReducer } from '@kammy-ui/redux-skysports';
import { reducer as spreadsheetReducer } from '@kammy-ui/redux-spreadsheet';
import { reducer as dbReducer } from '@kammy-ui/redux.players';
import { reducer as draftSetupReducer } from '@kammy-ui/redux.draft-setup';
import { reducer as gameWeeksReducer } from '@kammy-ui/redux.game-weeks';
import { reducer as cupReducer } from '@kammy-ui/redux.cup';
import { reducer as divisionReducer } from '@kammy-ui/redux.division';
import { reducer as transfersReducer } from '@kammy-ui/redux.transfers';
import { reducer as fixturesReducer } from '@kammy-ui/redux-fixtures';

const reducer = combineReducers({
  skySports: skySportsReducer,
  spreadsheet: spreadsheetReducer,
  players: dbReducer,
  gameWeeks: gameWeeksReducer,
  division: divisionReducer,
  cup: cupReducer,
  transfers: transfersReducer,
  fixtures: fixturesReducer,
  draftSetup: draftSetupReducer,
  routing,
});

export default reducer;
