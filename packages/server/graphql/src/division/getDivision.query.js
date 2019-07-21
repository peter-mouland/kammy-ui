import { selectors as draftSetupSelectors } from '@kammy-ui/redux.draft-setup';
import { connect } from '@kammy-ui/database';

import Division from './Division';
import getGameWeeks from '../game-weeks/getGameWeeks.query';
import formatDivision from './format-division';
import getTransfers from '../transfers/getTransfers.query';
import getDraft from '../draft-setup/getDraft.query';

const getDivision = async ({ division }) => {
  const formattedDivision = formatDivision(division);
  if (!['leagueOne', 'premierLeague', 'championship'].includes(formattedDivision)) {
    throw Error(`Division not found: ${division} => ${formattedDivision}`);
  }
  const { getPlayers } = await connect();
  return (
    Promise.all([
      getDraft(),
      getTransfers({ division: formattedDivision }),
      getGameWeeks(),
      getPlayers(), // needed for position of transfers checking
    ]).then(([draftSetup, transfers, gameWeeks, players]) => {
      const draft = draftSetupSelectors.getDraftSetup({ draftSetup: { data: draftSetup } });
      return (
        new Division({
          division: formattedDivision, draft, transfers, gameWeeks, players,
        })
      );
    })
  );
};

export default getDivision;
