import { fetchGraphQL } from '@kammy-ui/fetchr';

export const FETCH_DIVISION = 'FETCH_DIVISION';

export function fetchDivision(division) {
  return {
    type: FETCH_DIVISION,
    payload: fetchGraphQL(`
query ($division: String) { 
  getDivision(division: $division) {
    transfers {
      status
      timestamp
      manager
      transferIn
      transferOut
      type
    }
    managers
    draft {
      manager code pos name
    }
    teamsByGameWeek {
      gameWeek
      start
      end
      players {
        manager code pos name
      }
    }
    currentTeams {
      gameWeek
      start
      end
      players {
        manager code pos name
      }
    }
 }
} 
`, division ? { division } : undefined),
  };
}
