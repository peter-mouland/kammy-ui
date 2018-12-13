/* eslint-disable no-underscore-dangle */
import * as actions from './players.actions';

const arrayToObj = (arr) => (
  arr
    .filter((item) => !!item)
    .reduce((prev, curr) => ({
      ...prev,
      [curr.name]: {
        ...curr,
      },
    }), {})
);

export default function playersReducer(state = {}, action) {
  const data = action.payload && action.payload.data;

  switch (action.type) {
  case `${actions.FETCH_PLAYERS}_PENDING`:
    return {
      ...state,
      loaded: false,
      loading: true,
    };
  case `${actions.FETCH_PLAYERS}_FULFILLED`:
    return {
      ...state,
      data: data && arrayToObj(data.getPlayers),
      count: data ? data.getPlayers.length : 0,
      errors: action.payload.errors,
      loaded: true,
      loading: false,
    };
  case `${actions.FETCH_PLAYERS}_REJECTED`:
    return {
      ...state,
      errors: [action.payload],
      loading: false,
    };
  case `${actions.FETCH_PLAYERS_DEPRECATED}_PENDING`:
    return {
      ...state,
      loadedDeprecated: false,
      loadingDeprecated: true,
    };
  case `${actions.FETCH_PLAYERS_DEPRECATED}_FULFILLED`:
    return {
      ...state,
      dataDeprecated: data && arrayToObj(data.getPlayers),
      countDeprecated: data ? data.getPlayers.length : 0,
      errorsDeprecated: action.payload.errors,
      loadedDeprecated: true,
      loadingDeprecated: false,
    };
  case `${actions.FETCH_PLAYERS_DEPRECATED}_REJECTED`:
    return {
      ...state,
      errorsDeprecated: [action.payload],
      loadingDeprecated: false,
    };
  case `${actions.FETCH_PLAYER_FIXTURES}_PENDING`:
    return {
      ...state,
      playerFixturesLoaded: false,
      playerFixturesLoading: true,
    };
  case `${actions.FETCH_PLAYER_FIXTURES}_FULFILLED`:
    return {
      ...state,
      playerFixtures: data && arrayToObj(data.getPlayers),
      playerFixturesCount: data ? data.getPlayers.length : 0,
      playerFixturesErrors: action.payload.errors,
      playerFixturesLoaded: true,
      playerFixturesLoading: false,
    };
  case `${actions.FETCH_PLAYER_FIXTURES}_REJECTED`:
    return {
      ...state,
      playerFixturesErrors: [action.payload],
      playerFixturesLoading: false,
    };
  case `${actions.FETCH_PLAYER_STATS}_PENDING`:
    return {
      ...state,
      playerStatsLoaded: false,
      playerStatsLoading: true,
    };
  case `${actions.FETCH_PLAYER_STATS}_FULFILLED`:
    return {
      ...state,
      playerStats: data && arrayToObj(data.getPlayers),
      playerStatsCount: data ? data.getPlayers.length : 0,
      playerStatsErrors: action.payload.errors,
      playerStatsLoaded: true,
      playerStatsLoading: false,
    };
  case `${actions.FETCH_PLAYER_STATS}_REJECTED`:
    return {
      ...state,
      playerStatsErrors: [action.payload],
      playerStatsLoading: false,
    };
  case `${actions.INIT_PLAYERS}_PENDING`:
    return {
      ...state,
      importing: true,
    };
  case `${actions.INIT_PLAYERS}_FULFILLED`:
    return {
      ...state,
      errors: action.payload.errors,
      importing: false,
    };
  case `${actions.INIT_PLAYERS}_REJECTED`:
    return {
      ...state,
      errors: [action.payload],
      importing: false,
    };
  default:
    return state;
  }
}
