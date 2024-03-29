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

const savePending = () => ({
  saving: true,
  saved: false,
});

const saveFulfilled = (errors) => ({
  errors,
  saving: false,
  saved: true,
});

const saveReset = (errors) => ({
  errors,
  saving: false,
  saved: false,
});

const initialState = {
  managers: [],
  teams: [],
  status: {},
  saveStatus: {},
  draftCupLoaded: false,
  divisionsPlayers: {
    leagueOne: [],
    championship: [],
    premierLeague: [],
  },
};

export default function divisionReducer(state = initialState, action) {
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
  case `${actions.SAVE_CUP}_RESET`:
    return {
      ...state,
      saveStatus: saveReset(),
    };
  case `${actions.SAVE_CUP}_PENDING`:
    return {
      ...state,
      saveStatus: savePending(),
    };
  case `${actions.SAVE_CUP}_FULFILLED`:
    return {
      ...state,
      saveStatus: saveFulfilled(errors),
    };
  case `${actions.SAVE_CUP}_REJECTED`:
    return {
      ...state,
      saveStatus: saveReset([action.payload]),
    };
  case actions.FETCH_DRAFT_CUP:
    return {
      ...state,
      draftCupLoaded: false,
    };
  case `${actions.FETCH_DRAFT_CUP}_FULFILLED`:
    return {
      ...state,
      draftCup: data.getDraftCup,
      draftCupLoaded: true,
    };
  default:
    return state;
  }
}
