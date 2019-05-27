import * as fetchSpreadsheet from '@kammy-ui/fetch-kammy-sheets';
import { connect } from '@kammy-ui/database';

import Division from './Division';
import getGameWeeks from '../game-weeks/getGameWeeks.query';
import formatDivision from './format-division';
import getTransfers from '../transfers/getTransfers.query';

// division = 'LeagueOne', 'PremierLeague', 'Championship'
const getDivision = async ({ division }) => {
  const formattedDivision = formatDivision(division);
  if (!['LeagueOne', 'PremierLeague', 'Championship'].includes(formattedDivision)) {
    throw Error(`Division not found: ${formattedDivision}`);
  }
  const { getPlayers } = await connect();
  return (
    Promise.all([
      (fetchSpreadsheet.default || fetchSpreadsheet).draft(formattedDivision),
      getTransfers({ division: formattedDivision }),
      getGameWeeks(),
      getPlayers(), // needed for position of transfers checking
    ]).then(([draft, transfers, gameWeeks, players]) => (
      new Division({
        division: formattedDivision, draft, transfers, gameWeeks, players,
      })
    ))
  );
};

export default getDivision;
