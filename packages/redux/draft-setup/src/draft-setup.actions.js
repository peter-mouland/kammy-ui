import { fetchGraphQL } from '@kammy-ui/fetchr';

export const FETCH_DRAFT_SETUP = 'FETCH_DRAFT_SETUP';

export function fetchDraftSetup(opts) {
  return {
    type: FETCH_DRAFT_SETUP,
    async payload() {
      const draftSetup = await fetchGraphQL(`
query { 
  getDraftSetup {
    divisions { label id order }
    managers { manager division }
    draftPremierLeague { manager code position player }
    draftChampionship { manager code position player }
    draftLeagueOne { manager code position player }
 }
}
`, null, opts);
      return draftSetup;
    },
  };
}
