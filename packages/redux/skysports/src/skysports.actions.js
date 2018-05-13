import { fetchSkySports } from '@kammy-ui/fetchr';

export const FETCH_SKYSPORTS_PLAYER = 'FETCH_SKYSPORTS_PLAYER';
export const FETCH_SKYSPORTS_PLAYERS = 'FETCH_SKYSPORTS_PLAYERS';
export const FETCH_SKYSPORTS_FIXTURES = 'FETCH_SKYSPORTS_FIXTURES';
export const FETCH_SKYSPORTS_PLAYERS_FULL = 'FETCH_SKYSPORTS_PLAYERS_FULL';

export function fetchPlayers() {
  return {
    type: FETCH_SKYSPORTS_PLAYERS,
    payload: fetchSkySports('players'),
  };
}

export function fetchFixtures() {
  return {
    type: FETCH_SKYSPORTS_FIXTURES,
    payload: fetchSkySports('fixtures'),
  };
}

export function fetchPlayer(code) {
  return {
    type: FETCH_SKYSPORTS_PLAYER,
    payload: fetchSkySports(`player/${code}`),
  };
}

export function fetchPlayersFull() {
  return {
    type: FETCH_SKYSPORTS_PLAYERS_FULL,
    payload: fetchSkySports('players-full'),
  };
}

