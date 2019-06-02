import { fetchSpreadsheet } from '@kammy-ui/fetchr';

export const FETCH_SPREADSHEET_PLAYERS = 'FETCH_SPREADSHEET_PLAYERS';
export const FETCH_SPREADSHEET_DIVISIONS = 'FETCH_SPREADSHEET_DIVISIONS';
export const FETCH_SPREADSHEET_GAMEWEEKS = 'FETCH_SPREADSHEET_GAMEWEEKS';
export const FETCH_SPREADSHEET_PREMIERLEAGUE = 'FETCH_SPREADSHEET_PREMIERLEAGUE';
export const FETCH_SPREADSHEET_CHAMPIONSHIP = 'FETCH_SPREADSHEET_CHAMPIONSHIP';
export const FETCH_SPREADSHEET_LEAGUEONE = 'FETCH_SPREADSHEET_LEAGUEONE';

export function fetchPlayers() {
  return {
    type: FETCH_SPREADSHEET_PLAYERS,
    payload: fetchSpreadsheet('players'),
  };
}

export function fetchGameWeeks() {
  return {
    type: FETCH_SPREADSHEET_GAMEWEEKS,
    payload: fetchSpreadsheet('gameWeeks'),
  };
}

export function fetchDivisions() {
  return {
    type: FETCH_SPREADSHEET_DIVISIONS,
    payload: fetchSpreadsheet('divisionList'),
  };
}

export function fetchPremierLeague(division) {
  return {
    type: FETCH_SPREADSHEET_PREMIERLEAGUE,
    payload: fetchSpreadsheet('draft', division),
  };
}

export function fetchChampionship(division) {
  return {
    type: FETCH_SPREADSHEET_CHAMPIONSHIP,
    payload: fetchSpreadsheet('draft', division),
  };
}

export function fetchLeagueOne(division) {
  return {
    type: FETCH_SPREADSHEET_LEAGUEONE,
    payload: fetchSpreadsheet('draft', division),
  };
}

export function fetchDivision(division) {
  switch (division) {
  case 'premierLeague': return fetchPremierLeague(division);
  case 'championship': return fetchChampionship(division);
  default:
  case 'leagueOne':
    return fetchLeagueOne(division);
  }
}
