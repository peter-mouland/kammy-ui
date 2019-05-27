import * as fetchSpreadsheet from '@kammy-ui/fetch-kammy-sheets';

import GameWeeks from './GameWeeks';

const getGameWeeks = () => (
  Promise.all([
    (fetchSpreadsheet.default || fetchSpreadsheet).gameWeeks(),
  ]).then(([gameWeeks]) => (
    new GameWeeks({ gameWeeks })
  ))
);

export default getGameWeeks;
