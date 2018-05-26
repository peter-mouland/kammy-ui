/* eslint-env jest */
import Chance from 'chance';

import { getStatsWithinTimeFrame } from './index';

const chance = new Chance();
const getStats = (count) => new Array(count).fill(chance.integer());

let data;

describe('getStatsWithinTimeFrame', () => {
  describe('returns all fixtures after the start date and before the end date', () => {
    beforeEach(() => {
      data = {
        fixtures: [
          {
            date: '2017-08-12 17:30:00',
            status: 'PLAYED',
            stats: getStats(26),
            [chance.word()]: chance.word(),
          },
          {
            date: '2017-08-21 20:00:00',
            status: 'PLAYED',
            stats: getStats(26),
            [chance.word()]: chance.word(),
          },
          {
            date: '2017-08-26 12:30:00',
            status: 'PLAYED',
            stats: getStats(26),
            [chance.word()]: chance.word(),
          },
        ],
      };
    });

    describe('with a single gameWeek', () => {
      it('returns zero results when dates do not match', () => {
        const gameWeeks = [
          {
            gameWeek: 1,
            start: '2016-08-11 18:00:00',
            end: '2016-08-18 18:00:00',
          },
        ];
        expect(getStatsWithinTimeFrame(data, gameWeeks).value).toEqual([]);
      });

      it('returns a single fixture when a single data result matches', () => {
        const gameWeeks = [
          {
            gameWeek: 1,
            start: '2017-08-11 18:00:00',
            end: '2017-08-18 18:00:00',
          },
        ];
        expect(getStatsWithinTimeFrame(data, gameWeeks).value).toEqual([data.fixtures[0]]);
      });

      it('returns a single fixture when a multiple data results match, but one is PENDING', () => {
        data.fixtures.push({
          date: '2017-08-17 12:30:00',
          status: 'PENDING',
          stats: getStats(26),
          [chance.word()]: chance.word(),
        });
        const gameWeeks = [
          {
            gameWeek: 1,
            start: '2017-08-11 18:00:00',
            end: '2017-08-18 18:00:00',
          },
        ];
        expect(getStatsWithinTimeFrame(data, gameWeeks).value).toEqual([data.fixtures[0]]);
      });

      it('returns multiple fixtures when multiple data results match', () => {
        const gameWeeks = [
          {
            gameWeek: 1,
            start: '2017-08-11 18:00:00',
            end: '2017-08-22 18:00:00',
          },
        ];
        expect(getStatsWithinTimeFrame(data, gameWeeks).value).toEqual([
          data.fixtures[0],
          data.fixtures[1],
        ]);
      });

      it('returns multiple fixtures when multiple data results match, but not a PENDING game', () => {
        data.fixtures.push({
          date: '2017-08-17 12:30:00',
          status: 'PENDING',
          stats: getStats(26),
          [chance.word()]: chance.word(),
        });
        const gameWeeks = [
          {
            gameWeek: 1,
            start: '2017-08-11 18:00:00',
            end: '2017-08-22 18:00:00',
          },
        ];
        expect(getStatsWithinTimeFrame(data, gameWeeks).value).toEqual([
          data.fixtures[0],
          data.fixtures[1],
        ]);
      });
    });

    describe('with multiple gameWeeks', () => {
      it('returns zero results when dates do not match', () => {
        const gameWeeks = [
          {
            gameWeek: 1,
            start: '2016-08-11 18:00:00',
            end: '2016-08-18 18:00:00',
          },
          {
            gameWeek: 2,
            start: '2016-08-19 18:00:00',
            end: '2016-08-28 18:00:00',
          },
        ];
        expect(getStatsWithinTimeFrame(data, gameWeeks).value).toEqual([]);
      });

      it('returns a single fixture when a single data result matches', () => {
        const gameWeeks = [
          {
            gameWeek: 1,
            start: '2017-07-10 18:00:00',
            end: '2017-08-10 18:00:00',
          },
          {
            gameWeek: 2,
            start: '2017-08-11 18:00:00',
            end: '2017-08-18 18:00:00',
          },
        ];
        expect(getStatsWithinTimeFrame(data, gameWeeks).value).toEqual([data.fixtures[0]]);
      });

      it('returns multiple fixtures when multiple data results match', () => {
        const gameWeeks = [
          {
            gameWeek: 1,
            start: '2017-08-11 18:00:00',
            end: '2017-08-13 18:00:00',
          },
          {
            gameWeek: 1,
            start: '2017-08-13 18:00:00',
            end: '2017-08-22 18:00:00',
          },
        ];
        expect(getStatsWithinTimeFrame(data, gameWeeks).value).toEqual([
          data.fixtures[0],
          data.fixtures[1],
        ]);
      });
    });
  });

  describe('data edge cases', () => {
    it('return a game which starts at the same time the gameweek starts', () => {
      data = {
        fixtures: [
          {
            date: '2017-08-12 17:30:00',
            status: 'PLAYED',
            stats: getStats(26),
            [chance.word()]: chance.word(),
          },
        ],
      };
      const gameWeeks = [
        {
          gameWeek: 1,
          start: '2017-08-12 17:30:00',
          end: '2017-08-13 18:00:00',
        },
      ];
      expect(getStatsWithinTimeFrame(data, gameWeeks).value).toEqual([
        data.fixtures[0],
      ]);
    });

    it('wont return a game which starts a second before the same time the gameweek starts', () => {
      data = {
        fixtures: [
          {
            date: '2017-08-12 17:29:59',
            status: 'PLAYED',
            stats: getStats(26),
            [chance.word()]: chance.word(),
          },
        ],
      };
      const gameWeeks = [
        {
          gameWeek: 1,
          start: '2017-08-12 17:30:00',
          end: '2017-08-13 18:00:00',
        },
      ];
      expect(getStatsWithinTimeFrame(data, gameWeeks).value).toEqual([]);
    });

    it('return a game which starts at the same time the gameweek ends', () => {
      data = {
        fixtures: [
          {
            date: '2017-08-13 18:00:00',
            status: 'PLAYED',
            stats: getStats(26),
            [chance.word()]: chance.word(),
          },
        ],
      };
      const gameWeeks = [
        {
          gameWeek: 1,
          start: '2017-08-12 17:30:00',
          end: '2017-08-13 18:00:00',
        },
      ];
      expect(getStatsWithinTimeFrame(data, gameWeeks).value).toEqual([
        data.fixtures[0],
      ]);
    });

    it('wont return a game which starts a second after the same time the gameweek ends', () => {
      data = {
        fixtures: [
          {
            date: '2017-08-13 18:00:01',
            status: 'PLAYED',
            stats: getStats(26),
            [chance.word()]: chance.word(),
          },
        ],
      };
      const gameWeeks = [
        {
          gameWeek: 1,
          start: '2017-08-12 17:30:00',
          end: '2017-08-13 18:00:00',
        },
      ];
      expect(getStatsWithinTimeFrame(data, gameWeeks).value).toEqual([]);
    });
  });
});
