import { getDraftSetup } from './draft-setup.selectors';
import { FETCH_DRAFT_SETUP } from './draft-setup.actions';
import reducer from './draft-setup.reducer';

const divisions = [{ id: 'Championship', label: 'cship' }, { id: 'LeagueOne', label: 'League1' }, { id: 'PremierLeague', label: 'Premier League' }];
const managers = [{ manager: 'pete', division: 'Championship' }, { manager: 'john', division: 'Championship' }, { manager: 'paul', division: 'LeagueOne' }];
const draftPremierLeague = [];
const draftChampionship = [{ manager: 'pete', player: 'awesom' }, { manager: 'pete', player: 'awesom2' }, { manager: 'john', player: 'shite' }];
const draftLeagueOne = [{ manager: 'paul', player: 'wtf' }];

describe('getDraftSetup', () => {
  it('should return given structures', () => {
    const action = {
      type: `${FETCH_DRAFT_SETUP}_FULFILLED`,
      payload: {
        data: {
          getDraftSetup: {
            managers, divisions, draftLeagueOne, draftChampionship, draftPremierLeague,
          },
        },
      },
    };
    const state = { draftSetup: reducer({}, action) };
    expect(getDraftSetup(state).managers).toEqual(managers);
    expect(getDraftSetup(state).divisions).toEqual(divisions);
    expect(getDraftSetup(state).draftPremierLeague).toEqual(draftPremierLeague);
    expect(getDraftSetup(state).draftChampionship).toEqual(draftChampionship);
    expect(getDraftSetup(state).draftLeagueOne).toEqual(draftLeagueOne);
  });

  it('should return entities by manager', () => {
    const action = {
      type: `${FETCH_DRAFT_SETUP}_FULFILLED`,
      payload: {
        data: {
          getDraftSetup: {
            managers, divisions, draftLeagueOne, draftChampionship, draftPremierLeague,
          },
        },
      },
    };
    const state = { draftSetup: reducer({}, action) };
    expect(getDraftSetup(state).byManager.draft).toEqual({
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
          getDraftSetup: {
            managers, divisions, draftLeagueOne, draftChampionship, draftPremierLeague,
          },
        },
      },
    };
    const state = { draftSetup: reducer({}, action) };

    expect(getDraftSetup(state).byDivisions.managers).toEqual({
      Championship: ['pete', 'john'],
      LeagueOne: ['paul'],
      PremierLeague: [],
    });
    expect(getDraftSetup(state).byDivisions.draft).toEqual({
      Championship: ['awesom', 'awesom2', 'shite'],
      LeagueOne: ['wtf'],
      PremierLeague: [],
    });
  });
});
