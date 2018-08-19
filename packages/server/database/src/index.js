/* eslint-disable global-require */
import connect from './connect';

const rootActions = () => {
  const upsertPlayers = require('./models/player.upsert').default;
  const getPlayers = require('./models/player.getPlayers').default;
  return {
    upsertPlayers,
    getPlayers,
  };
};

export {
  connect,
  rootActions,
};
