import fetchSpreadsheet from '@kammy-ui/fetch-google-sheets';

import formatDivision from '../division/format-division';

const spreadsheetId = '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI';

export default async ({ division }) => {
  const worksheetName = `${formatDivision(division)}Transfers`;
  try {
    const transfers = await fetchSpreadsheet({ spreadsheetId, worksheetName });
    return transfers.map((transfer) => ({ ...transfer, division }));
  } catch (e) {
    console.error('ERROR: getTransfers.query.js');
    console.log({ division, worksheetName });
    console.error(e);
    return [];
  }
};
