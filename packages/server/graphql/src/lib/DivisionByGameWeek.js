import TeamByGameWeek from './TeamByGameWeek';

class Division {
  // see packages/server/fetch-google-sheets/src/index.js for shapes
  constructor({ draft, transfers, gameWeeks }) {
    this.transfers = transfers; // { [manager] :[{ status, timestamp, manager, transferIn/Out, codeIn/Out, type }] }
    this.gameWeeks = gameWeeks; // [{ start, end, gameWeek }]
    const currentGameWeekIndex = (gameWeeks.findIndex((gw) => (
      new Date() < new Date(gw.end) && new Date() > new Date(gw.start)
    )));
    this.currentGameWeek = currentGameWeekIndex < 1 ? 1 : currentGameWeekIndex + 1;

    // public api
    this.managers = [...new Set(Object.keys(draft).map((manager) => manager))]; // [ manager ]
    const drafts = Object.keys(draft).map((manager) => draft[manager]);
    const transferLists = Object.keys(transfers).map((manager) => transfers[manager]);
    this.draft = [].concat.apply([], drafts); // [{ manager, code, pos, name }]
    this.transfers = [].concat.apply([], transferLists);
    this.teamsByGameWeek = this.calculateTeamsByGameWeeks({ draft });
    this.currentTeams = this.teamsByGameWeek.filter(({ gameWeek }) => (
      parseInt(gameWeek, 10) === this.currentGameWeek),
    );
  }

  calculateTeamsByGameWeeks = ({ draft }) => {
    const {
      gameWeeks, transfers, managers,
    } = this;
    return managers.reduce((prev, manager) => {
      const team = new TeamByGameWeek({
        draft: draft[manager], transfers: transfers[manager], gameWeeks,
      });
      return [
        ...prev,
        ...team.getSeason(),
      ];
    }, []);
  };
}

export default Division;
