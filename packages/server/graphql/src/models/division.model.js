import fetchSpreadsheet from '@kammy-ui/fetch-google-sheets';

import DivisionByGameWeek from '../lib/DivisionByGameWeek';

const spreadsheetId = '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI';

// division = 'LeagueOne', 'PremierLeague', 'Championship'
const getDivision = ({ division }) => (
  Promise.all([
    fetchSpreadsheet({ spreadsheetId, worksheetName: division }),
    fetchSpreadsheet({ spreadsheetId, worksheetName: `${division}Transfers` }),
    fetchSpreadsheet({ spreadsheetId, worksheetName: 'GameWeeks' }),
  ]).then(([draft, transfers, gameWeeks]) => (
    new DivisionByGameWeek({ draft, transfers, gameWeeks })
  ))
);

export default getDivision;
