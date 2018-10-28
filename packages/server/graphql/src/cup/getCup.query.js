import fetchSpreadsheet from '@kammy-ui/fetch-google-sheets';
import { rootActions } from '@kammy-ui/database';

import Cup from './Cup';

const spreadsheetId = '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI';

const getCup = () => {
  const { getPlayers } = rootActions();
  return (
    Promise.all([
      fetchSpreadsheet({ spreadsheetId, worksheetName: 'Cup' }),
      getPlayers(),
    ]).then(([cup, players]) => (
      new Cup({ cup, players })
    ))
  );
};

export default getCup;
