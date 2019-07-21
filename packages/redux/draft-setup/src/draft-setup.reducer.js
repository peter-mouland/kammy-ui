import * as actions from './draft-setup.actions';

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

export default function draftSetupReducer(state = {}, action) {
  const data = action.payload && action.payload.data;
  const errors = action.payload && action.payload.errors;
  switch (action.type) {
  case `${actions.FETCH_DRAFT_SETUP}_PENDING`:
    return {
      ...state,
      status: pending(),
    };
  case `${actions.FETCH_DRAFT_SETUP}_FULFILLED`:
    return {
      ...state,
      data: {
        managers: data.getDraftSetup.managers,
        divisions: data.getDraftSetup.divisions,
        draftPremierLeague: data.getDraftSetup.draftPremierLeague,
        draftChampionship: data.getDraftSetup.draftChampionship,
        draftLeagueOne: data.getDraftSetup.draftLeagueOne,
      },
      status: fulfilled(errors),
    };
  case `${actions.FETCH_DRAFT_SETUP}_REJECTED`:
    return {
      ...state,
      status: rejected([action.payload]),
    };
  default:
    return state;
  }
}
