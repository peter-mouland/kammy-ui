/* eslint-env jest */
import { getDraftSetup } from './draft-setup.selectors';
import { FETCH_DRAFT_SETUP } from './draft-setup.actions';
import reducer from './draft-setup.reducer';

const draftPremierLeague = [];
const draftChampionship = [{ manager: 'pete', player: 'awesom' }, { manager: 'pete', player: 'awesom2' }, { manager: 'john', player: 'shite' }];
const draftLeagueOne = [{ manager: 'paul', player: 'wtf' }];
const testPayload = {
  managers: [{ manager: 'pete', division: 'championship' }, { manager: 'john', division: 'championship' }, { manager: 'paul', division: 'leagueOne' }],
  divisions: [{ id: 'championship', label: 'cship' }, { id: 'leagueOne', label: 'League1' }, { id: 'premierLeague', label: 'Premier League' }],
  draftLeagueOne,
  draftChampionship,
  draftPremierLeague,
};

describe('getDraftSetup', () => {
  it('should return given structures', () => {
    const action = {
      type: `${FETCH_DRAFT_SETUP}_FULFILLED`,
      payload: {
        data: {
          getDraftSetup: testPayload,
        },
      },
    };
    const state = { draftSetup: reducer({}, action) };
    const { drafts, managers, divisions } = getDraftSetup(state);
    expect(managers).toEqual(testPayload.managers);
    expect(divisions).toEqual(testPayload.divisions);
    expect(drafts.premierLeague).toEqual(draftPremierLeague);
    expect(drafts.championship).toEqual(draftChampionship);
    expect(drafts.leagueOne).toEqual(draftLeagueOne);
  });

  it('should return entities by manager', () => {
    const action = {
      type: `${FETCH_DRAFT_SETUP}_FULFILLED`,
      payload: {
        data: {
          getDraftSetup: testPayload,
        },
      },
    };
    const state = { draftSetup: reducer({}, action) };
    expect(getDraftSetup(state).byManager.playerNames).toEqual({
      pete: ['awesom', 'awesom2'],
      john: ['shite'],
      paul: ['wtf'],
    });
  });

  it('should return entities by division', () => {
    const action = {
      type: `${FETCH_DRAFT_SETUP}_FULFILLED`,
      payload: {
        data: {
          getDraftSetup: testPayload,
        },
      },
    };
    const state = { draftSetup: reducer({}, action) };

    expect(getDraftSetup(state).byDivision.managers).toEqual({
      championship: ['john', 'pete'],
      leagueOne: ['paul'],
      premierLeague: [],
    });
    expect(getDraftSetup(state).byDivision.playerNames).toEqual({
      championship: ['awesom', 'awesom2', 'shite'],
      leagueOne: ['wtf'],
      premierLeague: [],
    });
  });
});
