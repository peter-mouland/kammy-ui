import { graphql } from 'graphql';
import { rootActions, connect } from '@kammy-ui/database';

import schema from './graphql.schema';
import mergePlayers from './players/mergePlayers.query';
import getCup from './cup/getCup.query';
import getDivision from './division/getDivision.query';
import getGameWeeks from './game-weeks/getGameWeeks.query';

connect(process.env.MONGODB_URI || 'mongodb://localhost/kammy-ui');

const { getPlayers, upsertPlayers } = rootActions();

const root = {
  mergePlayers,
  getPlayers,
  upsertPlayers,
  getDivision,
  getCup,
  getGameWeeks,
};

export default ({ query, variables }) => graphql(schema, query, root, {}, variables);
