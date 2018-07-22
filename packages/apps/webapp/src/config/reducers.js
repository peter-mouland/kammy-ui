import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducers as playersPageReducers } from '@kammy-ui/players-page';
import { reducers as teamsPageReducers } from '@kammy-ui/teams-page';

const reducer = combineReducers({
  ...teamsPageReducers,
  ...playersPageReducers,
  routing,
});

export default reducer;
