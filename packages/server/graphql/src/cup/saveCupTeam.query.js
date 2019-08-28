import { saveRows, spreadsheets } from '@kammy-ui/save-kammy-sheets';
import format from 'date-fns/format';
import { connect } from '@kammy-ui/database';

export default async (cupTeam) => {
  const { saveCupTeam } = await connect();
  saveCupTeam(cupTeam); // backup / confirm
  return saveRows({
    spreadsheetId: spreadsheets.DRAFTFF_TRANSFERS_ID,
    worksheetName: 'cup-submissions',
    data: [{ ...cupTeam.cupTeamInput, timestamp: format(new Date(), 'DD/MM/YYYY HH:mm:ss') }],
  });
};
