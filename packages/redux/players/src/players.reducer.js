import * as actions from './players.actions';

const mergePlayers = (players = {}, arr) => (
  arr
    .filter((item) => !!item)
    .reduce((prev, curr) => ({
      ...prev,
      [curr.name]: {
        ...prev[curr.name] || {},
        ...curr,
      },
    }), players)
);

export default function playersReducer(state = {}, action) {
  const { payload = {}, type } = action;
  const { data, errors } = payload;
  switch (type) {
  case `${actions.FETCH_PLAYERS}_PENDING`:
    return {
      ...state,
      players: {
        ...state.players || {},
        loaded: false,
        loading: true,
      },
    };
  case `${actions.FETCH_PLAYERS}_FULFILLED`:
    return {
      ...state,
      players: {
        ...state.players || {},
        data: data && mergePlayers(state.players.data, data.getPlayers),
        count: data ? data.getPlayers.length : 0,
        errors,
        loaded: true,
        loading: false,
      },
    };
  case `${actions.FETCH_PLAYERS}_REJECTED`:
    return {
      ...state,
      players: {
        errors: [payload],
        loading: false,
      },
    };
  case `${actions.FETCH_PLAYERS_ALL_DATA}_PENDING`:
    return {
      ...state,
      allPlayersData: {
        ...state.allPlayersData || {},
        loaded: false,
        loading: true,
      },
    };
  case `${actions.FETCH_PLAYERS_ALL_DATA}_FULFILLED`:
    return {
      ...state,
      allPlayersData: {
        ...state.allPlayersData || {},
        data: data && mergePlayers(state.allPlayersData.data, data.getPlayers),
        count: data ? data.getPlayers.length : 0,
        errors,
        loaded: true,
        loading: false,
      },
    };
  case `${actions.FETCH_PLAYERS_ALL_DATA}_REJECTED`:
    return {
      ...state,
      allPlayersData: {
        errors: [payload],
        loading: false,
      },
    };
  case `${actions.FETCH_PLAYER_FIXTURES}_PENDING`:
    return {
      ...state,
      playerFixtures: {
        loaded: false,
        loading: true,
      },
    };
  case `${actions.FETCH_PLAYER_FIXTURES}_FULFILLED`:
    return {
      ...state,
      playerFixtures: {
        ...state.playerFixtures || {},
        data: data && mergePlayers(state.playerFixtures.data, data.getPlayers),
        count: data ? data.getPlayers.length : 0,
        errors,
        loaded: true,
        loading: false,
      },
    };
  case `${actions.FETCH_PLAYER_FIXTURES}_REJECTED`:
    return {
      ...state,
      playerFixtures: {
        errors: [payload],
        loading: false,
      },
    };
  case `${actions.INIT_PLAYERS}_PENDING`:
    return {
      ...state,
      importing: true,
    };
  case `${actions.INIT_PLAYERS}_FULFILLED`:
    return {
      ...state,
      errors,
      importing: false,
    };
  case `${actions.INIT_PLAYERS}_REJECTED`:
    return {
      ...state,
      errors: [payload],
      importing: false,
    };
  default:
    return state;
  }
}
