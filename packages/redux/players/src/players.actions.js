import { fetchGraphQL } from '@kammy-ui/fetchr';

export const FETCH_PLAYERS = 'FETCH_PLAYERS';
export const FETCH_PLAYERS_ALL_DATA = 'FETCH_PLAYERS_ALL_DATA';
export const FETCH_PLAYER_FIXTURES = 'FETCH_PLAYER_FIXTURES';
// export const FETCH_PLAYER_STATS = 'FETCH_PLAYER_STATS';
export const INIT_PLAYERS = 'INIT_PLAYERS';

export function fetchPlayers(player) {
  const variables = player ? { player } : undefined;
  return {
    type: FETCH_PLAYERS,
    payload: {
      data: { variables },
      promise: fetchGraphQL(`
query {
  getPlayers {
    code pos name club
 }
}
`, variables),
    },
  };
}

export function fetchPlayerFixtures(player) {
  const variables = player ? { player } : undefined;
  return {
    type: FETCH_PLAYER_FIXTURES,
    payload: {
      data: { variables },
      promise: fetchGraphQL(`
query {
  getPlayers{ 
    code pos name club
   fixtures { 
      aScore aTname date event hScore hTname status stats
    }
 }
}
`, variables),
    },
  };
}

export function fetchPlayerStats(player) {
  const variables = player ? { player } : undefined;
  return {
    type: FETCH_PLAYERS,
    payload: {
      data: { variables },
      promise: fetchGraphQL(`
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
`, variables),
    },
  };
}

// todo: remove!
export function fetchAllPlayerData(player) {
  const variables = player ? { player } : undefined;
  return {
    type: FETCH_PLAYERS_ALL_DATA,
    payload: {
      data: { variables },
      promise: fetchGraphQL(`
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
`, variables),
    },
  };
}

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
