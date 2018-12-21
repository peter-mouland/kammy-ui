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

export function saveTransfers({
  division, transferIn, transferOut, type, manager, status = 'TBC',
}) {
  // 2018-12-21T01:33:49.525Z to 06/08/2018 09:24:07
  const [date, time] = new Date().toISOString().split('T');
  const [year, month, day] = date.split('-');
  const [hour, min, split] = time.split(':');
  const [second] = split.split('.');
  const timestamp = `${day}/${month}/${year} ${hour}:${min}:${second}`;
  const variables = {
    division, transferIn, transferOut, transferType: type, manager, status, timestamp,
  };
  return {
    type: SAVE_TRANSFERS,
    payload: {
      data: { variables },
      promise: fetchGraphQL(`
mutation SaveTransfers($transfer: TransferInput) { 
  saveTransfers (transfer: $transfer) {
    success message
  }
} 
`, { transfer: variables }),
    },
  };
}
