import { saveRows } from '@kammy-ui/save-kammy-sheets';

import formatDivision from '../division/format-division';

const spreadsheetId = '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI';

export default async ({ transfers, ...others }) => console.log(others) || saveRows({
  spreadsheetId,
  worksheetName: `${formatDivision(transfers[0].division)}Transfers`,
  data: transfers,
});
