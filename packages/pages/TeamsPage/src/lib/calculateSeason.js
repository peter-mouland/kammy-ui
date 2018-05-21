
export const calculateSeasonPoints = (playerGameWeeks) => (
  playerGameWeeks.reduce((totals, gw) => (
    Object.keys(gw.points).reduce((prev, stat) => ({
      ...prev,
      [stat]: gw.points[stat] + (totals[stat] || 0),
    }), {})
  ), {})
);

export const calculateSeasonStats = (playerGameWeeks) => (
  playerGameWeeks.reduce((totals, gw) => (
    Object.keys(gw.gameWeekStats).reduce((prev, stat) => ({
      ...prev,
      [stat]: gw.gameWeekStats[stat] + (totals[stat] || 0),
    }), {})
  ), {})
);
