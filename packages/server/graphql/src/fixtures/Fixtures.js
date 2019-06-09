/* eslint-disable prefer-spread */
import toDate from '@kammy-ui/helpers-to-date';

class Fixtures {
  // see packages/server/fetch-google-sheets/src/index.js for shapes
  // @gameWeeks: [{ start, end, gameWeek, cup, notes }]
  constructor({
    gameWeeks,
  }) {
    // public API
    const currentGameWeekIndex = (
      gameWeeks.findIndex(({ start, end }) => (new Date() < new Date(end) && new Date() > new Date(start)))
    );
    this.currentGameWeek = currentGameWeekIndex < 1 ? 1 : currentGameWeekIndex + 1;
    this.gameWeeks = gameWeeks.map(({ start, end, ...rest }) => ({ start: toDate(start), end: toDate(end), ...rest }));
    this.count = gameWeeks.length;
  }
}

export default Fixtures;
