import { fetchSpreadsheet } from '@kammy-ui/fetchr';

export const FETCH_SPREADSHEET_PLAYERS = 'FETCH_SPREADSHEET_PLAYERS';
export const FETCH_SPREADSHEET_TEAMS = 'FETCH_SPREADSHEET_TEAMS';
export const FETCH_SPREADSHEET_GAMEWEEKS = 'FETCH_SPREADSHEET_GAMEWEEKS';
export const FETCH_SPREADSHEET_TRANSFERS = 'FETCH_SPREADSHEET_TRANSFERS';

export function fetchPlayers() {
  return {
    type: FETCH_SPREADSHEET_PLAYERS,
    payload: fetchSpreadsheet('1x2qD0aS6W-MeARu6QT0YthgLV91-Hmlip5_Gut2nEBI', 'Players'),
  };
}

export function fetchTeams() {
  return {
    type: FETCH_SPREADSHEET_TEAMS,
    payload: fetchSpreadsheet('1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI', 'Teams'),
  };
}

export function fetchTransfers() {
  return {
    type: FETCH_SPREADSHEET_TRANSFERS,
    payload: fetchSpreadsheet('1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI', 'Transfers'),
  };
}

export function fetchGameWeeks() {
  return {
    type: FETCH_SPREADSHEET_GAMEWEEKS,
    payload: fetchSpreadsheet('1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI', 'GameWeeks'),
  };
}
