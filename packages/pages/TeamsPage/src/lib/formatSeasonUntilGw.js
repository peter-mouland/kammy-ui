import { calculateSeasonPoints, calculateSeasonStats } from '../lib/calculateSeason';

const formatSeasonUntilGw = (player, gameWeek) => {
  const seasonStats = calculateSeasonStats(player.gameWeeks.slice(0, gameWeek));
  const seasonPoints = calculateSeasonPoints(player.gameWeeks.slice(0, gameWeek));
  return {
    seasonStats, seasonPoints,
  };
};

export default formatSeasonUntilGw;
