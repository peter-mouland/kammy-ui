import { reducer as divisionReducer } from '@kammy-ui/redux.division';
import { reducer as dbReducer } from '@kammy-ui/redux.players';

export default {
  players: dbReducer,
  division: divisionReducer,
};
