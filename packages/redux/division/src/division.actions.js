import { fetchGraphQL } from '@kammy-ui/fetchr';

import formatDivision from './format-division';

export const FETCH_DIVISION = 'FETCH_DIVISION';
export const FETCH_DIVISION_CURRENT_TEAMS = 'FETCH_DIVISION_CURRENT_TEAMS';

export function fetchDivision(division) {
  return {
    type: FETCH_DIVISION,
    payload: {
      data: { data: { division } },
      promise: fetchGraphQL(`
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
        manager code pos name club teamPos
      }
    }
    currentTeams {
      gameWeek
      start
      end
      players {
        manager code pos name club teamPos
      }
    }
 }
} 
`, division ? { division } : undefined),
    },
  };
}

export function fetchCurrentTeams(division) {
  const formattedDivision = formatDivision(division);
  return {
    type: FETCH_DIVISION_CURRENT_TEAMS,
    payload: {
      data: { data: { division: formattedDivision } },
      promise: fetchGraphQL(`
query ($division: String) { 
  getDivision(division: $division) {
    pendingTransfers {
      status
      timestamp
      manager
      transferIn
      transferOut
      clubIn
      clubOut
      posIn
      posOut
      type
    }
    division
    currentTeams {
      gameWeek
      players {
        manager pos name club teamPos
      }
    }
 }
} 
`, formattedDivision ? { division: formattedDivision } : undefined),
    },
  };
}
