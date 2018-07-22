import { fetchSpreadsheet } from '@kammy-ui/fetchr';

export const FETCH_SPREADSHEET_PLAYERS = 'FETCH_SPREADSHEET_PLAYERS';
export const FETCH_SPREADSHEET_PREMIERSHIP = 'FETCH_SPREADSHEET_PREMIERSHIP';
export const FETCH_SPREADSHEET_CHAMPIONSHIP = 'FETCH_SPREADSHEET_CHAMPIONSHIP';
export const FETCH_SPREADSHEET_LEAGUEONE = 'FETCH_SPREADSHEET_LEAGUEONE';
export const FETCH_SPREADSHEET_GAMEWEEKS = 'FETCH_SPREADSHEET_GAMEWEEKS';
export const FETCH_SPREADSHEET_TRANSFERS = 'FETCH_SPREADSHEET_TRANSFERS';

export function fetchPlayers() {
  return {
    type: FETCH_SPREADSHEET_PLAYERS,
    payload: fetchSpreadsheet('1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI', 'Players'),
  };
}

export function fetchPremiership() {
  return {
    type: FETCH_SPREADSHEET_PREMIERSHIP,
    payload: fetchSpreadsheet('1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI', 'Premiership'),
  };
}

export function fetchChampionship() {
  return {
    type: FETCH_SPREADSHEET_CHAMPIONSHIP,
    payload: fetchSpreadsheet('1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI', 'Championship'),
  };
}

export function fetchLeagueOne() {
  return {
    type: FETCH_SPREADSHEET_LEAGUEONE,
    payload: fetchSpreadsheet('1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI', 'LeagueOne'),
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
