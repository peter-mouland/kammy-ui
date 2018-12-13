/* eslint-disable prefer-spread */
import toDate from '@kammy-ui/helpers-to-date';

class GameWeeks {
  // see packages/server/fetch-google-sheets/src/index.js for shapes
  // @gameWeeks: [{ start, end, gameWeek }]
  constructor({
    gameWeeks,
  }) {
    // public API
    this.gameWeeks = gameWeeks.map(({ start, end, ...rest }) => ({ start: toDate(start), end: toDate(end), ...rest }));
    this.count = gameWeeks.length;
  }
}

export default GameWeeks;
