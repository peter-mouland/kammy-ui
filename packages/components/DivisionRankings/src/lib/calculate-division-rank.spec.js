/* eslint-disable */
import getTeamPoints from './calculate-division-rank';

const teams = { 'Olly': 'Manager details', 'Nick': 'Manager details' };
const managersSeason = {
  "Olly":[{
    teamPos: 'GK',
    gameWeeks: [ {"gameWeekStats":{"points":0}}, {"gameWeekStats":{"points":1}} ],
    seasonToGameWeek: [ {"points":0}, {"points":1} ],
    seasonStats: {"points":1},
  },{
    teamPos: 'FB',
    gameWeeks: [ {"gameWeekStats":{"points":0}}, {"gameWeekStats":{"points":1}} ],
    seasonToGameWeek: [ {"points":0}, {"points":1} ],
    seasonStats: {"points":2},
  },{
    teamPos: 'FB',
    gameWeeks: [ {"gameWeekStats":{"points":0}}, {"gameWeekStats":{"points":1}} ],
    seasonToGameWeek: [ {"points":0}, {"points":1} ],
    seasonStats: {"points":2},
  }],
  "Nick":[{
    teamPos: 'GK',
    gameWeeks: [ {"gameWeekStats":{"points":3}}, {"gameWeekStats":{"points":4}} ],
    seasonToGameWeek: [ {"points":3}, {"points":4} ],
    seasonStats: {"points":1},
  },{
    teamPos: 'FB',
    gameWeeks: [ {"gameWeekStats":{"points":3}}, {"gameWeekStats":{"points":4}} ],
    seasonToGameWeek: [ {"points":3}, {"points":4} ],
    seasonStats: {"points":7},
  },{
    teamPos: 'FB',
    gameWeeks: [ {"gameWeekStats":{"points":3}}, {"gameWeekStats":{"points":4}} ],
    seasonToGameWeek: [ {"points":3}, {"points":4} ],
    seasonStats: {"points":7},
  }],
};

describe('getTeamPoints()', () => {
  it('should return an array the length of the teams', () => {
    const divisionPoints = getTeamPoints(teams, managersSeason, 0);
    expect(divisionPoints).toHaveLength(2);
  });

  it('should return the manager details', () => {
    const divisionPoints = getTeamPoints(teams, managersSeason, 0);
    expect(divisionPoints[0]).toHaveProperty('manager', 'Olly');
  });

  describe('calculations based on the given intGameWeek', () => {
    it('should return the aggregate POSITION (GK/SUB) points for the gameWeek and season', () => {
      const divisionPoints = getTeamPoints(teams, managersSeason, 0);
      expect(divisionPoints[0]).toHaveProperty('positionPoints');
      expect(divisionPoints[0].positionPoints).toHaveProperty('GK / SUB', {
          gameWeek: 0,
          season: 0,
          rank: -1,
      });
    });
    it('should return the aggregate POSITION (FB) points for the gameWeek and season', () => {
      const divisionPoints = getTeamPoints(teams, managersSeason, 0);
      expect(divisionPoints[0]).toHaveProperty('positionPoints');
      expect(divisionPoints[0].positionPoints).toHaveProperty('FB', {
          gameWeek: 0,
          season: 0,
          rank: -1,
      });
    });

    it('should calculate the total points for all positions', () => {
      const divisionPoints = getTeamPoints(teams, managersSeason, 0);
      expect(divisionPoints[0].positionPoints).toHaveProperty('total', {
          gameWeek: 0,
          season: 0,
          rank: -1,
      });
    });

    it('should return the aggregate POSITION (GK/SUB) points for the gameWeek and season', () => {
      const divisionPoints = getTeamPoints(teams, managersSeason, 1);
      expect(divisionPoints[0]).toHaveProperty('positionPoints');
      expect(divisionPoints[0].positionPoints).toHaveProperty('GK / SUB', {
        gameWeek: 1,
        season: 1,
        rank: -1,
      });
    });

    it('should return the aggregate POSITION (FB) points for the gameWeek and season', () => {
      const divisionPoints = getTeamPoints(teams, managersSeason, 1);
      expect(divisionPoints[0]).toHaveProperty('positionPoints');
      expect(divisionPoints[0].positionPoints).toHaveProperty('FB', {
        gameWeek: 2,
        season: 2,
        rank: -1,
      });
    });

    it('should calculate the total points for all positions', () => {
      const divisionPoints = getTeamPoints(teams, managersSeason, 1);
      expect(divisionPoints[0].positionPoints).toHaveProperty('total', {
        gameWeek: 3,
        season: 3,
        rank: -1,
      });
    });
  });
});
