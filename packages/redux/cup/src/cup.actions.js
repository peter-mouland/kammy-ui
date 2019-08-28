import { fetchGraphQL } from '@kammy-ui/fetchr';

export const FETCH_CUP = 'FETCH_CUP';
export const FETCH_DRAFT_CUP = 'FETCH_DRAFT_CUP';
export const SAVE_CUP = 'SAVE_CUP';

export function fetchCup() {
  return {
    type: FETCH_CUP,
    payload: {
      promise: fetchGraphQL(`
query { 
  getCup {
    rounds groups managers
    teams {
      row group round manager rank points
      player1 { code pos name points rank }
      player2 { code pos name points rank }
      player3 { code pos name points rank }
      player4 { code pos name points rank }
    }
 }
} 
`),
    },
  };
}

export function fetchDraftCup() {
  return {
    type: FETCH_DRAFT_CUP,
    payload: {
      promise: fetchGraphQL(`
query { 
  getDraftCup {
    dateCreated round group manager player1 player2 player3 player4 
 }
} 
`),
    },
  };
}

export function resetCupSave() {
  return {
    type: `${SAVE_CUP}_RESET`,
  };
}

export function saveCupTeam(cupTeamInput) {
  return {
    type: SAVE_CUP,
    payload: {
      promise: fetchGraphQL(`
mutation SaveCupTeam($cupTeamInput: CupTeamInput) { 
  saveCupTeam(
    cupTeamInput: $cupTeamInput,
  ) { success message }
}
    `, {
        cupTeamInput,
      }),
    },
  };
}
