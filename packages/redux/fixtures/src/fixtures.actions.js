import { fetchGraphQL } from '@kammy-ui/fetchr';

export const FETCH_FIXTURES = 'FETCH_FIXTURES';
export const FETCH_PLAYER_FIXTURES = 'FETCH_PLAYER_FIXTURES';

export function fetchFixtures() {
  return {
    type: FETCH_FIXTURES,
    payload: fetchGraphQL('getFixturesQuery'),
  };
}

export function fetchPlayerFixtures({ player }) {
  return {
    type: FETCH_PLAYER_FIXTURES,
    payload: fetchGraphQL('getPlayerFixturesQuery', { player }),
  };
}
