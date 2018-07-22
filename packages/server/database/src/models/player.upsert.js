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
      club: player.club || player.skySportsClub,
      pos: !player.pos && maybeGK ? 'GK' : player.pos,
      new: !dbPlayer ? markAsNew : false,
    };
    try {
      if (!dbPlayer) {
        return new Player(newPlayer).save();
      }
      const playerWithNonZeroStats = {
        ...newPlayer,
        fixtures: newPlayer.fixtures.map((fixture, i) => {
          const sumStats = fixture.stats.reduce((acc, value) => acc + value, 0);
          return {
            ...fixture,
            stats: sumStats === 0 ? dbPlayer.fixtures[i].stats : fixture.stats,
          };
        }),
      };
      return (Player.findByIdAndUpdate(dbPlayer._id, playerWithNonZeroStats)).exec();
    } catch (e) {
      console.info(dbPlayer);
      console.info(newPlayer);
      console.error(e);
      return {};
    }
  });
  return Promise.all(updatePromises).catch(console.error);
};

module.exports = upsertPlayers;
