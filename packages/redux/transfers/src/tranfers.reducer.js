import * as actions from './tranfers.actions';

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

const initialState = {
  status: {
    loading: false,
    loaded: false,
  },
  saving: false,
};

export default function transfersReducer(state = initialState, action = {}) {
  const { payload = {}, type } = action;
  const { data, variables, errors } = payload;
  switch (type) {
  case `${actions.FETCH_TRANSFERS}_PENDING`:
    return {
      ...state,
      [variables.division]: {
        ...(state[variables.division] || {}),
        status: pending(),
      },
    };
  case `${actions.FETCH_TRANSFERS}_FULFILLED`:
    return {
      ...state,
      [variables.division]: {
        transfers: data.getTransfers,
        status: fulfilled(errors),
      },
    };
  case `${actions.FETCH_TRANSFERS}_REJECTED`:
    return {
      ...state,
      [variables.division]: {
        ...(state[variables.division] || {}),
        status: rejected([payload]),
      },
    };
  case `${actions.SAVE_TRANSFERS}_PENDING`:
    return {
      ...state,
      saving: true,
    };
  case `${actions.SAVE_TRANSFERS}_FULFILLED`:
    return {
      ...state,
      saving: false,
    };
  case `${actions.SAVE_TRANSFERS}_REJECTED`:
    return {
      ...state,
      saving: false,
    };
  default:
    return state;
  }
}
