/* eslint-disable prefer-spread */
import TeamByGameWeek from './TeamByGameWeek';

class Division {
  // see packages/server/fetch-google-sheets/src/index.js for shapes
  // @transfers: { [manager] :[{ status, timestamp, manager, transferIn/Out, codeIn/Out, type }] }
  // @gameWeeks: [{ start, end, gameWeek }]
  constructor({
    division, draft, transfers, gameWeeks, players,
  }) {
    const currentGameWeekIndex = (gameWeeks.findIndex((gw) => (
      new Date() < new Date(gw.end) && new Date() > new Date(gw.start)
    )));
    const playersByName = players.reduce((prev, player) => ({
      ...prev,
      [player.name]: { ...player },
    }), {});
    const currentGameWeek = currentGameWeekIndex < 1 ? 1 : currentGameWeekIndex + 1;
    const drafts = Object.keys(draft).map((manager) => draft[manager]);
    const transferLists = Object.keys(transfers).map((manager) => transfers[manager]);

    // public api
    this.division = division;
    this.managers = [...new Set(Object.keys(draft).map((manager) => manager))]; // [ manager ]
    this.draft = [].concat.apply([], drafts); // [{ manager, code, pos, name }]
    this.transfers = [].concat.apply([], transferLists);
    this.teamsByGameWeek = this.calculateTeamsByGameWeeks({
      draft, gameWeeks, transfers, playersByName,
    });
    this.currentTeams = this.teamsByGameWeek.find(({ gameWeek }) => (
      parseInt(gameWeek, 10) === currentGameWeek),
    );
  }

  calculateTeamsByGameWeeks = ({ draft, gameWeeks, transfers, playersByName }) => {
    const allTeams = this.managers.reduce((prev, manager) => {
      const team = new TeamByGameWeek({
        draft: draft[manager], transfers: transfers[manager], gameWeeks, players: playersByName,
      });
      return {
        ...prev,
        [manager]: team.getSeason(),
      };
    }, {});
    return gameWeeks.map((gameWeek) => {
      const allTeamPlayers = Object.keys(allTeams).map((manager) => (
        allTeams[manager].find((week) => gameWeek.gameWeek === week.gameWeek).players
      ));
      return ({
        ...gameWeek,
        players: [].concat.apply([], allTeamPlayers),
      });
    });
  };
}

export default Division;
