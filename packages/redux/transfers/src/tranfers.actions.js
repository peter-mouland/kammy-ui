import { fetchGraphQL } from '@kammy-ui/fetchr';

export const FETCH_TRANSFERS = 'FETCH_TRANSFERS';
export const SAVE_TRANSFERS = 'SAVE_TRANSFERS';

export function fetchTransfers(division) {
  const variables = division ? { division } : undefined;
  return {
    type: FETCH_TRANSFERS,
    payload: {
      data: { variables },
      promise: fetchGraphQL(`
query GetTransfers($division: String) { 
  getTransfers(division: $division) {
    division status timestamp manager transferOut transferIn type comment
 }
} 
`, variables),
    },
  };
}

export function saveTransfers(division) {
  const variables = division ? { division } : undefined;
  return {
    type: SAVE_TRANSFERS,
    payload: {
      data: { variables },
      promise: fetchGraphQL(`
query SaveTransfers($division: String, $transferIn: String, $transferOut: String, $type: String, $manager: String) { 
getTransfers (division: $division, transferIn: $transferIn, transferOut: $transferOut, type: $type, manager: $manager) {
  division status manager transferOut transferIn type comment
}
} 
`, variables),
    },
  };
}
