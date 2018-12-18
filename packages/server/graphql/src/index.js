import { graphql } from 'graphql';
import { connect } from '@kammy-ui/database';

import schema from './graphql.schema';
import mergePlayers from './players/mergePlayers.query';
import getCup from './cup/getCup.query';
import getDraftCup from './cup/getDraftCup.query';
import saveCupTeam from './cup/saveCupTeam.query';
import getDivision from './division/getDivision.query';
import getGameWeeks from './game-weeks/getGameWeeks.query';
import getTransfers from './transfers/getTransfers.query';

export default async ({ query, variables }) => {
  const { getPlayers, upsertPlayers } = await connect();
  const root = {
    mergePlayers,
    getPlayers,
    upsertPlayers,
    getDivision,
    getCup,
    getDraftCup,
    saveCupTeam,
    getGameWeeks,
    getTransfers,
  };

  return graphql(schema, query, root, {}, variables);
};
