import { getJSON } from '@kammy-ui/fetchr';

export const FETCH_SPREADSHEET_PLAYERS = 'FETCH_SPREADSHEET_PLAYERS';

export function fetchPlayers(spreadsheetId, worksheet) {
  return {
    type: FETCH_SPREADSHEET_PLAYERS,
    payload: getJSON(`/google-spreadsheet/${spreadsheetId}/${worksheet}`),
  };
}
