/* eslint-env jest */
import toDate from '@kammy-ui/helpers-to-date';

import TeamSeason, { UNKNOWN_PLAYER } from './TeamSeason';

let gameWeeks;
let transfers;
let players;
let team;
let teamSeason;
let startOfSeason;
let endOfSeason;

const mockPlayer = require('../fixtures/player.json');
const teamFixture = require('../fixtures/team.json');
const gameWeeksFixture = require('../fixtures/gameweeks.json');


describe('TeamSeason', () => {
  beforeEach(() => {
    team = teamFixture;
    players = {
      ...mockPlayer,
    };
    gameWeeks = gameWeeksFixture;
    transfers = [
      {
        codeIn: '',
        codeOut: '',
        manager: 'Olly',
        status: 'Y',
        timestamp: '2018-08-12 18:00:00',
        transferIn: 'Zarate, Mauro',
        transferOut: 'Lukaku, Romelu',
        type: 'Transfer',
      },
    ];
    startOfSeason = toDate(gameWeeks[0].start).setHours(0, 0, 0, 0);
    endOfSeason = toDate(gameWeeks[gameWeeks.length - 1].end).setHours(23, 59, 59, 999);
  });

  it('returns data', () => {
    teamSeason = new TeamSeason({
      gameWeeks, players, transfers, team,
    });
    expect(teamSeason).toHaveProperty('startOfSeason', startOfSeason);
    expect(teamSeason).toHaveProperty('endOfSeason', endOfSeason);
    expect(teamSeason).toHaveProperty('gameWeeks', gameWeeks);
    expect(teamSeason).toHaveProperty('getSeason');
    expect(teamSeason).toHaveProperty('team', team);
    expect(teamSeason).toHaveProperty('players', players);
    expect(teamSeason).toHaveProperty('transfers', transfers);
  });

  describe('getPlayer()', () => {
    beforeEach(() => {
      teamSeason = new TeamSeason({
        gameWeeks, players: { 'de Gea, David': 'found' }, transfers, team,
      });
    });

    it('returns a default unknown player is passed', () => {
      expect(teamSeason.getPlayer({ name: '' })).toEqual(UNKNOWN_PLAYER(''));
    });

    it('returns a known player if matched', () => {
      expect(teamSeason.getPlayer({ name: 'de Gea, David' })).toEqual('found');
    });
  });

  describe('getPlayerTransfers()', () => {
    it('returns a default unknown player with type as draft to say this player existed since draft day', () => {
      teamSeason = new TeamSeason({
        gameWeeks, players: { 'de Gea, David': 'found' }, transfers, team,
      });
      expect(teamSeason.getPlayerTransfers({ name: 'de Gea, David' })).toEqual([{
        end: endOfSeason,
        start: startOfSeason,
        player: 'found',
        playerOut: null,
        type: 'draft',
      }]);
    });

    it('returns a players transfers where dates match the transfer timestamp', () => {
      teamSeason = new TeamSeason({
        gameWeeks,
        players: {
          'de Gea, David': { name: 'de Gea, David' },
          'Hernandez, Javier': { name: 'Hernandez, Javier' },
        },
        transfers: [{
          ...transfers[0],
          transferOut: 'de Gea, David',
          transferIn: 'Hernandez, Javier',
        }],
        team,
      });
      expect(teamSeason.getPlayerTransfers({ name: 'de Gea, David' })).toEqual([
        {
          end: toDate(transfers[0].timestamp), player: { name: 'de Gea, David' }, playerOut: null, start: startOfSeason, type: 'draft',
        },
        {
          end: endOfSeason, player: { name: 'Hernandez, Javier' }, playerOut: { name: 'de Gea, David' }, start: toDate(transfers[0].timestamp), type: 'Transfer',
        },
      ]);
    });

    describe('type swap', () => {
      it('returns a players transfers where dates match the transfer timestamp', () => {
        teamSeason = new TeamSeason({
          gameWeeks,
          players: {
            'de Gea, David': { name: 'de Gea, David' },
            'another player': { name: 'another player' },
            'Hernandez, Javier': { name: 'Hernandez, Javier' },
          },
          transfers: [{
            ...transfers[0],
            type: 'Swap',
            transferOut: 'Hernandez, Javier',
            transferIn: 'de Gea, David',
          }],
          team,
        });
        expect(teamSeason.getPlayerTransfers({ name: 'de Gea, David' })).toEqual([
          {
            end: toDate(transfers[0].timestamp), player: { name: 'de Gea, David' }, playerOut: null, start: startOfSeason, type: 'draft',
          },
          {
            end: endOfSeason, player: { name: 'Hernandez, Javier' }, playerOut: { name: 'de Gea, David' }, start: toDate(transfers[0].timestamp), type: 'Swap',
          },
        ]);
      });
    });
  });

  describe('getSeason', () => {
    it('should return an array of containing the team', () => {
      teamSeason = new TeamSeason({
        gameWeeks, players, transfers, team,
      });
      expect(teamSeason.getSeason()).toHaveLength(team.length);
    });

    it('should return each team player containing an array of gameWeeks', () => {
      teamSeason = new TeamSeason({
        gameWeeks, players, transfers, team,
      });
      expect(teamSeason.getSeason()[0].gameWeeks).toHaveLength(gameWeeks.length);
    });

    it('should return each team player containing an array of seasonToGameWeek', () => {
      teamSeason = new TeamSeason({
        gameWeeks, players, transfers, team,
      });
      expect(teamSeason.getSeason()[0].seasonToGameWeek).toHaveLength(gameWeeks.length);
    });

    it('should return each team player containing an array of seasonStats', () => {
      teamSeason = new TeamSeason({
        gameWeeks, players, transfers, team,
      });
      expect(teamSeason.getSeason()[0]).toHaveProperty('seasonStats');
    });

    it('should return gameWeeks containing stats', () => {
      teamSeason = new TeamSeason({
        gameWeeks, players, transfers, team,
      });
      expect(teamSeason.getSeason()[0].gameWeeks[0]).toHaveProperty('stats');
      expect(teamSeason.getSeason()[0].gameWeeks[0]).toHaveProperty('gameWeekStats');
      expect(teamSeason.getSeason()[0].gameWeeks[0]).toHaveProperty('name', 'de Gea, David');
      expect(teamSeason.getSeason()[0].gameWeeks[0]).toHaveProperty('pos');
      expect(teamSeason.getSeason()[0].gameWeeks[0]).toHaveProperty('isHidden');
      expect(teamSeason.getSeason()[0].gameWeeks[0]).toHaveProperty('new');
      expect(teamSeason.getSeason()[0].gameWeeks[0]).toHaveProperty('club');
      expect(teamSeason.getSeason()[0].gameWeeks[0]).toHaveProperty('fixtures');
      expect(teamSeason.getSeason()[0].gameWeeks[0]).toHaveProperty('code');
    });
  });
});
