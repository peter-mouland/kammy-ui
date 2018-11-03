import mongoose from 'mongoose';

const Cup = mongoose.model('Cup');

const getCupTeam = (cupTeamDetails = {}) => Cup.aggregate([{ $match: cupTeamDetails }]).exec();

// todo: test merge!
// findOneAndUpdate
const saveCupTeam = async ({ cupTeamInput: team } = {}) => {
  try {
    const dbCupTeam = await getCupTeam({ manager: team.manager, group: team.group, round: team.round });
    return (!dbCupTeam.length)
      ? new Cup(team).save()
      : Cup.findOneAndUpdate(dbCupTeam._id, team).exec().catch(console.error);
  } catch (e) {
    console.error(e);
    return {};
  }
};

// eslint-disable-next-line import/prefer-default-export
export { saveCupTeam };
