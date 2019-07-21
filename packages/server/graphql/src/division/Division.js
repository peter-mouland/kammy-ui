/* eslint-disable prefer-spread */
import Transfers from '@kammy-ui/helpers.transfers';
import TeamByGameWeek from './TeamByGameWeek';

class Division {
  // see packages/server/fetch-google-sheets/src/index.js for shapes
  // @transfers: [{ status, timestamp, manager, transferIn/Out, codeIn/Out, type }]
  // @gameWeeks: [{ start, end, gameWeek }]
  constructor({
    division, draft, transfers, gameWeeks: GameWeeks, players,
  }) {
    const { currentGameWeek, gameWeeks } = GameWeeks;
    const playersByName = players.reduce((prev, player) => ({
      ...prev,
      [player.name]: { ...player },
    }), {});

    // public api
    this.division = division;
    this.managers = draft.byDivision.managers[division]; // [ manager ]
    this.managersPlayers = draft.byManager.players; // { ManagerA: [ player ] }
    this.draft = draft.drafts[division]; // [{ manager, code, pos, name }]
    this.Transfers = new Transfers({ transfers });
    this.transfers = this.Transfers.validRequests;
    this.pendingTransfers = this.Transfers.pendingRequests.map((request) => ({
      ...request,
      clubIn: playersByName[request.transferIn].club,
      clubOut: playersByName[request.transferOut].club,
      posIn: playersByName[request.transferIn].pos,
      posOut: playersByName[request.transferOut].pos,
    }));
    this.teamsByGameWeek = this.calculateTeamsByGameWeeks({ gameWeeks, playersByName });
    this.currentTeams = this.teamsByGameWeek.find(({ gameWeek }) => (
      parseInt(gameWeek, 10) === currentGameWeek),
    );
  }

  calculateTeamsByGameWeeks = ({
    gameWeeks, playersByName,
  }) => {
    const allTeams = this.managers.reduce((prev, manager) => {
      const managerTransfers = this.Transfers.validManagerRequests(manager);
      const team = new TeamByGameWeek({
        draft: this.managersPlayers[manager], transfers: managerTransfers, gameWeeks, players: playersByName,
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
