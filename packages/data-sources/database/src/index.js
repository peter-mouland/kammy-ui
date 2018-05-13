/* eslint-disable global-require */
const connect = require('./connect');

const rootActions = () => {
  const upsertPlayers = require('./models/player.upsert');
  const getPlayers = require('./models/player.getPlayers');
  return {
    upsertPlayers,
    getPlayers,
  };
};

module.exports = {
  connect,
  rootActions,
};
