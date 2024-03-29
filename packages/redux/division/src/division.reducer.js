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

export default function divisionReducer(state = {}, action) {
  const { payload } = action;
  const variables = payload && payload.variables;
  const data = payload && payload.data;
  const errors = payload && payload.errors;
  switch (action.type) {
  case `${actions.FETCH_DIVISION_CURRENT_TEAMS}_PENDING`:
    return {
      ...state,
      [data.division]: {
        ...state[data.division],
        status: pending(),
      },
    };
  case `${actions.FETCH_DIVISION_CURRENT_TEAMS}_FULFILLED`:
    return {
      ...state,
      [data.getDivision.division]: {
        ...state[data.getDivision.division],
        currentTeams: data.getDivision.currentTeams,
        pendingTransfers: data.getDivision.pendingTransfers,
        status: fulfilled(errors),
      },
    };
  case `${actions.FETCH_DIVISION_CURRENT_TEAMS}_REJECTED`:
    return {
      ...state,
      status: rejected([action.payload]),
    };
  case `${actions.FETCH_DIVISION}_PENDING`:
    return {
      ...state,
      [data.division]: {
        ...state[data.division],
        status: pending(),
      },
    };
  case `${actions.FETCH_DIVISION}_FULFILLED`:
    return {
      ...state,
      [variables.division]: {
        ...state[variables.division],
        ...data.getDivision,
        status: fulfilled(errors),
      },
    };
  case `${actions.FETCH_DIVISION}_REJECTED`:
    return {
      ...state,
      [variables.division]: {
        ...state[variables.division],
        status: rejected([action.payload]),
      },
    };
  default:
    return state;
  }
}
