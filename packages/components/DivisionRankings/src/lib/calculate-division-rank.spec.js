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
            total: { gameWeek: 6, season: 60 },
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
            total: { gameWeek: 6, season: 60 },
          },
        },
      ];

      expect(getDivisionRank(divisionPoints).gameWeek).toEqual({
        'GK / SUB': { Olly: 0.5, Nick: 0.5 },
        AM: { Olly: 0.5, Nick: 0.5 }, // one array item for each manager
        CB: { Olly: 0.5, Nick: 0.5 },
        FB: { Olly: 0.5, Nick: 0.5 },
        MID: { Olly: 0.5, Nick: 0.5 },
        STR: { Olly: 0.5, Nick: 0.5 },
        total: { Olly: 0.5, Nick: 0.5 },
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
            total: { gameWeek: 66, season: 60 },
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
            total: { gameWeek: 6, season: 60 },
          },
        },
      ];

      expect(getDivisionRank(divisionPoints).gameWeek).toEqual({
        'GK / SUB': { Olly: 1, Nick: 0 },
        AM: { Olly: 1, Nick: 0 },
        CB: { Olly: 1, Nick: 0 },
        FB: { Olly: 1, Nick: 0 },
        MID: { Olly: 1, Nick: 0 },
        STR: { Olly: 1, Nick: 0 },
        total: { Olly: 1, Nick: 0 },
      });
    });

    it('should return a Nick with higher ranking (1) when Nicks points are higher. test to ensure JS hasnt reordered anything', () => {
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
            total: { gameWeek: 66, season: 60 },
          },
        },
        {
          manager: 'Nick',
          points: {
            'GK / SUB': { gameWeek: 111, season: 10 },
            CB: { gameWeek: 111, season: 10 },
            FB: { gameWeek: 111, season: 10 },
            MID: { gameWeek: 111, season: 10 },
            AM: { gameWeek: 111, season: 10 },
            STR: { gameWeek: 111, season: 10 },
            total: { gameWeek: 666, season: 60 },
          },
        },
      ];

      expect(getDivisionRank(divisionPoints).gameWeek).toEqual({
        'GK / SUB': { Olly: 0, Nick: 1 },
        AM: { Olly: 0, Nick: 1 },
        CB: { Olly: 0, Nick: 1 },
        FB: { Olly: 0, Nick: 1 },
        MID: { Olly: 0, Nick: 1 },
        STR: { Olly: 0, Nick: 1 },
        total: { Olly: 0, Nick: 1 },
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
            total: { gameWeek: 21, season: 60 },
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
            total: { gameWeek: 21, season: 60 },
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
            total: { gameWeek: 20, season: 60 },
          },
        },
      ];

      expect(getDivisionRank(divisionPoints).gameWeek).toEqual({
        'GK / SUB': { Olly: 0, Nick: 1, Pete: 2 },
        AM: { Olly: 2, Nick: 1, Pete: 0 },
        CB: { Olly: 1, Nick: 2, Pete: 0 },
        FB: { Olly: 0.5, Nick: 2, Pete: 0.5 },
        MID: { Olly: 2, Nick: 0.5, Pete: 0.5 },
        STR: { Olly: 1, Nick: 0, Pete: 2 },
        total: { Olly: 1.5, Nick: 1.5, Pete: 0 },
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
            total: { gameWeek: 6, season: 60 },
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
            total: { gameWeek: 9, season: 60 },
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
            total: { gameWeek: 7, season: 60 },
          },
        },
      ];

      expect(getDivisionRank(divisionPoints).gameWeek).toEqual({
        'GK / SUB': { Olly: 0.5, Nick: 0.5, Pete: 0.5 },
        AM: { Olly: 0.5, Nick: 0.5, Pete: 0.5 },
        CB: { Olly: 0, Nick: 1.5, Pete: 1.5 },
        FB: { Olly: 0.5, Nick: 2, Pete: 0.5 },
        MID: { Olly: 0.5, Nick: 0.5, Pete: 0.5 },
        STR: { Olly: 0.5, Nick: 0.5, Pete: 0.5 },
        total: { Olly: 0, Nick: 2, Pete: 1 },
      });
    });
  });

  describe('season', () => {
    it('should return a equal ranking by position when all points are the same', () => {
      const divisionPoints = [
        {
          manager: 'Olly',
          points: {
            'GK / SUB': { season: 1, gameWeek: 10 },
            CB: { season: 1, gameWeek: 10 },
            FB: { season: 1, gameWeek: 10 },
            MID: { season: 1, gameWeek: 10 },
            AM: { season: 1, gameWeek: 10 },
            STR: { season: 1, gameWeek: 10 },
            total: { season: 6, gameWeek: 60 },
          },
        },
        {
          manager: 'Nick',
          points: {
            'GK / SUB': { season: 1, gameWeek: 10 },
            CB: { season: 1, gameWeek: 10 },
            FB: { season: 1, gameWeek: 10 },
            MID: { season: 1, gameWeek: 10 },
            AM: { season: 1, gameWeek: 10 },
            STR: { season: 1, gameWeek: 10 },
            total: { season: 6, gameWeek: 60 },
          },
        },
      ];

      expect(getDivisionRank(divisionPoints).season).toEqual({
        'GK / SUB': { Olly: 0.5, Nick: 0.5 },
        AM: { Olly: 0.5, Nick: 0.5 }, // one array item for each manager
        CB: { Olly: 0.5, Nick: 0.5 },
        FB: { Olly: 0.5, Nick: 0.5 },
        MID: { Olly: 0.5, Nick: 0.5 },
        STR: { Olly: 0.5, Nick: 0.5 },
        total: { Olly: 0.5, Nick: 0.5 },
      });
    });

    it('should return a Oly with higher ranking (1) when Ollys points are higher', () => {
      const divisionPoints = [
        {
          manager: 'Olly',
          points: {
            'GK / SUB': { season: 11, gameWeek: 10 },
            CB: { season: 11, gameWeek: 10 },
            FB: { season: 11, gameWeek: 10 },
            MID: { season: 11, gameWeek: 10 },
            AM: { season: 11, gameWeek: 10 },
            STR: { season: 11, gameWeek: 10 },
            total: { season: 66, gameWeek: 60 },
          },
        },
        {
          manager: 'Nick',
          points: {
            'GK / SUB': { season: 1, gameWeek: 10 },
            CB: { season: 1, gameWeek: 10 },
            FB: { season: 1, gameWeek: 10 },
            MID: { season: 1, gameWeek: 10 },
            AM: { season: 1, gameWeek: 10 },
            STR: { season: 1, gameWeek: 10 },
            total: { season: 6, gameWeek: 60 },
          },
        },
      ];

      expect(getDivisionRank(divisionPoints).season).toEqual({
        'GK / SUB': { Olly: 1, Nick: 0 },
        AM: { Olly: 1, Nick: 0 },
        CB: { Olly: 1, Nick: 0 },
        FB: { Olly: 1, Nick: 0 },
        MID: { Olly: 1, Nick: 0 },
        STR: { Olly: 1, Nick: 0 },
        total: { Olly: 1, Nick: 0 },
      });
    });

    it('should return a Nick with higher ranking (1) when Nicks points are higher. test to ensure JS hasnt reordered anything', () => {
      const divisionPoints = [
        {
          manager: 'Olly',
          points: {
            'GK / SUB': { season: 11, gameWeek: 10 },
            CB: { season: 11, gameWeek: 10 },
            FB: { season: 11, gameWeek: 10 },
            MID: { season: 11, gameWeek: 10 },
            AM: { season: 11, gameWeek: 10 },
            STR: { season: 11, gameWeek: 10 },
            total: { season: 66, gameWeek: 60 },
          },
        },
        {
          manager: 'Nick',
          points: {
            'GK / SUB': { season: 111, gameWeek: 10 },
            CB: { season: 111, gameWeek: 10 },
            FB: { season: 111, gameWeek: 10 },
            MID: { season: 111, gameWeek: 10 },
            AM: { season: 111, gameWeek: 10 },
            STR: { season: 111, gameWeek: 10 },
            total: { season: 666, gameWeek: 60 },
          },
        },
      ];

      expect(getDivisionRank(divisionPoints).season).toEqual({
        'GK / SUB': { Olly: 0, Nick: 1 },
        AM: { Olly: 0, Nick: 1 },
        CB: { Olly: 0, Nick: 1 },
        FB: { Olly: 0, Nick: 1 },
        MID: { Olly: 0, Nick: 1 },
        STR: { Olly: 0, Nick: 1 },
        total: { Olly: 0, Nick: 1 },
      });
    });

    it('should correctly rank 3 players season, with differing points for positions', () => {
      const divisionPoints = [
        {
          manager: 'Olly',
          points: {
            'GK / SUB': { season: 1, gameWeek: 10 },
            CB: { season: 2, gameWeek: 10 },
            FB: { season: 3, gameWeek: 10 },
            MID: { season: 4, gameWeek: 10 },
            AM: { season: 5, gameWeek: 10 },
            STR: { season: 6, gameWeek: 10 },
            total: { season: 21, gameWeek: 60 },
          },
        },
        {
          manager: 'Nick',
          points: {
            'GK / SUB': { season: 6, gameWeek: 10 },
            CB: { season: 5, gameWeek: 10 },
            FB: { season: 4, gameWeek: 10 },
            MID: { season: 3, gameWeek: 10 },
            AM: { season: 2, gameWeek: 10 },
            STR: { season: 1, gameWeek: 10 },
            total: { season: 21, gameWeek: 60 },
          },
        },
        {
          manager: 'Pete',
          points: {
            'GK / SUB': { season: 7, gameWeek: 10 },
            CB: { season: 0, gameWeek: 10 },
            FB: { season: 3, gameWeek: 10 },
            MID: { season: 3, gameWeek: 10 },
            AM: { season: 0, gameWeek: 10 },
            STR: { season: 7, gameWeek: 10 },
            total: { season: 20, gameWeek: 60 },
          },
        },
      ];

      expect(getDivisionRank(divisionPoints).season).toEqual({
        'GK / SUB': { Olly: 0, Nick: 1, Pete: 2 },
        AM: { Olly: 2, Nick: 1, Pete: 0 },
        CB: { Olly: 1, Nick: 2, Pete: 0 },
        FB: { Olly: 0.5, Nick: 2, Pete: 0.5 },
        MID: { Olly: 2, Nick: 0.5, Pete: 0.5 },
        STR: { Olly: 1, Nick: 0, Pete: 2 },
        total: { Olly: 1.5, Nick: 1.5, Pete: 0 },
      });
    });

    it('should shows ties for the lead', () => {
      const divisionPoints = [
        {
          manager: 'Olly',
          points: {
            'GK / SUB': { season: 1, gameWeek: 10 },
            CB: { season: 1, gameWeek: 10 },
            FB: { season: 1, gameWeek: 10 },
            MID: { season: 1, gameWeek: 10 },
            AM: { season: 1, gameWeek: 10 },
            STR: { season: 1, gameWeek: 10 },
            total: { season: 6, gameWeek: 60 },
          },
        },
        {
          manager: 'Nick',
          points: {
            'GK / SUB': { season: 1, gameWeek: 10 },
            CB: { season: 2, gameWeek: 10 },
            FB: { season: 3, gameWeek: 10 },
            MID: { season: 1, gameWeek: 10 },
            AM: { season: 1, gameWeek: 10 },
            STR: { season: 1, gameWeek: 10 },
            total: { season: 9, gameWeek: 60 },
          },
        },
        {
          manager: 'Pete',
          points: {
            'GK / SUB': { season: 1, gameWeek: 10 },
            CB: { season: 2, gameWeek: 10 },
            FB: { season: 1, gameWeek: 10 },
            MID: { season: 1, gameWeek: 10 },
            AM: { season: 1, gameWeek: 10 },
            STR: { season: 1, gameWeek: 10 },
            total: { season: 7, gameWeek: 60 },
          },
        },
      ];

      expect(getDivisionRank(divisionPoints).season).toEqual({
        'GK / SUB': { Olly: 0.5, Nick: 0.5, Pete: 0.5 },
        AM: { Olly: 0.5, Nick: 0.5, Pete: 0.5 },
        CB: { Olly: 0, Nick: 1.5, Pete: 1.5 },
        FB: { Olly: 0.5, Nick: 2, Pete: 0.5 },
        MID: { Olly: 0.5, Nick: 0.5, Pete: 0.5 },
        STR: { Olly: 0.5, Nick: 0.5, Pete: 0.5 },
        total: { Olly: 0, Nick: 2, Pete: 1 },
      });
    });
  });
});
