import { fetchGraphQL } from '@kammy-ui/fetchr';

export const FETCH_PLAYERS = 'FETCH_PLAYERS';
export const FETCH_PLAYER_FIXTURES = 'FETCH_PLAYER_FIXTURES';
export const INIT_PLAYERS = 'INIT_PLAYERS';

export function fetchPlayers(player) {
  return {
    type: FETCH_PLAYERS,
    payload: fetchGraphQL(`
query {
  getPlayers{ 
    _id code pos name club skySportsPosition isHidden new value
 }
}
`, player ? { player } : undefined),
  };
}

export function fetchPlayerFixtures(player) {
  return {
    type: FETCH_PLAYERS,
    payload: fetchGraphQL(`
query {
  getPlayers{ 
    _id code pos name club skySportsPosition isHidden new value
   fixtures { 
      aScore aTname date event hScore hTname status stats
    }
 }
}
`, player ? { player } : undefined),
  };
}

export function fetchPlayerStats(player) {
  return {
    type: FETCH_PLAYERS,
    payload: fetchGraphQL(`
query {
  getPlayers{ 
    _id code pos name club skySportsPosition isHidden new value
    season {
      apps asts con cs gls pensv points rcard sb subs tb ycard
    }
    gameWeek {
      apps asts con cs gls pensv points rcard sb subs tb ycard
    }
 }
}
`, player ? { player } : undefined),
  };
}

// todo: remove!
export function fetchAllPlayerData(player) {
  return {
    type: FETCH_PLAYERS,
    payload: fetchGraphQL(`
query {
  getPlayers{ 
    _id code pos name club skySportsPosition isHidden new value
   fixtures { 
      aScore aTname date event hScore hTname status stats
    }
    season {
      apps asts con cs gls pensv points rcard sb subs tb ycard
    }
    gameWeek {
      apps asts con cs gls pensv points rcard sb subs tb ycard
    }
 }
}
`, player ? { player } : undefined),
  };
}

// export function fetchPlayerFixtures({ code }) {
//   return {
//     type: FETCH_PLAYER_FIXTURES,
//     payload: fetchGraphQL('getPlayerFixturesQuery', { code }),
//   };
// }

export function mergePlayers() {
  return {
    type: INIT_PLAYERS,
    payload: fetchGraphQL(`
  mutation { 
    mergePlayers{
      _id code pos name club isHidden new skySportsPosition value
    }   
  }
    `),
  };
}
