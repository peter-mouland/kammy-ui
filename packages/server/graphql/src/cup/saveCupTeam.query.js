import { connect } from '@kammy-ui/database';

export default async (cupTeam) => {
  const { saveCupTeam } = await connect();
  return saveCupTeam(cupTeam);
};
