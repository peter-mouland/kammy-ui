const mongoose = require('mongoose');

const getPlayers = require('./player.getPlayers');

const Player = mongoose.model('Player');

const upsertPlayers = async (updatedPlayers) => {
  const dbPlayers = (await getPlayers());
  const dbPlayersCount = Object.keys(dbPlayers).length;
  const markAsNew = dbPlayersCount > 0;
  const players = dbPlayers.reduce((prev, player) => ({ ...prev, [player.code]: player }), {});
  const updatePromises = updatedPlayers.map((player) => {
    const dbPlayer = players[player.code];
    const maybeGK = String(player.code).startsWith('1');
    const newPlayer = {
      ...player,
      pos: !player.pos && maybeGK ? 'GK' : player.pos,
      new: !dbPlayer ? markAsNew : false,
    };
    return (!dbPlayer)
      ? (new Player(newPlayer)).save()
      : (Player.findByIdAndUpdate(dbPlayer._id, newPlayer)).exec();
  });
  return Promise.all(updatePromises).catch(console.log);
};

module.exports = upsertPlayers;
