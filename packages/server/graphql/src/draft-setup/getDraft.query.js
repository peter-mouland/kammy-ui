import * as fetchSpreadsheet from '@kammy-ui/fetch-kammy-sheets';

import DraftSetup from './draft';

const getDraft = () => (
  Promise.all([
    (fetchSpreadsheet.default || fetchSpreadsheet).draftSetup('Divisions'),
    (fetchSpreadsheet.default || fetchSpreadsheet).draftSetup('Managers'),
    (fetchSpreadsheet.default || fetchSpreadsheet).draftSetup('premierLeague'),
    (fetchSpreadsheet.default || fetchSpreadsheet).draftSetup('championship'),
    (fetchSpreadsheet.default || fetchSpreadsheet).draftSetup('leagueOne'),
  ]).then(([divisions, managers, premierLeague, championship, leagueOne]) => (
    new DraftSetup({
      divisions, managers, premierLeague, championship, leagueOne,
    })
  ))
);

export default getDraft;
