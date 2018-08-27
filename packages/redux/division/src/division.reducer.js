import * as actions from './division.actions';

const pending = () => ({
  loading: true,
  loaded: false,
});

const fulfilled = (errors) => ({
  errors,
  loading: false,
  loaded: true,
});

const rejected = (errors) => ({
  errors,
  loading: false,
  loaded: false,
});

export default function leagueOneReducer(state = {}, action) {
  const data = action.payload && action.payload.data;
  const errors = action.payload && action.payload.errors;
  switch (action.type) {
  case `${actions.FETCH_DIVISION}_PENDING`:
    return {
      ...state,
      status: pending(),
    };
  case `${actions.FETCH_DIVISION}_FULFILLED`:
    return {
      ...state,
      data,
      status: fulfilled(errors),
    };
  case `${actions.FETCH_DIVISION}_REJECTED`:
    return {
      ...state,
      status: rejected([action.payload]),
    };
  default:
    return state;
  }
}
