import { reducer as skySportsReducer } from '@kammy-ui/redux-skysports';
import { reducer as dbReducer } from '@kammy-ui/redux.players';
import { reducer as gameWeeksReducer } from '@kammy-ui/redux.game-weeks';
import { reducer as divisionReducer } from '@kammy-ui/redux.division';
import { reducer as transferReducer } from '@kammy-ui/redux.transfers';

export default {
  transfers: transferReducer,
  division: divisionReducer,
  skySports: skySportsReducer,
  players: dbReducer,
  gameWeeks: gameWeeksReducer,
};
