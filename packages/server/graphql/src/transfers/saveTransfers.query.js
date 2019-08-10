import { saveRows, spreadsheets } from '@kammy-ui/save-kammy-sheets';
import format from 'date-fns/format';

import formatDivision from '../division/format-division';

export default async ({ transfers }) => saveRows({
  spreadsheetId: spreadsheets.DRAFTFF_TRANSFERS_ID,
  worksheetName: formatDivision(transfers[0].division),
  data: transfers.map((transfer) => ({ ...transfer, timestamp: format(new Date(), 'DD/MM/YYYY HH:mm:ss') })),
});
