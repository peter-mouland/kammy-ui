/* eslint-disable no-underscore-dangle */
import * as actions from './spreadsheet.actions';

export default function players(state = {}, action) {
  const data = action.payload && action.payload.data;
  switch (action.type) {
  case `${actions.FETCH_SPREADSHEET_PLAYERS}_PENDING`:
    return {
      ...state,
      loading: true,
      loaded: false,
    };
  case `${actions.FETCH_SPREADSHEET_PLAYERS}_FULFILLED`:
    return {
      ...state,
      data,
      count: data ? Object.keys(data).length : 0,
      errors: action.payload.errors,
      loading: false,
      loaded: true,
    };
  case `${actions.FETCH_SPREADSHEET_PLAYERS}_REJECTED`:
    return {
      ...state,
      errors: [action.payload],
      loading: false,
    };
  default:
    return state;
  }
}
