import * as fetchSpreadsheet from '@kammy-ui/fetch-kammy-sheets';
import { connect } from '@kammy-ui/database';

import getDivision from '../division/getDivision.query';
import Cup from './Cup';

const getCup = async () => {
  const { getPlayers } = await connect();
  const [leagueOne, premierLeague, championship, cup, players] = await Promise.all([
    getDivision({ division: 'LeagueOne' }),
    getDivision({ division: 'PremierLeague' }),
    getDivision({ division: 'Championship' }),
    (fetchSpreadsheet.default || fetchSpreadsheet).cup(),
    getPlayers(),
  ]);
  const divisions = {
    leagueOne: leagueOne.currentTeams.players,
    premierLeague: premierLeague.currentTeams.players,
    championship: championship.currentTeams.players,
  };
  return new Cup({
    cup, players, divisions,
  });
};

export default getCup;
