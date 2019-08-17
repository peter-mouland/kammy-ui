/* eslint-env jest */
import Division from './Division';
import GameWeeks from '../game-weeks/GameWeeks';

const team = require('../../fixtures/team.json');
const gameWeeksFixture = require('../../fixtures/gameweeks.json');

let gameWeeks;
let transfers;
let transfer;
let players;
let draft;
let divisionByGameWeek;
let division;

describe('Division', () => {
  beforeEach(() => {
    players = [
      {
        name: 'de Gea, David',
        pos: 'GK',
      },
      {
        pos: 'CB',
        name: 'Stones, John',
      },
      {
        pos: 'CB',
        name: 'Koscielny, Laurent',
      },
      {
        pos: 'FB',
        name: 'Alonso, Marcos',
      },
      {
        pos: 'FB',
        name: 'Kolasinac, Sead',
      },
      {
        pos: 'MID',
        name: 'Milner, James',
      },
      {
        pos: 'MID',
        name: 'Seri, Jean-Michael',
      },
      {
        pos: 'AM',
        name: 'Eriksen, Christian',
      },
      {
        pos: 'AM',
        name: 'Pedro,',
      },
      {
        pos: 'FWD',
        name: 'Lukaku, Romelu',
      },
      {
        pos: 'FWD',
        name: 'Defoe, Jermain',
      },
      {
        pos: 'FWD',
        name: 'Hernandez, Javier',
      },
    ];
    gameWeeks = new GameWeeks({ gameWeeks: gameWeeksFixture });
    transfer = {
      codeIn: '',
      codeOut: '',
      manager: 'Olly',
      status: 'Y',
      timestamp: '2018/08/12 18:00:00',
      transferIn: 'Zarate, Mauro',
      transferOut: 'Lukaku, Romelu',
      type: 'Transfer',
    };
    transfers = [transfer];
    division = 'example-division';
    draft = {
      byDivision: {
        managers: {
          [division]: ['Olly'],
        },
      },
      byManager: {
        players: { Olly: team.map(({ name }) => name) },
      },
      drafts: {
        [division]: team,
      },
    };
  });

  it('returns division to help out client-side reducers', () => {
    divisionByGameWeek = new Division({
      division, gameWeeks, draft, transfers, players,
    });
    expect(divisionByGameWeek).toHaveProperty('division', division);
  });

  it('returns transfers to help out client-side reducers', () => {
    divisionByGameWeek = new Division({
      division, gameWeeks, draft, transfers, players,
    });
    expect(divisionByGameWeek).toHaveProperty('transfers');
  });

  it('returns a list of managers', () => {
    divisionByGameWeek = new Division({
      division, gameWeeks, draft, transfers, players,
    });
    expect(divisionByGameWeek).toHaveProperty('managers', ['Olly']);
  });

  it('returns a list of drafted players', () => {
    divisionByGameWeek = new Division({
      division, gameWeeks, draft, transfers, players,
    });
    expect(divisionByGameWeek).toHaveProperty('draft', team);
  });

  it('returns a list of currentTeams', () => {
    divisionByGameWeek = new Division({
      division, gameWeeks, draft, transfers, players,
    });
    expect(divisionByGameWeek).toHaveProperty('currentTeams');
    expect(divisionByGameWeek.currentTeams).toHaveProperty('gameWeek');
    expect(divisionByGameWeek.currentTeams).toHaveProperty('players');
    expect(divisionByGameWeek.currentTeams.players).toHaveLength(players.length);
  });

  it('returns a list of teamsByGameWeek', () => {
    divisionByGameWeek = new Division({
      division, gameWeeks, draft, transfers, players,
    });
    expect(divisionByGameWeek).toHaveProperty('teamsByGameWeek');
    expect(divisionByGameWeek.teamsByGameWeek).toHaveLength(gameWeeks.gameWeeks.length);
  });
});
