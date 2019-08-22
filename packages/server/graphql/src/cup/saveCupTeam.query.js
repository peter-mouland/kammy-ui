// import * as fetchSpreadsheet from '@kammy-ui/fetch-kammy-sheets';
// import { updateRow, spreadsheets } from '@kammy-ui/save-kammy-sheets';
import { connect } from '@kammy-ui/database';
// import format from 'date-fns/format';

// const save = async (cupTeam) => {
//   const currentCup = await (fetchSpreadsheet.default || fetchSpreadsheet).cup();
//
//   return updateRow({
//     row: cupTeam.row,
//     spreadsheetId: spreadsheets.DRAFTFF_TRANSFERS_ID,
//     worksheetName: 'cup',
//     data: { ...cupTeam, timestamp: format(new Date(), 'DD/MM/YYYY HH:mm:ss') },
//   });
// };


export default async (cupTeam) => {
  const { saveCupTeam } = await connect();
  return saveCupTeam(cupTeam);
};
