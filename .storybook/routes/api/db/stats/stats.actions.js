const mongoose = require('mongoose');
const debug = require('debug');

const { getPlayers } = require('../player/player.actions');
const config = require('../../../../server-config/config');
const { getJson } = require('../../../../../packages/helpers/fetchr/src/index');
const { mapSkyFormatToSchema, mapImportToSkyFormat } = require('../../utils/mapDataImportFormats');
const { calculatePoints } = require('../../utils/calculatePoints');

const Player = mongoose.model('Player');
const Team = mongoose.model('Team');
const { ObjectId } = mongoose.Types;
const log = debug('kammy:stats.action');

const getExternalStats = async ({ currentGW, source }) => {
  const dbPlayers = await getPlayers();
  const stats = {};
  const errors = [];
  const data = (source === 'internal')
    ? (await getJson(`${config.INTERNAL_STATS_URL}/stats-GW${currentGW}.json`))
    : (await getJson(config.EXTERNAL_STATS_URL)).players;
  const players = (Array.isArray(data))
    ? data
    : (Object.keys(data)).map((key) => mapImportToSkyFormat(data[key]));
  players.forEach((player) => {
    const dbPlayer = dbPlayers.find((dbPlyr) => dbPlyr.code === (player.id || player.code));
    if (!dbPlayer) {
      errors.push({ message: `not found ${player.id} ${player.sName}, ${player.fName}`, player });
    } else {
      const { pos } = dbPlayer;
      const formattedPlayer = mapSkyFormatToSchema({ ...player, pos });
      stats[dbPlayer.name] = calculatePoints(formattedPlayer, dbPlayer);
    }
  });
  return { stats, errors };
};

const saveGameWeekStats = ({ seasonId, update }) => {
  const allUpdates = [];
  (Object.keys(update)).forEach((key) => {
    const player = update[key];
    const pos = player.pos.toLowerCase();
    const findAndUpdate = (position) => (
      Team.update(
        { 'season._id': new ObjectId(seasonId), [`${position}.code`]: player.code },
        { $set: { [`gameWeek.${position}`]: player.gameWeek.points } },
        { multi: true }
      )
    );
    allUpdates.push(Player.findOneAndUpdate(
      { code: player.code },
      {
        $set: {
          gameWeek: player.gameWeek,
        }
      }
    ));
    allUpdates.push(findAndUpdate('sub'));
    if (pos === 'gk') {
      allUpdates.push(findAndUpdate(pos));
    } else {
      allUpdates.push(findAndUpdate(`${pos}left`));
      allUpdates.push(findAndUpdate(`${pos}right`));
    }
  });
  return Promise.all(allUpdates).then(() => update);
};

const saveSeasonStats = async ({ seasonId }) => {
  const allUpdates = [];
  const players = await Player.find().exec();
  players.forEach(async (player) => {
    const pos = player.pos.toLowerCase();
    const { season, gameWeek } = player;
    allUpdates.push(Player.findOneAndUpdate(
      { code: player.code },
      {
        $set: {
          'season.points': season.points + gameWeek.points,
          'season.pensv': season.pensv + gameWeek.pensv,
          'season.apps': season.apps + gameWeek.apps,
          'season.subs': season.subs + gameWeek.subs,
          'season.gls': season.gls + gameWeek.gls,
          'season.asts': season.asts + gameWeek.asts,
          'season.con': season.con + gameWeek.con,
          'season.cs': season.cs + gameWeek.cs,
          'season.rcard': season.rcard + gameWeek.rcard,
          'season.ycard': season.ycard + gameWeek.ycard,
          'season.tb': season.tb + gameWeek.tb,
          'season.sb': season.sb + gameWeek.sb,
          'gameWeek.points': 0,
          'gameWeek.pensv': 0,
          'gameWeek.apps': 0,
          'gameWeek.subs': 0,
          'gameWeek.gls': 0,
          'gameWeek.asts': 0,
          'gameWeek.con': 0,
          'gameWeek.cs': 0,
          'gameWeek.rcard': 0,
          'gameWeek.ycard': 0,
          'gameWeek.tb': 0,
          'gameWeek.sb': 0,
        }
      }
    ));
    const findAndUpdate = (position) => (
      Team.find({
        'season._id': new ObjectId(seasonId),
        [`${position}.code`]: player.code
      }).exec().then((teams) => (
        teams.map((team) => (
          Team.update({
            _id: new ObjectId(team._id),
            'season._id': new ObjectId(seasonId),
            [`${position}.code`]: player.code
          }, {
            $set: {
              [`season.${position}`]: team.season[position] + player.gameWeek.points,
              [`gameWeek.${position}`]: 0,
            }
          }, { multi: true }).exec()
        ))
      ))
    );
    allUpdates.push(findAndUpdate('sub'));
    if (pos === 'gk') {
      allUpdates.push(findAndUpdate(pos));
    } else {
      allUpdates.push(findAndUpdate(`${pos}left`));
      allUpdates.push(findAndUpdate(`${pos}right`));
    }
  });
  return Promise.all(allUpdates);
};

module.exports = {
  getExternalStats,
  saveGameWeekStats,
  saveSeasonStats,
};
