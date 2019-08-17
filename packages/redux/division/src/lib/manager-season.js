import TeamSeason from './team-season';

const managerTeamSeason = ({
  managers, gameWeeks, players,
}) => (
  managers.reduce((prev, manager) => {
    const team = new TeamSeason({ manager, gameWeeks, players });
    return ({
      ...prev,
      [manager]: team.getSeason(),
    });
  }, {})
);

export default managerTeamSeason;
