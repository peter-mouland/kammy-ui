import { getJSON } from '@kammy-ui/fetchr';

export const FETCH_SKYSPORTS_PLAYER = 'FETCH_SKYSPORTS_PLAYER';
export const FETCH_SKYSPORTS_PLAYERS = 'FETCH_SKYSPORTS_PLAYERS';
export const FETCH_SKYSPORTS_FIXTURES = 'FETCH_SKYSPORTS_FIXTURES';
export const FETCH_SKYSPORTS_FULL_REPORT = 'FETCH_SKYSPORTS_FULL_REPORT';

export function fetchPlayers() {
  return {
    type: FETCH_SKYSPORTS_PLAYERS,
    payload: getJSON('/skysports/players'),
  };
}

export function fetchFixtures() {
  return {
    type: FETCH_SKYSPORTS_FIXTURES,
    payload: getJSON('/skysports/fixtures'),
  };
}

export function fetchPlayer(code) {
  return {
    type: FETCH_SKYSPORTS_PLAYER,
    payload: getJSON(`/skysports/layer/${code}`),
  };
}

export function fetchFullReport() {
  return {
    type: FETCH_SKYSPORTS_FULL_REPORT,
    payload: getJSON('/skysports/full-report'),
  };
}

