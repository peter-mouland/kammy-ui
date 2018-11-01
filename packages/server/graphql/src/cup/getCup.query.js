import fetchSpreadsheet from '@kammy-ui/fetch-google-sheets';
import { connect } from '@kammy-ui/database';

import getDivision from '../division/getDivision.query';
import Cup from './Cup';

const spreadsheetId = '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI';

const getCup = async () => {
  const { getPlayers } = await connect();
  const [leagueOne, premierLeague, championship, cup, players] = await Promise.all([
    getDivision({ division: 'LeagueOne' }),
    getDivision({ division: 'PremierLeague' }),
    getDivision({ division: 'Championship' }),
    fetchSpreadsheet({ spreadsheetId, worksheetName: 'Cup' }),
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
