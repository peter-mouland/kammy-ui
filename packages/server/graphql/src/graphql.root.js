const { rootActions } = require('@kammy-ui/database');

const mergePlayers = require('./custom/mergePlayers');

const { getPlayers, upsertPlayers } = rootActions();


module.exports = {
  mergePlayers,
  getPlayers,
  upsertPlayers,
};
