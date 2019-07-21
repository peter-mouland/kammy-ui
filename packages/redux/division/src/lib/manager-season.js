import TeamSeason from '@kammy-ui/data-team-season';

const managerTeamSeason = ({
  managers, teams, gameWeeks, transfers, players, withStats,
}) => (
  managers.reduce((prev, manager) => {
    const managerTransfers = transfers.filter((transfer) => transfer.manager === manager);
    const team = new TeamSeason({
      team: teams[manager], transfers: managerTransfers, gameWeeks, players,
    });
    return ({
      ...prev,
      [manager]: team.getSeason({ withStats }),
    });
  }, {})
);

export default managerTeamSeason;
