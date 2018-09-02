import * as actions from './cup.actions';

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
  const data = payload && payload.data;
  const errors = payload && payload.errors;
  switch (action.type) {
  case `${actions.FETCH_CUP}_PENDING`:
    return {
      ...state,
      status: pending(),
    };
  case `${actions.FETCH_CUP}_FULFILLED`:
    return {
      ...state,
      teams: data.getCup.teams,
      groups: data.getCup.groups,
      rounds: data.getCup.rounds,
      managers: data.getCup.managers,
      status: fulfilled(errors),
    };
  case `${actions.FETCH_CUP}_REJECTED`:
    return {
      ...state,
      status: rejected([action.payload]),
    };
  default:
    return state;
  }
}
