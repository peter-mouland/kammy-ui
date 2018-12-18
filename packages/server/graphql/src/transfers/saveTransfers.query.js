import { saveGsheet } from '@kammy-ui/fetch-google-sheets';

import formatDivision from '../division/format-division';

const spreadsheetId = '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI';

export default async ({
  transferIn, transferOut, manager, comment, type, division,
}) => saveGsheet({
  spreadsheetId,
  worksheetName: `${formatDivision(division)}Transfers`,
  transfer: {
    transferIn, transferOut, manager, comment, type, division,
  },
});
