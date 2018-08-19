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
  case `${actions.FETCH_PLAYER_FIXTURES}_FULFILLED`:
    return {
      ...state,
      playerFixtures: data ? {
        ...state.playerFixtures,
        [data.getPlayerFixtures.code]: data.getPlayerFixtures,
      } : null,
      errors: action.payload.errors,
      updating: false,
    };
  default:
    return state;
  }
}
