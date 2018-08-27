import fetchSpreadsheet from '@kammy-ui/fetch-google-sheets';

import DivisionByGameWeek from '../lib/DivisionByGameWeek';

const spreadsheetId = '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI';

// division = 'LeagueOne', 'PremierLeague', 'Championship'
const getDivision = ({ division }) => {
  if (!['LeagueOne', 'PremierLeague', 'Championship'].includes(division)) {
    throw Error(`Division not found: ${division}`);
  }
  return (
    Promise.all([
      fetchSpreadsheet({ spreadsheetId, worksheetName: division }),
      fetchSpreadsheet({ spreadsheetId, worksheetName: `${division}Transfers` }),
      fetchSpreadsheet({ spreadsheetId, worksheetName: 'GameWeeks' }),
    ]).then(([draft, transfers, gameWeeks]) => (
      new DivisionByGameWeek({
        division, draft, transfers, gameWeeks,
      })
    ))
  );
};

export default getDivision;
