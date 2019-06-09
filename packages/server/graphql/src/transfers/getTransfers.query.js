import * as fetchSpreadsheet from '@kammy-ui/fetch-kammy-sheets';

import formatDivision from '../division/format-division';

export default async ({ division }) => {
  try {
    const transferRequests = await (fetchSpreadsheet.default || fetchSpreadsheet).transfers(formatDivision(division));
    return transferRequests.map((transfer) => ({ ...transfer, division }));
  } catch (e) {
    console.error('ERROR: getTransfers.query.js');
    console.error({ division });
    console.error(e);
    return [];
  }
};
