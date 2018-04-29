/* eslint-disable no-confusing-arrow */
const debug = require('debug');
const mongoose = require('mongoose');

const { mapImportToSchema, mapSkyFormatToSchema, zeros, mapStats } = require('../../utils/mapDataImportFormats');
const getJson = require('../../../../../packages/helpers/fetchr/src/index');
const config = require('../../../../server-config/config');

const playersJson = require('../../../../fixtures/ff-1718.json');

const log = debug('kammy:db/player.actions');
const Player = mongoose.model('Player');

const aggFields = {
  'season.points': { $add: ['$season.points', '$gameWeek.points'] },
  'season.apps': { $add: ['$season.apps', '$gameWeek.apps'] },
  'season.mom': { $add: ['$season.mom', '$gameWeek.mom'] },
  'season.subs': { $add: ['$season.subs', '$gameWeek.subs'] },
  'season.gls': { $add: ['$season.gls', '$gameWeek.gls'] },
  'season.asts': { $add: ['$season.asts', '$gameWeek.asts'] },
  'season.ycard': { $add: ['$season.ycard', '$gameWeek.ycard'] },
  'season.rcard': { $add: ['$season.rcard', '$gameWeek.rcard'] },
  'season.tb': { $add: ['$season.tb', '$gameWeek.tb'] },
  'season.sb': { $add: ['$season.sb', '$gameWeek.sb'] },
  'season.cs': { $add: ['$season.cs', '$gameWeek.cs'] },
  'season.con': { $add: ['$season.con', '$gameWeek.con'] },
  'season.pensv': { $add: ['$season.pensv', '$gameWeek.pensv'] },
  gameWeek: 1,
  name: 1,
  code: 1,
  club: 1,
  pos: 1,
  value: 1,
  new: 1,
  isHidden: 1
};

const getPlayers = (playerDetails = {}) =>
  Player.aggregate({ $match: playerDetails }, { $project: aggFields }).exec();

const getPlayerFixtures = ({ code }) => {
  const url = config.getFixtures(code);
  return getJson(url)
    .then((player) => ({
      name: `${player.sName}, ${player.fName}`,
      code,
      club: player.tName,
      fixtures: player.fixtures && player.fixtures.map((fixture) => ({
        stats: fixture.stats ? mapStats(fixture.stats) : zeros,
        event: fixture.event,
        date: fixture.date,
        homeTeam: fixture.hTname,
        awayTeam: fixture.aTname,
        status: fixture.status,
        awayScore: fixture.aScore,
        homeScore: fixture.hScore
      }))
    }));
};

const updatePlayers = ({ playerUpdates }) => {
  const bulkUpdate = playerUpdates.map((player) => {
    const update = { ...player, new: false };
    const filter = { _id: player._id };
    return {
      updateOne: { filter, update },
    };
  });
  return Player.bulkWrite(bulkUpdate).then(() => (playerUpdates));
};

const importPlayers = async () => {
  const stats = {};
  const updatePromises = [];
  const skyPlayers = (await getJson(config.EXTERNAL_STATS_URL)).players;
  const dbPlayers = (await getPlayers());
  const players = dbPlayers.reduce((prev, player) => ({ ...prev, [player.code]: player }), {});
  skyPlayers.forEach((skyPlayer) => {
    const player = mapSkyFormatToSchema(skyPlayer);
    const jsonPlayer = playersJson[player.name];
    const dbPlayer = players[player.code];
    const formattedJsonPlayer = jsonPlayer ? mapImportToSchema(jsonPlayer) : {};
    player.pos = dbPlayer ? dbPlayer.pos : formattedJsonPlayer.pos || 'unknown';
    if (player.pos === 'park') player.pos = 'unknown';
    if (!dbPlayer) {
      const maybeGK = String(player.code).startsWith('1');
      if (player.pos === 'unknown' && maybeGK) player.pos = 'GK';
      player.new = true;
      player.season = zeros;
      updatePromises.push((new Player(player)).save());
    } else {
      delete player.season;
      delete player.gameWeek;
      player.new = false;
      updatePromises.push((Player.findByIdAndUpdate(dbPlayer._id, player)).exec());
    }
    stats[player.name] = player;
  });
  return Promise.all(updatePromises).catch(log);
};

module.exports = {
  getPlayers,
  getPlayerFixtures,
  updatePlayers,
  importPlayers,
};
