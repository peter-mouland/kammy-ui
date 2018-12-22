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

export function saveTransfers(transfers) {
  const variables = { transfers };
  return {
    type: SAVE_TRANSFERS,
    payload: {
      data: { variables },
      promise: fetchGraphQL(`
mutation SaveTransfers($transfers: [TransferInput]) { 
  saveTransfers (transfers: $transfers) {
    success message
  }
} 
`, variables),
    },
  };
}
