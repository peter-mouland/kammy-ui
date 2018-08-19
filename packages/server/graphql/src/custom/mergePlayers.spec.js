/* eslint-env jest */
import { mergePlayersData } from './mergePlayers';

const gameWeeks = [
  {
    gameWeek: 1,
    start: '2018-08-10 19:00:00',
    end: '2018-08-18 10:59:59',
  },
  {
    gameWeek: '2',
    start: '2018-08-18 11:00:00',
    end: '2018-08-25 10:59:59',
  },
];

describe('mergePlayersData()', () => {
  it('merges skysports + spreadsheet with gameweek points', () => {
    const spreadsheetPlayers = {
      pete: {
        name: 'pete',
        pos: 'ssPos',
        isHidden: false,
        new: false,
      },
    };
    const skySportsPlayers = {
      pete: {
        name: 'pete',
        skySportsClub: 'club',
        code: 'code',
        value: 1,
        skySportsPosition: 'skySportsPosition',
        fixtures: [
          {
            pos: 'skyPos',
            aScore: 2,
            aTname: 'Manchester City',
            date: '2018-08-12 17:30:00',
            event: 2,
            hScore: 0,
            hTname: 'Brighton',
            status: 'PLAYED',
            stats: [
              1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 2, 0, 9,
            ],
          },
          {
            pos: 'skyPos',
            aScore: 2,
            aTname: 'Manchester City',
            date: '2018-08-13 17:30:00',
            event: 2,
            hScore: 0,
            hTname: 'Brighton',
            status: 'PLAYED',
            stats: [
              1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 2, 0, 9,
            ],
          },
          {
            pos: 'skyPos',
            aScore: 2,
            aTname: 'Manchester City',
            date: '2018-09-13 17:30:00',
            event: 2,
            hScore: 0,
            hTname: 'Brighton',
            status: 'PLAYED',
            stats: [
              1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 2, 0, 9,
            ],
          }],
      },
    };
    const mergedData = mergePlayersData({ spreadsheetPlayers, skySportsPlayers, gameWeeks });
    const expected = {
      pete: {
        ...skySportsPlayers.pete,
        isHidden: false,
        new: false,
        value: 1,
        club: 'club',
        pos: 'ssPos',
      },
    };
    delete expected.pete.skySportsClub;
    expect(mergedData).toEqual(expected);
  });

  it('ignores data that is not found within sky sports', () => {
    const spreadsheetPlayers = {
      peter: {
        name: 'peter',
        pos: 'ssPos',
        isHidden: true,
        new: false,
      },
    };
    const skySportsPlayers = {
      pete: {
        name: 'pete',
        skySportsClub: 'club',
        code: 'code',
        value: 1,
        skySportsPosition: 'skySportsPosition',
        fixtures: [
          {
            aScore: 2,
            aTname: 'Manchester City',
            date: '2018-08-12 17:30:00',
            event: 2,
            hScore: 0,
            hTname: 'Brighton',
            status: 'PLAYED',
            stats: [
              1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 2, 0, 9,
            ],
          }],
      },
    };
    const mergedData = mergePlayersData({ spreadsheetPlayers, skySportsPlayers, gameWeeks });
    const expected = {
      pete: {
        ...skySportsPlayers.pete,
        isHidden: false,
        new: true,
        value: 1,
        club: 'club',
        pos: '',
      },
    };
    delete expected.pete.skySportsClub;
    expect(mergedData).toEqual(expected);
  });
});
