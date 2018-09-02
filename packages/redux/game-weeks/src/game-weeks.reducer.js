import * as actions from './game-weeks.actions';

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

export default function gameWeeksReducer(state = {}, action) {
  const data = action.payload && action.payload.data;
  const errors = action.payload && action.payload.errors;
  switch (action.type) {
  case `${actions.FETCH_GAMEWEEKS}_PENDING`:
    return {
      ...state,
      status: pending(),
    };
  case `${actions.FETCH_GAMEWEEKS}_FULFILLED`:
    return {
      ...state,
      data: {
        gameWeeks: data.getGameWeeks.gameWeeks,
        count: data.getGameWeeks.count,
      },
      status: fulfilled(errors),
    };
  case `${actions.FETCH_GAMEWEEKS}_REJECTED`:
    return {
      ...state,
      status: rejected([action.payload]),
    };
  case actions.UPDATE_GAMEWEEK_INDEX:
    return {
      ...state,
      selectedGameWeek: data,
    };
  default:
    return state;
  }
}
