/* eslint-disable no-underscore-dangle */
import * as actions from './spreadsheet.actions';

export default function players(state = {}, action) {
  const data = action.payload && action.payload.data;
  switch (action.type) {
  case `${actions.FETCH_SPREADSHEET_PLAYERS}_PENDING`:
    return {
      ...state,
      playersLoading: true,
      playersLoaded: false,
    };
  case `${actions.FETCH_SPREADSHEET_PLAYERS}_FULFILLED`:
    return {
      ...state,
      players: data,
      playersCount: data ? Object.keys(data).length : 0,
      playersErrors: action.payload.errors,
      playersLoading: false,
      playersLoaded: true,
    };
  case `${actions.FETCH_SPREADSHEET_PLAYERS}_REJECTED`:
    return {
      ...state,
      playersErrors: [action.payload],
      playersLoading: false,
    };
  case `${actions.FETCH_SPREADSHEET_TEAMS}_PENDING`:
    return {
      ...state,
      teamsLoading: true,
      teamsLoaded: false,
    };
  case `${actions.FETCH_SPREADSHEET_TEAMS}_FULFILLED`:
    return {
      ...state,
      teams: data,
      teamsCount: data ? Object.keys(data).length : 0,
      teamsErrors: action.payload.errors,
      teamsLoading: false,
      teamsLoaded: true,
    };
  case `${actions.FETCH_SPREADSHEET_TEAMS}_REJECTED`:
    return {
      ...state,
      teamsErrors: [action.payload],
      teamsLoading: false,
    };
  case `${actions.FETCH_SPREADSHEET_GAMEWEEKS}_PENDING`:
    return {
      ...state,
      gameWeeksLoading: true,
      gameWeeksLoaded: false,
    };
  case `${actions.FETCH_SPREADSHEET_GAMEWEEKS}_FULFILLED`:
    return {
      ...state,
      gameWeeks: data,
      gameWeeksCount: data ? Object.keys(data).length : 0,
      gameWeeksErrors: action.payload.errors,
      gameWeeksLoading: false,
      gameWeeksLoaded: true,
    };
  case `${actions.FETCH_SPREADSHEET_GAMEWEEKS}_REJECTED`:
    return {
      ...state,
      transfersErrors: [action.payload],
      transfersLoading: false,
    };
  case `${actions.FETCH_SPREADSHEET_TRANSFERS}_PENDING`:
    return {
      ...state,
      transfersLoading: true,
      transfersLoaded: false,
    };
  case `${actions.FETCH_SPREADSHEET_TRANSFERS}_FULFILLED`:
    return {
      ...state,
      transfers: data,
      transfersCount: data ? Object.keys(data).length : 0,
      transfersErrors: action.payload.errors,
      transfersLoading: false,
      transfersLoaded: true,
    };
  case `${actions.FETCH_SPREADSHEET_TRANSFERS}_REJECTED`:
    return {
      ...state,
      transfersErrors: [action.payload],
      transfersLoading: false,
    };
  default:
    return state;
  }
}
