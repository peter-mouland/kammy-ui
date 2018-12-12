import { fetchGraphQL } from '@kammy-ui/fetchr';

import formatDivision from './format-division';

export const FETCH_DIVISION = 'FETCH_DIVISION';
export const FETCH_DIVISION_CURRENT_TEAMS = 'FETCH_DIVISION_CURRENT_TEAMS';

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

export function fetchCurrentTeams(division) {
  const formattedDivision = formatDivision(division);
  return {
    type: FETCH_DIVISION_CURRENT_TEAMS,
    payload: {
      promise: fetchGraphQL(`
query ($division: String) { 
  getDivision(division: $division) {
    division
    currentTeams {
      gameWeek
      players {
        manager pos name
      }
    }
 }
} 
`, formattedDivision ? { division: formattedDivision } : undefined),
      data: { data: { division: formattedDivision } },
    },
  };
}
