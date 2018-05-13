/* eslint-disable no-underscore-dangle */
import * as actions from './players.actions';

function removeNulls(obj) {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (val === null || val === undefined) return;
    newObj[key] = val;
  });

  return newObj;
}

const updatePlayersData = (state, action) => {
  const allPlayers = [...state.data];
  const updates = action.payload.data && action.payload.data.updatePlayers;
  updates.forEach((update) => {
    const cleanUpdate = removeNulls(update);
    allPlayers.find((player, i) => { // eslint-disable-line array-callback-return
      if (player._id === update._id) {
        allPlayers[i] = { ...player, ...cleanUpdate };
      }
    });
  });
  return allPlayers;
};

const arrayToObj = (arr) => (
  arr
    .filter((item) => !!item)
    .reduce((prev, curr) => ({
      ...prev,
      [curr.name]: {
        ...curr,
      },
    }), {})
);

export default function players(state = {}, action) {
  const data = action.payload && action.payload.data;

  switch (action.type) {
  case `${actions.FETCH_PLAYERS}_PENDING`:
    return {
      ...state,
      loaded: false,
      loading: true,
    };
  case `${actions.FETCH_PLAYERS}_FULFILLED`:
    return {
      ...state,
      data: data && arrayToObj(data.getPlayers),
      count: data ? data.getPlayers.length : 0,
      errors: action.payload.errors,
      loaded: true,
      loading: false,
    };
  case `${actions.FETCH_PLAYERS}_REJECTED`:
    return {
      ...state,
      errors: [action.payload],
      loading: false,
    };
  case `${actions.INIT_PLAYERS}_PENDING`:
    return {
      ...state,
      importing: true,
    };
  case `${actions.INIT_PLAYERS}_FULFILLED`:
    return {
      ...state,
      errors: action.payload.errors,
      importing: false,
    };
  case `${actions.INIT_PLAYERS}_REJECTED`:
    return {
      ...state,
      errors: [action.payload],
      importing: false,
    };
  case `${actions.UPDATE_PLAYERS}_PENDING`:
    return {
      ...state,
      updating: true,
    };
  case `${actions.UPDATE_PLAYERS}_FULFILLED`:
    return {
      ...state,
      data: !action.payload.errors ? updatePlayersData(state, action) : [],
      errors: action.payload.errors,
      updating: false,
    };
  case `${actions.FETCH_PLAYER_FIXTURES}_FULFILLED`:
    return {
      ...state,
      playerFixtures: data ? {
        ...state.playerFixtures,
        [data.getPlayerFixtures.code]: data.getPlayerFixtures,
      } : null,
      errors: action.payload.errors,
      updating: false,
    };
  case `${actions.UPDATE_PLAYERS}_REJECTED`:
    return {
      ...state,
      errors: [action.payload],
      updating: false,
    };
  default:
    return state;
  }
}
