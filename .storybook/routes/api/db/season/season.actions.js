const mongoose = require('mongoose');

const rankAllPositionInTeams = require('./calculateRank');
const aggFields = require('./buildAggregates');

const Seasons = mongoose.model('Season');
const Teams = mongoose.model('Team');
const { ObjectId } = mongoose.Types;

const findSeasonById = (_id) => Seasons.findById(_id).exec();

const getSeasons = (search = {}) => {
  const query = Object.keys(search).length > 0
    ? Seasons.findOne(search)
    : Seasons.find(search);
  return query.sort({ dateCreated: -1 }).exec();
};

const getDivisions = async () => {
  const season = await Seasons.findOne({ isLive: true }).sort({ dateCreated: -1 }).exec();
  const { divisions } = season;
  const $in = divisions.map((division) => new ObjectId(division._id));
  aggFields.user = 1;
  aggFields.division = 1;

  const teams = await Teams.aggregate({ $match: { 'division._id': { $in } } }, { $project: aggFields }).exec();

  return divisions.map((division) => ({
    tier: division.tier,
    _id: division._id,
    name: division.name,
    teams: rankAllPositionInTeams(teams.filter((team) => (
      team.division._id.toHexString() === division._id.toHexString()
    )))
  }));
};

const getLatestSeason = () => Seasons.findOne({}).sort({ dateCreated: -1 }).exec();

const addSeason = ({ name }) => {
  const newSeason = new Seasons({ name });
  return newSeason.save();
};

const updateSeasonById = (_id, seasonUpdate) =>
  Seasons.findByIdAndUpdate(_id, seasonUpdate, { new: true }).exec();

const addDivision = ({ seasonId, name }) => (
  updateSeasonById(seasonId, { $push: { divisions: { name } } })
    .then((season) => season.divisions.find((division) => division.name === name))
);

const updateSeason = ({ seasonId, isLive, currentGW }) => {
  const update = { };
  if (typeof isLive === 'boolean') update.isLive = isLive;
  if (currentGW) update.currentGW = currentGW;
  return (
    updateSeasonById(seasonId, { $set: update })
  );
};

module.exports = {
  findSeasonById,
  getSeasons,
  getDivisions,
  getLatestSeason,
  addSeason,
  updateSeasonById,
  addDivision,
  updateSeason,
};
