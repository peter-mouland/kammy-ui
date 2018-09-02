/* eslint-disable */
/* eslint-env jest */
import Cup from './Cup';

const team = require('../fixtures/team.json');
const gameWeeksFixture = require('../fixtures/gameweeks.json');

let gameWeeks;
let transfers;
let transfer;
let players;
let draft;
let currentGameWeek;
let division;

describe('Cup', () => {
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

  it.skip('returns division to help out client-side reducers', () => {
  });
});
