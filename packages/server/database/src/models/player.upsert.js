const mongoose = require('mongoose');

const getPlayers = require('./player.getPlayers');

const Player = mongoose.model('Player');

const playerWithStats = ({ player, dbPlayer }) => ({
  ...player,
  fixtures: (player.fixtures || []).map((fixture, i) => {
    const sumStats = (fixture.stats || []).reduce((acc, value) => acc + value, 0);
    return {
      ...fixture,
      stats: sumStats === 0 ? dbPlayer.fixtures[i].stats : fixture.stats, // don't override with zeros
    };
  }),
});

const upsertPlayers = async (updatedPlayers) => {
  const dbPlayers = await getPlayers().then(
    (players) => (players.reduce((prev, dbPlayer) => ({ ...prev, [dbPlayer.code]: dbPlayer }), {})),
  );
  const updatePromises = updatedPlayers
    .map((player) => {
      const dbPlayer = dbPlayers[player.code];
      try {
        return (!dbPlayer)
          ? new Player(player).save()
          : Player.findByIdAndUpdate(dbPlayer._id, playerWithStats({ player, dbPlayer })).exec();
      } catch (e) {
        console.info('Error: ', dbPlayer.name, dbPlayer.code);
        console.error(e);
        return {};
      }
    });
  return Promise.all(updatePromises).catch(console.error);
};

module.exports = upsertPlayers;
