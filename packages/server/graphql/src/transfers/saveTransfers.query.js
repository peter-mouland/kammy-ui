import { saveRow } from '@kammy-ui/fetch-google-sheets';

import formatDivision from '../division/format-division';

const spreadsheetId = '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI';

export default async ({ transfer }) => saveRow({
  spreadsheetId,
  worksheetName: `${formatDivision(transfer.division)}Transfers`,
  data: transfer,
});
