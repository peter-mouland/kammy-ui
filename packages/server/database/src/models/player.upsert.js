import mongoose from 'mongoose';
import { playerStats } from '@kammy-ui/data-player-stats';

import getPlayers from './player.getPlayers';

const Player = mongoose.model('Player');

const calculateSeasonStats = (gameWeeksWithFixtures) => (
  gameWeeksWithFixtures.reduce((totals, gw) => (
    Object.keys(gw.stats).reduce((prev, stat) => ({
      ...prev,
      [stat]: gw.stats[stat] + (totals[stat] || 0),
    }), {})
  ), {})
);

const getGameWeeksWithFixtures = ({ player, gameWeeks }) => (
  gameWeeks.map((gw) => {
    const { gameWeekFixtures, gameWeekStats } = playerStats({ player, gameWeeks: [gw] });
    return { fixtures: gameWeekFixtures, stats: gameWeekStats };
  })
);

const getPlayerWithStats = ({ player, dbPlayer, gameWeeks }) => {
  const gameWeekIndex = (gameWeeks.findIndex((gw) => (
    new Date() < new Date(gw.end) && new Date() > new Date(gw.start)
  )));
  const gameWeek = gameWeekIndex < 0 ? 0 : gameWeekIndex;
  const playerWithNonZeroFixtures = {
    ...player,
    fixtures: (player.fixtures || []).map((fixture, i) => {
      const sumStats = (fixture.stats || []).reduce((acc, value) => acc + value, 0);
      return {
        ...fixture,
        stats: dbPlayer && sumStats === 0 ? dbPlayer.fixtures[i].stats : fixture.stats, // don't override with zeros
      };
    }),
  };

  const gameWeeksWithFixtures = getGameWeeksWithFixtures({ player: playerWithNonZeroFixtures, gameWeeks });
  const season = calculateSeasonStats(gameWeeksWithFixtures);

  return {
    ...playerWithNonZeroFixtures,
    gameWeeks: gameWeeksWithFixtures,
    gameWeek: gameWeeksWithFixtures[gameWeek].stats,
    season,
  };
};

const upsertPlayers = async ({ players, gameWeeks }) => {
  const dbPlayers = await getPlayers().then(
    (playrs) => (playrs.reduce((prev, dbPlayer) => ({ ...prev, [dbPlayer.code]: dbPlayer }), {})),
  );
  const updatePromises = players.map((player) => {
    const dbPlayer = dbPlayers[player.code];
    try {
      const playerWithStats = getPlayerWithStats({ player, dbPlayer, gameWeeks });
      return (!dbPlayer)
        ? new Player(playerWithStats).save()
        : Player.findByIdAndUpdate(dbPlayer._id, playerWithStats).exec();
    } catch (e) {
      console.info('Error: ', dbPlayer.name, dbPlayer.code);
      console.error(e);
      return {};
    }
  });
  return Promise.all(updatePromises).catch(console.error);
};

export default upsertPlayers;
