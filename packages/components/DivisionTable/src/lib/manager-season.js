import TeamSeason from '@kammy-ui/data-team-season';

const managerTeamSeason = ({
  teams, gameWeeks, transfers, players, withStats,
}) => (
  Object.keys(teams).reduce((prev, manager) => {
    const team = new TeamSeason({
      team: teams[manager], transfers: transfers[manager], gameWeeks, players,
    });
    return ({
      ...prev,
      [manager]: team.getSeason({ withStats }),
    });
  }, {})
);

export default managerTeamSeason;
