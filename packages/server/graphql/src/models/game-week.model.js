import fetchSpreadsheet from '@kammy-ui/fetch-google-sheets';

import GameWeeks from '../lib/GameWeeks';

const spreadsheetId = '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI';

const getGameWeeks = () => (
  Promise.all([
    fetchSpreadsheet({ spreadsheetId, worksheetName: 'GameWeeks' }),
  ]).then(([gameWeeks]) => (
    new GameWeeks({ gameWeeks })
  ))
);

export default getGameWeeks;
