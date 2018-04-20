/* eslint-disable no-underscore-dangle */
import * as actions from './fixtures.actions';

export default function players(state = {}, action) {
  const data = action.payload && action.payload.data;
  switch (action.type) {
  case `${actions.FETCH_FIXTURES}_PENDING`:
    return {
      ...state,
      loading: true,
    };
  case `${actions.FETCH_FIXTURES}_FULFILLED`:
    return {
      ...state,
      data: data && data.getFixtures,
      errors: action.payload.errors,
      loading: false,
    };
  case `${actions.FETCH_FIXTURES}_REJECTED`:
    return {
      ...state,
      errors: [action.payload],
      loading: false,
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
  case `${actions.FETCH_PLAYER_FIXTURES}_REJECTED`:
    return {
      ...state,
      errors: [action.payload],
      updating: false,
    };
  default:
    return state;
  }
}
