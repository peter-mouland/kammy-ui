/* eslint-disable prefer-spread */

class GameWeeks {
  // see packages/server/fetch-google-sheets/src/index.js for shapes
  // @gameWeeks: [{ start, end, gameWeek }]
  constructor({
    gameWeeks,
  }) {
    // public API
    this.gameWeeks = gameWeeks;
    this.count = gameWeeks.length;
  }
}

export default GameWeeks;
