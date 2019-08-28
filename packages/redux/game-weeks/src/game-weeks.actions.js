import { fetchGraphQL } from '@kammy-ui/fetchr';

export const FETCH_GAMEWEEKS = 'FETCH_GAMEWEEKS';
export const UPDATE_GAMEWEEK_INDEX = 'UPDATE_GAMEWEEK_INDEX';

export function fetchGameWeeks(opts) {
  return {
    type: FETCH_GAMEWEEKS,
    payload: {
      promise: fetchGraphQL(`
query { 
  getGameWeeks {
    count gameWeeks { gameWeek start end cup notes }
 }
}
`, null, opts),
    },
  };
}

export function updateGameWeekIndex(gameWeekIndex) {
  return {
    type: UPDATE_GAMEWEEK_INDEX,
    payload: { data: gameWeekIndex },
  };
}
