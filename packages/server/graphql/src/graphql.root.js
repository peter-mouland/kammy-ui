const { rootActions } = require('@kammy-ui/database');

const initPlayers = require('./custom/initPlayers');

const { getPlayers, upsertPlayers } = rootActions();


module.exports = {
  initPlayers,
  getPlayers,
  upsertPlayers,
};
