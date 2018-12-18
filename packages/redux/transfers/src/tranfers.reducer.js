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
};

const formatTransfer = (transfers) => transfers.reduce((prev, transfer) => ({
  ...prev,
  [transfer.division]: [
    ...prev[transfer.division] || [],
    transfer,
  ],
}), {});

export default function transfersReducer(state = initialState, action) {
  const { payload } = action;
  const data = payload && payload.data;
  const errors = payload && payload.errors;
  switch (action.type) {
  case `${actions.FETCH_TRANSFERS}_PENDING`:
    return {
      ...state,
      status: pending(),
    };
  case `${actions.FETCH_TRANSFERS}_FULFILLED`:
    return {
      ...state,
      ...data.getTransfers && formatTransfer(data.getTransfers),
      status: fulfilled(errors),
    };
  case `${actions.FETCH_TRANSFERS}_REJECTED`:
    return {
      ...state,
      status: rejected([action.payload]),
    };
  case `${actions.SAVE_TRANSFERS}_PENDING`:
    return {
      ...state,
      status: pending(),
    };
  case `${actions.SAVE_TRANSFERS}_FULFILLED`:
    return {
      ...state,
      status: fulfilled(errors),
    };
  case `${actions.SAVE_TRANSFERS}_REJECTED`:
    return {
      ...state,
      status: rejected([action.payload]),
    };
  default:
    return state;
  }
}
