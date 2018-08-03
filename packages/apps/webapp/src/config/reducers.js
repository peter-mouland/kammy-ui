import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducers as playersPageReducers } from '@kammy-ui/players-page';
import { reducer as skySportsReducer } from '@kammy-ui/redux-skysports';
import { reducer as spreadsheetReducer } from '@kammy-ui/redux-spreadsheet';
import { reducer as dbReducer } from '@kammy-ui/redux-players';

const reducer = combineReducers({
  ...playersPageReducers,
  skySports: skySportsReducer,
  spreadsheet: spreadsheetReducer,
  players: dbReducer,
  routing,
});

export default reducer;
