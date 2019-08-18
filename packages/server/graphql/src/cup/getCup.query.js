import * as fetchSpreadsheet from '@kammy-ui/fetch-kammy-sheets';
import { connect } from '@kammy-ui/database';

import Cup from './Cup';

const getCup = async () => {
  const { getPlayers } = await connect();
  const [cup, players] = await Promise.all([
    (fetchSpreadsheet.default || fetchSpreadsheet).cup(),
    getPlayers(),
  ]);
  const result = new Cup({ cup, players });
  return result;
};

export default getCup;
