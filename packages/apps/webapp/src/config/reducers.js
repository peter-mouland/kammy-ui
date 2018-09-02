import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducers as playersPageReducers } from '@kammy-ui/admin-players-page';
import { reducer as skySportsReducer } from '@kammy-ui/redux-skysports';
import { reducer as spreadsheetReducer } from '@kammy-ui/redux-spreadsheet';
import { reducer as dbReducer } from '@kammy-ui/redux-players';
import { reducer as gameWeeksReducer } from '@kammy-ui/redux.game-weeks';
import { reducer as cupReducer } from '@kammy-ui/redux.cup';
import { reducer as divisionReducer } from '@kammy-ui/redux.division';

const reducer = combineReducers({
  ...playersPageReducers,
  skySports: skySportsReducer,
  spreadsheet: spreadsheetReducer,
  players: dbReducer,
  gameWeeks: gameWeeksReducer,
  division: divisionReducer,
  cup: cupReducer,
  routing,
});

export default reducer;
