import fetchSpreadsheet from '@kammy-ui/fetch-google-sheets';
import { rootActions } from '@kammy-ui/database';

import DivisionByGameWeek from '../lib/DivisionByGameWeek';

const spreadsheetId = '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI';

// division = 'LeagueOne', 'PremierLeague', 'Championship'
const getDivision = ({ division }) => {
  if (!['LeagueOne', 'PremierLeague', 'Championship'].includes(division)) {
    throw Error(`Division not found: ${division}`);
  }
  const { getPlayers } = rootActions();
  return (
    Promise.all([
      fetchSpreadsheet({ spreadsheetId, worksheetName: division }),
      fetchSpreadsheet({ spreadsheetId, worksheetName: `${division}Transfers` }),
      fetchSpreadsheet({ spreadsheetId, worksheetName: 'GameWeeks' }),
      getPlayers(), // needed for position of transfers checking
    ]).then(([draft, transfers, gameWeeks, players]) => (
      new DivisionByGameWeek({
        division, draft, transfers, gameWeeks, players,
      })
    ))
  );
};

export default getDivision;
