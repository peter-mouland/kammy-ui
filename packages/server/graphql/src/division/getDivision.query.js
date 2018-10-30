import fetchSpreadsheet from '@kammy-ui/fetch-google-sheets';
import { connect } from '@kammy-ui/database';

import Division from './Division';

const spreadsheetId = '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI';

// division = 'LeagueOne', 'PremierLeague', 'Championship'
const getDivision = async ({ division }) => {
  if (!['LeagueOne', 'PremierLeague', 'Championship'].includes(division)) {
    throw Error(`Division not found: ${division}`);
  }
  const { getPlayers } = await connect();
  return (
    Promise.all([
      fetchSpreadsheet({ spreadsheetId, worksheetName: division }),
      fetchSpreadsheet({ spreadsheetId, worksheetName: `${division}Transfers` }),
      fetchSpreadsheet({ spreadsheetId, worksheetName: 'GameWeeks' }),
      getPlayers(), // needed for position of transfers checking
    ]).then(([draft, transfers, gameWeeks, players]) => {
      const currentGameWeekIndex = (gameWeeks.findIndex((gw) => (
        new Date() < new Date(gw.end) && new Date() > new Date(gw.start)
      )));
      const currentGameWeek = currentGameWeekIndex < 1 ? 1 : currentGameWeekIndex + 1;
      return (
        new Division({
          division, draft, transfers, gameWeeks, players, currentGameWeek,
        })
      );
    })
  );
};

export default getDivision;
