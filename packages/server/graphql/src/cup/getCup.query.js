import fetchSpreadsheet from '@kammy-ui/fetch-google-sheets';
import { connect } from '@kammy-ui/database';

import Cup from './Cup';

const spreadsheetId = '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI';

const getCup = async () => {
  const { getPlayers } = await connect();
  const cup = await fetchSpreadsheet({ spreadsheetId, worksheetName: 'Cup' });
  const players = await getPlayers();
  return new Cup({ cup, players });
};

export default getCup;
