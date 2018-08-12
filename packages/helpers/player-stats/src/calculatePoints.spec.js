/* eslint-env jest */
import * as calculatePoints from './calculatePoints';

let position;

describe('calculatePoints', () => {
  describe('for any player', () => {
    it('returns 3 points for each start', () => {
      expect(calculatePoints.forStarting(1)).toEqual(3);
      expect(calculatePoints.forStarting(0)).toEqual(0);
      expect(calculatePoints.forStarting(10)).toEqual(30);
    });

    it('returns 1 points for each sub', () => {
      expect(calculatePoints.forSub(1)).toEqual(1);
      expect(calculatePoints.forSub(0)).toEqual(0);
      expect(calculatePoints.forSub(10)).toEqual(10);
    });

    it('returns 3 points for each assist', () => {
      expect(calculatePoints.forAssists(1)).toEqual(3);
      expect(calculatePoints.forAssists(0)).toEqual(0);
      expect(calculatePoints.forAssists(10)).toEqual(30);
    });

    it('returns -2 points for each yellow card', () => {
      expect(calculatePoints.forYellowCards(1)).toEqual(-2);
      expect(calculatePoints.forYellowCards(0)).toEqual(0);
      expect(calculatePoints.forYellowCards(10)).toEqual(-20);
    });

    it('returns -5 points for each red card', () => {
      expect(calculatePoints.forRedCards(1)).toEqual(-5);
      expect(calculatePoints.forRedCards(0)).toEqual(0);
      expect(calculatePoints.forRedCards(10)).toEqual(-50);
    });
  });

  describe('when a GK has points calculated', () => {
    beforeEach(() => {
      position = 'GK';
    });

    it('returns 10 points for each goal', () => {
      expect(calculatePoints.forGoals(1, position)).toEqual(10);
      expect(calculatePoints.forGoals(0, position)).toEqual(0);
      expect(calculatePoints.forGoals(10, position)).toEqual(100);
    });


    it('returns 3 points for save bonus', () => {
      expect(calculatePoints.forSaveBonus(1, position)).toEqual(3);
      expect(calculatePoints.forSaveBonus(0, position)).toEqual(0);
      expect(calculatePoints.forSaveBonus(10, position)).toEqual(30);
    });

    it('returns 5 points for each clean sheet', () => {
      expect(calculatePoints.forCleanSheet(1, position)).toEqual(5);
      expect(calculatePoints.forCleanSheet(0, position)).toEqual(0);
      expect(calculatePoints.forCleanSheet(10, position)).toEqual(50);
    });

    it('returns -1 points for each conceeded', () => {
      expect(calculatePoints.forConceded(1, position)).toEqual(-1);
      expect(calculatePoints.forConceded(0, position)).toEqual(0);
      expect(calculatePoints.forConceded(10, position)).toEqual(-10);
    });

    it('returns +5 points for each pen saved', () => {
      expect(calculatePoints.forPenaltiesSaved(1, position)).toEqual(5);
      expect(calculatePoints.forPenaltiesSaved(0, position)).toEqual(0);
      expect(calculatePoints.forPenaltiesSaved(10, position)).toEqual(50);
    });

    it('return a correct totals', () => {
      const stats = {
        apps: 1, subs: 1, mom: 1, gls: 1, tb: 1, sb: 1, asts: 1, cs: 1, con: 1, pensv: 1, ycard: 1, rcard: 1,
      };
      const points = calculatePoints.calculateTotalPoints({ stats, pos: position });
      expect(points.total).toEqual(22);
    });
  });

  describe('when a FB has points calculated', () => {
    beforeEach(() => {
      position = 'FB';
    });

    it('returns 8 points for each goal', () => {
      expect(calculatePoints.forGoals(1, position)).toEqual(8);
      expect(calculatePoints.forGoals(0, position)).toEqual(0);
      expect(calculatePoints.forGoals(10, position)).toEqual(80);
    });

    it('returns 5 points for each clean sheet', () => {
      expect(calculatePoints.forCleanSheet(1, position)).toEqual(5);
      expect(calculatePoints.forCleanSheet(0, position)).toEqual(0);
      expect(calculatePoints.forCleanSheet(10, position)).toEqual(50);
    });

    it('returns -1 points for each clean sheet', () => {
      expect(calculatePoints.forConceded(1, position)).toEqual(-1);
      expect(calculatePoints.forConceded(0, position)).toEqual(0);
      expect(calculatePoints.forConceded(10, position)).toEqual(-10);
    });

    it('return a correct points', () => {
      const stats = {
        apps: 1, subs: 1, mom: 1, gls: 1, tb: 1, sb: 1, asts: 1, cs: 1, con: 1, pensv: 1, ycard: 1, rcard: 1,
      };
      const points = calculatePoints.calculateTotalPoints({ stats, pos: position });
      expect(points.total).toEqual(20);
    });
  });

  describe('when a CB has points calculated', () => {
    beforeEach(() => {
      position = 'CB';
    });

    it('returns 8 points for each goal', () => {
      expect(calculatePoints.forGoals(1, position)).toEqual(8);
      expect(calculatePoints.forGoals(0, position)).toEqual(0);
      expect(calculatePoints.forGoals(10, position)).toEqual(80);
    });

    it('returns 5 points for each clean sheet', () => {
      expect(calculatePoints.forCleanSheet(1, position)).toEqual(5);
      expect(calculatePoints.forCleanSheet(0, position)).toEqual(0);
      expect(calculatePoints.forCleanSheet(10, position)).toEqual(50);
    });

    it('returns -1 points for each clean sheet', () => {
      expect(calculatePoints.forConceded(1, position)).toEqual(-1);
      expect(calculatePoints.forConceded(0, position)).toEqual(0);
      expect(calculatePoints.forConceded(10, position)).toEqual(-10);
    });

    it('return a correct points', () => {
      const stats = {
        apps: 1, subs: 1, mom: 1, gls: 1, tb: 1, sb: 1, asts: 1, cs: 1, con: 1, pensv: 1, ycard: 1, rcard: 1,
      };
      const points = calculatePoints.calculateTotalPoints({ stats, pos: position });
      expect(points.total).toEqual(20);
    });
  });

  describe('when a MID has points calculated', () => {
    beforeEach(() => {
      position = 'MID';
    });
    it('returns 6 points for each goal', () => {
      expect(calculatePoints.forGoals(1, position)).toEqual(6);
      expect(calculatePoints.forGoals(0, position)).toEqual(0);
      expect(calculatePoints.forGoals(10, position)).toEqual(60);
    });

    it('returns 3 points for Tackle Bonus', () => {
      expect(calculatePoints.forTackleBonus(1, position)).toEqual(3);
      expect(calculatePoints.forTackleBonus(0, position)).toEqual(0);
      expect(calculatePoints.forTackleBonus(10, position)).toEqual(30);
    });

    it('returns 0 points for each clean sheet', () => {
      expect(calculatePoints.forCleanSheet(1, position)).toEqual(0);
      expect(calculatePoints.forCleanSheet(0, position)).toEqual(0);
      expect(calculatePoints.forCleanSheet(10, position)).toEqual(0);
    });

    it('returns 0 points for each conceded', () => {
      expect(calculatePoints.forConceded(1, position)).toEqual(0);
      expect(calculatePoints.forConceded(0, position)).toEqual(0);
      expect(calculatePoints.forConceded(10, position)).toEqual(0);
    });

    it('return a correct points', () => {
      const stats = {
        apps: 1, subs: 1, mom: 1, gls: 1, tb: 1, sb: 1, asts: 1, cs: 1, con: 1, pensv: 1, ycard: 1, rcard: 1,
      };
      const points = calculatePoints.calculateTotalPoints({ stats, pos: position });
      expect(points.total).toEqual(14);
    });
  });

  describe('when a AM has points calculated', () => {
    beforeEach(() => {
      position = 'AM';
    });

    it('returns 5 points for each goal', () => {
      expect(calculatePoints.forGoals(1, position)).toEqual(5);
      expect(calculatePoints.forGoals(0, position)).toEqual(0);
      expect(calculatePoints.forGoals(10, position)).toEqual(50);
    });

    it('returns 0 points for each clean sheet', () => {
      expect(calculatePoints.forCleanSheet(1, position)).toEqual(0);
      expect(calculatePoints.forCleanSheet(0, position)).toEqual(0);
      expect(calculatePoints.forCleanSheet(10, position)).toEqual(0);
    });

    it('returns 0 points for each clean sheet', () => {
      expect(calculatePoints.forConceded(1, position)).toEqual(0);
      expect(calculatePoints.forConceded(0, position)).toEqual(0);
      expect(calculatePoints.forConceded(10, position)).toEqual(0);
    });

    it('return a correct points', () => {
      const stats = {
        apps: 1, subs: 1, mom: 1, gls: 1, tb: 1, sb: 1, asts: 1, cs: 1, con: 1, pensv: 1, ycard: 1, rcard: 1,
      };
      const points = calculatePoints.calculateTotalPoints({ stats, pos: position });
      expect(points.total).toEqual(10);
    });
  });

  describe('when a STR has points calculated', () => {
    beforeEach(() => {
      position = 'STR';
    });

    it('returns 4 points for each goal', () => {
      expect(calculatePoints.forGoals(1, position)).toEqual(4);
      expect(calculatePoints.forGoals(0, position)).toEqual(0);
      expect(calculatePoints.forGoals(10, position)).toEqual(40);
    });

    it('returns 0 points for each clean sheet', () => {
      expect(calculatePoints.forCleanSheet(1, position)).toEqual(0);
      expect(calculatePoints.forCleanSheet(0, position)).toEqual(0);
      expect(calculatePoints.forCleanSheet(10, position)).toEqual(0);
    });

    it('returns 0 points for each clean sheet', () => {
      expect(calculatePoints.forConceded(1, position)).toEqual(0);
      expect(calculatePoints.forConceded(0, position)).toEqual(0);
      expect(calculatePoints.forConceded(10, position)).toEqual(0);
    });

    it('return a correct points', () => {
      const stats = {
        apps: 1, subs: 1, mom: 1, gls: 1, tb: 1, sb: 1, asts: 1, cs: 1, con: 1, pensv: 1, ycard: 1, rcard: 1,
      };
      const points = calculatePoints.calculateTotalPoints({ stats, pos: position });
      expect(points.total).toEqual(9);
    });
  });
});
