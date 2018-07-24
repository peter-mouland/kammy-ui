const mongoose = require('mongoose');

const getPlayers = require('./player.getPlayers');

const Player = mongoose.model('Player');

const upsertPlayers = async (updatedPlayers) => {
  const dbPlayers = (await getPlayers());
  const players = dbPlayers.reduce((prev, player) => ({ ...prev, [player.code]: player }), {});
  const updatePromises = updatedPlayers
    .filter((player) => player.skySportsClub)
    .map((player) => {
      const dbPlayer = players[player.code];
      const newPlayer = {
        ...player,
        club: player.skySportsClub,
      };
      try {
        if (!dbPlayer) {
          return new Player({ ...newPlayer, new: true }).save();
        }
        const playerWithNonZeroStats = {
          ...newPlayer,
          fixtures: (newPlayer.fixtures || []).map((fixture, i) => {
            const sumStats = (fixture.stats || []).reduce((acc, value) => acc + value, 0);
            return {
              ...fixture,
              stats: sumStats === 0 ? dbPlayer.fixtures[i].stats : fixture.stats,
            };
          }),
        };
        return (Player.findByIdAndUpdate(dbPlayer._id, playerWithNonZeroStats)).exec();
      } catch (e) {
        console.info('codes:', dbPlayer.code, newPlayer.code);
        console.error(e);
        return {};
      }
    });
  return Promise.all(updatePromises).catch(console.error);
};

module.exports = upsertPlayers;
