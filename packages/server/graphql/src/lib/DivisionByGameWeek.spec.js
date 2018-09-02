/* eslint-env jest */
import DivisionByGameWeek from './DivisionByGameWeek';

const team = require('../fixtures/team.json');
const gameWeeksFixture = require('../fixtures/gameweeks.json');

let gameWeeks;
let transfers;
let transfer;
let players;
let draft;
let divisionByGameWeek;
let currentGameWeek;
let division;

describe('DivisionByGameWeek', () => {
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
    gameWeeks = gameWeeksFixture;
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
    transfers = {
      Olly: [transfer],
    };
    draft = {
      Olly: team,
    };
    currentGameWeek = 1;
    division = 'example-division';
  });

  it('returns division to help out client-side reducers', () => {
    divisionByGameWeek = new DivisionByGameWeek({
      division, gameWeeks, draft, transfers, players, currentGameWeek,
    });
    expect(divisionByGameWeek).toHaveProperty('division', division);
  });

  it('returns transfers to help out client-side reducers', () => {
    divisionByGameWeek = new DivisionByGameWeek({
      division, gameWeeks, draft, transfers, players, currentGameWeek,
    });
    expect(divisionByGameWeek).toHaveProperty('transfers', [transfer]);
  });

  it('returns a list of managers', () => {
    divisionByGameWeek = new DivisionByGameWeek({
      division, gameWeeks, draft, transfers, players, currentGameWeek,
    });
    expect(divisionByGameWeek).toHaveProperty('managers', ['Olly']);
  });

  it('returns a list of drafted players', () => {
    divisionByGameWeek = new DivisionByGameWeek({
      division, gameWeeks, draft, transfers, players, currentGameWeek,
    });
    expect(divisionByGameWeek).toHaveProperty('draft', team);
  });

  it('returns a list of currentTeams', () => {
    divisionByGameWeek = new DivisionByGameWeek({
      division, gameWeeks, draft, transfers, players, currentGameWeek,
    });
    expect(divisionByGameWeek).toHaveProperty('currentTeams');
    expect(divisionByGameWeek.currentTeams).toHaveProperty('gameWeek', String(currentGameWeek));
    expect(divisionByGameWeek.currentTeams).toHaveProperty('players');
    expect(divisionByGameWeek.currentTeams.players).toHaveLength(players.length);
  });

  it('returns a list of teamsByGameWeek', () => {
    divisionByGameWeek = new DivisionByGameWeek({
      division, gameWeeks, draft, transfers, players, currentGameWeek,
    });
    expect(divisionByGameWeek).toHaveProperty('teamsByGameWeek');
    expect(divisionByGameWeek.teamsByGameWeek).toHaveLength(gameWeeks.length);
  });
});
