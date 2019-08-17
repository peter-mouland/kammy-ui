/* eslint-disable prefer-spread */
import Transfers from '@kammy-ui/helpers.transfers';
import TeamByGameWeek from './lib/TeamByGameWeek';

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
    this.draft = draft.drafts[division]
      .map(({
        position, player, name, pos, ...rest
      }) => ({ ...rest, name: player || name, pos: position || pos }));
    this.Transfers = new Transfers({ transfers });
    this.transfers = this.Transfers.validRequests;
    this.pendingTransfers = this.Transfers.pendingRequests.map((request) => {
      const playerIn = playersByName[request.transferIn];
      const playerOut = playersByName[request.transferOut];
      if (!playerIn) console.log(`woah, who is transferIn : ${request.transferIn}`);
      if (!playerOut) console.log(`woah, who is transferOut: ${request.transferOut}`);
      return ({
        ...request,
        clubIn: playerIn.club,
        clubOut: playerOut.club,
        posIn: playerIn.pos,
        posOut: playerOut.pos,
      });
    });
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
        draft: this.managersPlayers[manager],
        transfers: managerTransfers,
        gameWeeks,
        players: playersByName,
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
