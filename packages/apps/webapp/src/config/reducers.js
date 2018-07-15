import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducers as playersPageReducers } from '@kammy-ui/players-page';

const reducer = combineReducers({
  ...playersPageReducers,
  routing,
});

export default reducer;
