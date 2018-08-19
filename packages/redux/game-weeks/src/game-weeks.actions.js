import { fetchSpreadsheet } from '@kammy-ui/fetchr';

export const FETCH_SPREADSHEET_GAMEWEEKS = 'FETCH_SPREADSHEET_GAMEWEEKS';
export const UPDATE_GAMEWEEK_INDEX = 'UPDATE_GAMEWEEK_INDEX';

export function fetchGameWeeks() {
  return {
    type: FETCH_SPREADSHEET_GAMEWEEKS,
    payload: fetchSpreadsheet('1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI', 'GameWeeks'),
  };
}

export function updateGameWeekIndex(gameWeekIndex) {
  return {
    type: UPDATE_GAMEWEEK_INDEX,
    payload: { data: gameWeekIndex },
  };
}
