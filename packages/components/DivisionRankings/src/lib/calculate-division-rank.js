import { getPositionLabel } from './positions';

const getTotal = (posPoints) => (
  (Object.keys(posPoints).reduce((prev, pos) => ({
    gameWeek: prev.gameWeek + posPoints[pos].gameWeek,
    season: prev.season + posPoints[pos].season,
    rank: -1,
  }), {
    gameWeek: 0, season: 0, rank: -1,
  }))
);

const getPositionPoints = (team, intGameWeek) => {
  const posPoints = team
    .reduce((prev, teamSheetItem) => {
      const player = teamSheetItem.gameWeeks[intGameWeek];
      const seasonToGameWeek = teamSheetItem.seasonToGameWeek[intGameWeek];
      const key = getPositionLabel(teamSheetItem.teamPos).label;
      const gameWeekPoints = player.gameWeekStats.points;
      const gameWeek = prev[key] ? prev[key].gameWeek + gameWeekPoints : gameWeekPoints;
      const season = prev[key] ? prev[key].season + seasonToGameWeek.points : seasonToGameWeek.points;
      return {
        ...prev,
        [key]: {
          gameWeek, season, rank: -1,
        },
      };
    }, {});
  return {
    ...posPoints,
    total: getTotal(posPoints),
  };
};

const getTeamPoints = (teams, managersSeason, intGameWeek) => (
  Object.keys(teams).map((manager) => ({
    manager,
    positionPoints: getPositionPoints(managersSeason[manager], intGameWeek),
  }))
);

export default getTeamPoints;
