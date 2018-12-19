/* eslint-disable prefer-spread */
import TeamByGameWeek from './TeamByGameWeek';

class Division {
  // see packages/server/fetch-google-sheets/src/index.js for shapes
  // @transfers: [{ status, timestamp, manager, transferIn/Out, codeIn/Out, type }]
  // @gameWeeks: [{ start, end, gameWeek }]
  constructor({
    division, draft, transfers = [], gameWeeks, players, currentGameWeek,
  }) {
    const playersByName = players.reduce((prev, player) => ({
      ...prev,
      [player.name]: { ...player },
    }), {});
    const drafts = Object.keys(draft).map((manager) => draft[manager]);

    // public api
    this.division = division;
    this.managers = [...new Set(Object.keys(draft).map((manager) => manager))]; // [ manager ]
    this.draft = [].concat.apply([], drafts); // [{ manager, code, pos, name }]
    this.transfers = [].concat.apply([], transfers);
    this.teamsByGameWeek = this.calculateTeamsByGameWeeks({
      draft, gameWeeks, transfers, playersByName,
    });
    this.currentTeams = this.teamsByGameWeek.find(({ gameWeek }) => (
      parseInt(gameWeek, 10) === currentGameWeek),
    );
  }

  calculateTeamsByGameWeeks = ({
    draft, gameWeeks, transfers, playersByName,
  }) => {
    const allTeams = this.managers.reduce((prev, manager) => {
      const managerTransfers = transfers.filter((transfer) => transfer.manager === manager);
      const team = new TeamByGameWeek({
        draft: draft[manager], transfers: managerTransfers, gameWeeks, players: playersByName,
      });
      return {
        ...prev,
        [manager]: team.getSeason(),
      };
    }, {});
    return gameWeeks.map((gameWeek) => {
      const gameWeekPlayers = Object.keys(allTeams).map((manager) => (
        allTeams[manager].find((week) => gameWeek.gameWeek === week.gameWeek).players
      ));
      return ({
        ...gameWeek,
        players: [].concat.apply([], gameWeekPlayers),
      });
    });
  };
}

export default Division;
