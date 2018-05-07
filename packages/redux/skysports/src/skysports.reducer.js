/* eslint-disable no-underscore-dangle */
import * as actions from './skysports.actions';

const mapToFFDataStructure = (prev, curr) => ({
  ...prev,
  [`${curr.sName}, ${curr.fName}`.trim()]: {
    code: curr.id,
    name: `${curr.sName}, ${curr.fName}`.trim(),
    skySportPosition: curr.group,
    club: curr.tName,
    new: false,
    isHidden: false,
  },
});

export default function players(state = {}, action) {
  const data = action.payload && action.payload.data;
  switch (action.type) {
  case `${actions.FETCH_SKYSPORTS_PLAYERS}_PENDING`:
    return {
      ...state,
      loading: true,
      loaded: false,
    };
  case `${actions.FETCH_SKYSPORTS_PLAYERS}_FULFILLED`:
    return {
      ...state,
      data: data.players.reduce(mapToFFDataStructure, {}),
      count: data ? data.players.length : 0,
      errors: action.payload.errors,
      loaded: true,
      loading: false,
    };
  case `${actions.FETCH_SKYSPORTS_PLAYERS}_REJECTED`:
    return {
      ...state,
      errors: [action.payload],
      loading: false,
    };
  case `${actions.FETCH_SKYSPORTS_PLAYERS_FULL}_PENDING`:
    return {
      ...state,
      loading: true,
      loaded: false,
    };
  case `${actions.FETCH_SKYSPORTS_PLAYERS_FULL}_FULFILLED`:
    return {
      ...state,
      fullData: data,
      fullDataCount: data ? data.length : 0,
      errors: action.payload.errors,
      loaded: true,
      loading: false,
    };
  case `${actions.FETCH_SKYSPORTS_PLAYERS_FULL}_REJECTED`:
    return {
      ...state,
      errors: [action.payload],
      loading: false,
    };
  default:
    return state;
  }
}
