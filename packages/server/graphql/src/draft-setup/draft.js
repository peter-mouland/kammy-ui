class DraftSetup {
  // see packages/server/fetch-google-sheets/src/index.js for shapes
  // @gameWeeks: [{ start, end, gameWeek, cup, notes }]
  constructor({
    divisions, managers, premierLeague, championship, leagueOne,
  }) {
    // public API
    this.divisions = divisions;
    this.managers = managers;
    this.draftPremierLeague = premierLeague;
    this.draftChampionship = championship;
    this.draftLeagueOne = leagueOne;
  }
}

export default DraftSetup;
