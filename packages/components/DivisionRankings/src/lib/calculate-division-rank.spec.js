/* eslint-env jest */
// import positions from './positions';
import getDivisionRank from './calculate-division-rank';

describe('getDivisionRank()', () => {
  describe('gameWeek', () => {
    it('should return a equal ranking by position when all points are the same', () => {
      const divisionPoints = [
        {
          manager: 'Olly',
          points: {
            'GK / SUB': { gameWeek: 1, season: 10 },
            CB: { gameWeek: 1, season: 10 },
            FB: { gameWeek: 1, season: 10 },
            MID: { gameWeek: 1, season: 10 },
            AM: { gameWeek: 1, season: 10 },
            STR: { gameWeek: 1, season: 10 },
          },
        },
        {
          manager: 'Nick',
          points: {
            'GK / SUB': { gameWeek: 1, season: 10 },
            CB: { gameWeek: 1, season: 10 },
            FB: { gameWeek: 1, season: 10 },
            MID: { gameWeek: 1, season: 10 },
            AM: { gameWeek: 1, season: 10 },
            STR: { gameWeek: 1, season: 10 },
          },
        },
      ];

      expect(getDivisionRank(divisionPoints)).toEqual({
        'GK / SUB': { Olly: 0.5, Nick: 0.5 },
        AM: { Olly: 0.5, Nick: 0.5 }, // one array item for each manager
        CB: { Olly: 0.5, Nick: 0.5 },
        FB: { Olly: 0.5, Nick: 0.5 },
        MID: { Olly: 0.5, Nick: 0.5 },
        STR: { Olly: 0.5, Nick: 0.5 },
      });
    });

    it('should return a Oly with higher ranking (1) when Ollys points are higher', () => {
      const divisionPoints = [
        {
          manager: 'Olly',
          points: {
            'GK / SUB': { gameWeek: 11, season: 10 },
            CB: { gameWeek: 11, season: 10 },
            FB: { gameWeek: 11, season: 10 },
            MID: { gameWeek: 11, season: 10 },
            AM: { gameWeek: 11, season: 10 },
            STR: { gameWeek: 11, season: 10 },
          },
        },
        {
          manager: 'Nick',
          points: {
            'GK / SUB': { gameWeek: 1, season: 10 },
            CB: { gameWeek: 1, season: 10 },
            FB: { gameWeek: 1, season: 10 },
            MID: { gameWeek: 1, season: 10 },
            AM: { gameWeek: 1, season: 10 },
            STR: { gameWeek: 1, season: 10 },
          },
        },
      ];

      expect(getDivisionRank(divisionPoints)).toEqual({
        'GK / SUB': { Olly: 1, Nick: 0 },
        AM: { Olly: 1, Nick: 0 },
        CB: { Olly: 1, Nick: 0 },
        FB: { Olly: 1, Nick: 0 },
        MID: { Olly: 1, Nick: 0 },
        STR: { Olly: 1, Nick: 0 },
      });
    });

    it('should correctly rank 3 players gameWeek, with differing points for positions', () => {
      const divisionPoints = [
        {
          manager: 'Olly',
          points: {
            'GK / SUB': { gameWeek: 1, season: 10 },
            CB: { gameWeek: 2, season: 10 },
            FB: { gameWeek: 3, season: 10 },
            MID: { gameWeek: 4, season: 10 },
            AM: { gameWeek: 5, season: 10 },
            STR: { gameWeek: 6, season: 10 },
          },
        },
        {
          manager: 'Nick',
          points: {
            'GK / SUB': { gameWeek: 6, season: 10 },
            CB: { gameWeek: 5, season: 10 },
            FB: { gameWeek: 4, season: 10 },
            MID: { gameWeek: 3, season: 10 },
            AM: { gameWeek: 2, season: 10 },
            STR: { gameWeek: 1, season: 10 },
          },
        },
        {
          manager: 'Pete',
          points: {
            'GK / SUB': { gameWeek: 7, season: 10 },
            CB: { gameWeek: 0, season: 10 },
            FB: { gameWeek: 3, season: 10 },
            MID: { gameWeek: 3, season: 10 },
            AM: { gameWeek: 0, season: 10 },
            STR: { gameWeek: 7, season: 10 },
          },
        },
      ];

      expect(getDivisionRank(divisionPoints)).toEqual({
        'GK / SUB': { Olly: 0, Nick: 1, Pete: 2 },
        AM: { Olly: 2, Nick: 1, Pete: 0 },
        CB: { Olly: 1, Nick: 2, Pete: 0 },
        FB: { Olly: 0.5, Nick: 2, Pete: 0.5 },
        MID: { Olly: 2, Nick: 0.5, Pete: 0.5 },
        STR: { Olly: 1, Nick: 0, Pete: 2 },
      });
    });

    it('should shows ties for the lead', () => {
      const divisionPoints = [
        {
          manager: 'Olly',
          points: {
            'GK / SUB': { gameWeek: 1, season: 10 },
            CB: { gameWeek: 1, season: 10 },
            FB: { gameWeek: 1, season: 10 },
            MID: { gameWeek: 1, season: 10 },
            AM: { gameWeek: 1, season: 10 },
            STR: { gameWeek: 1, season: 10 },
          },
        },
        {
          manager: 'Nick',
          points: {
            'GK / SUB': { gameWeek: 1, season: 10 },
            CB: { gameWeek: 2, season: 10 },
            FB: { gameWeek: 3, season: 10 },
            MID: { gameWeek: 1, season: 10 },
            AM: { gameWeek: 1, season: 10 },
            STR: { gameWeek: 1, season: 10 },
          },
        },
        {
          manager: 'Pete',
          points: {
            'GK / SUB': { gameWeek: 1, season: 10 },
            CB: { gameWeek: 2, season: 10 },
            FB: { gameWeek: 1, season: 10 },
            MID: { gameWeek: 1, season: 10 },
            AM: { gameWeek: 1, season: 10 },
            STR: { gameWeek: 1, season: 10 },
          },
        },
      ];

      expect(getDivisionRank(divisionPoints)).toEqual({
        'GK / SUB': { Olly: 0.5, Nick: 0.5, Pete: 0.5 },
        AM: { Olly: 0.5, Nick: 0.5, Pete: 0.5 },
        CB: { Olly: 0, Nick: 1.5, Pete: 1.5 },
        FB: { Olly: 0.5, Nick: 2, Pete: 0.5 },
        MID: { Olly: 0.5, Nick: 0.5, Pete: 0.5 },
        STR: { Olly: 0.5, Nick: 0.5, Pete: 0.5 },
      });
    });
  });
});
