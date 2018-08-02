/* eslint-disable no-underscore-dangle */
import * as actions from './spreadsheet.actions';

const pending = (state, type) => ({
  ...state,
  [`${type}Loading`]: true,
  [`${type}Loaded`]: false,
});

const fulfilled = (state, type, data, errors) => ({
  ...state,
  [type]: data,
  [`${type}Count`]: data ? Object.keys(data).length : 0,
  [`${type}Errors`]: errors,
  [`${type}Loading`]: false,
  [`${type}Loaded`]: true,
});

const rejected = (state, type, data, errors) => ({
  ...state,
  [`${type}Errors`]: errors,
  [`${type}Loading`]: false,
  [`${type}Loaded`]: false,
});

export default function players(state = {}, action) {
  const data = action.payload && action.payload.data;
  const errors = action.payload && action.payload.errors;
  switch (action.type) {
  case `${actions.FETCH_SPREADSHEET_PLAYERS}_PENDING`:
    return pending(state, 'players');
  case `${actions.FETCH_SPREADSHEET_PLAYERS}_FULFILLED`:
    return fulfilled(state, 'players', data, errors);
  case `${actions.FETCH_SPREADSHEET_PLAYERS}_REJECTED`:
    return rejected(state, 'players', data, [action.payload]);
  case `${actions.FETCH_SPREADSHEET_PREMIERLEAGUE}_PENDING`:
    return pending(state, 'premierLeague');
  case `${actions.FETCH_SPREADSHEET_PREMIERLEAGUE}_FULFILLED`:
    return fulfilled(state, 'premierLeague', data, errors);
  case `${actions.FETCH_SPREADSHEET_PREMIERLEAGUE}_REJECTED`:
    return rejected(state, 'premierLeague', data, [action.payload]);
  case `${actions.FETCH_SPREADSHEET_CHAMPIONSHIP}_PENDING`:
    return pending(state, 'championship');
  case `${actions.FETCH_SPREADSHEET_CHAMPIONSHIP}_FULFILLED`:
    return fulfilled(state, 'championship', data, errors);
  case `${actions.FETCH_SPREADSHEET_CHAMPIONSHIP}_REJECTED`:
    return rejected(state, 'championship', data, [action.payload]);
  case `${actions.FETCH_SPREADSHEET_LEAGUEONE}_PENDING`:
    return pending(state, 'leagueOne');
  case `${actions.FETCH_SPREADSHEET_LEAGUEONE}_FULFILLED`:
    return fulfilled(state, 'leagueOne', data, errors);
  case `${actions.FETCH_SPREADSHEET_LEAGUEONE}_REJECTED`:
    return rejected(state, 'leagueOne', data, [action.payload]);
  case `${actions.FETCH_SPREADSHEET_GAMEWEEKS}_PENDING`:
    return pending(state, 'gameWeeks');
  case `${actions.FETCH_SPREADSHEET_GAMEWEEKS}_FULFILLED`:
    return fulfilled(state, 'gameWeeks', data, errors);
  case `${actions.FETCH_SPREADSHEET_GAMEWEEKS}_REJECTED`:
    return rejected(state, 'gameWeeks', data, [action.payload]);
  case `${actions.FETCH_SPREADSHEET_TRANSFERS}_PENDING`:
    return pending(state, 'transfers');
  case `${actions.FETCH_SPREADSHEET_TRANSFERS}_FULFILLED`:
    return {
      ...fulfilled(state, 'transfers', data, errors),
      transfersCount: data ? Object.values(data).reduce((acc, val) => acc.concat(val), []).length : 0,
    };
  case `${actions.FETCH_SPREADSHEET_TRANSFERS}_REJECTED`:
    return rejected(state, 'transfers', data, [action.payload]);
  default:
    return state;
  }
}
