/* eslint-disable no-underscore-dangle */
import * as actions from './spreadsheet.actions';

const createJsonObj = (item) => ({
  [item.player.trim()]: {
    new: item.new,
    code: item.code,
    pos: item.position,
    name: item.player.trim(),
    club: item.club,
    isHidden: false,
    // apps: item.apps,
    // subs: item.subs,
    // gls: item.gls,
    // ass: item.ass,
    // cs: item.cs,
    // con: item.con,
    // prensv: item.pensv,
    // tacbn: item.tacbn,
    // savbn: item.savbn,
    // yc: item.yc,
    // rc: item.rc,
    // total: item.total,
  },
});

export default function players(state = {}, action) {
  const data = action.payload && action.payload.data;
  switch (action.type) {
  case `${actions.FETCH_SPREADSHEET_PLAYERS}_PENDING`:
    return {
      ...state,
      loading: true,
      loaded: false,
    };
  case `${actions.FETCH_SPREADSHEET_PLAYERS}_FULFILLED`:
    return {
      ...state,
      data: Object.keys(data).reduce((prev, key) => ({
        ...prev,
        ...createJsonObj(data[key]),
      }), {}),
      count: data ? Object.keys(data).length : 0,
      errors: action.payload.errors,
      loading: false,
      loaded: true,
    };
  case `${actions.FETCH_SPREADSHEET_PLAYERS}_REJECTED`:
    return {
      ...state,
      errors: [action.payload],
      loading: false,
    };
  default:
    return state;
  }
}
