import { fetchGraphQL } from '@kammy-ui/fetchr';

export const FETCH_PLAYERS = 'FETCH_PLAYERS';
export const FETCH_PLAYER_FIXTURES = 'FETCH_PLAYER_FIXTURES';
export const INIT_PLAYERS = 'INIT_PLAYERS';
export const UPDATE_PLAYERS = 'UPDATE_PLAYERS';

export function fetchPlayers(player) {
  return {
    type: FETCH_PLAYERS,
    payload: fetchGraphQL('getPlayersQuery', player ? { player } : undefined),
  };
}

export function fetchPlayerFixtures({ code }) {
  return {
    type: FETCH_PLAYER_FIXTURES,
    payload: fetchGraphQL('getPlayerFixturesQuery', { code }),
  };
}

export function mergePlayers() {
  return {
    type: INIT_PLAYERS,
    payload: fetchGraphQL('mergePlayersMutation'),
  };
}

export function updatePlayers(playerUpdates) {
  return {
    type: UPDATE_PLAYERS,
    payload: fetchGraphQL('updatePlayersMutation', playerUpdates),
  };
}
