const bodyParser = require('body-parser');

const GoogleSpreadsheet = require("../../packages/data-sources/google-sheets/src/index");
const GoogleSpreadsheetCred = require("../../packages/data-sources/google-sheets/src/google-generated-creds.json");
const jsonParser = bodyParser.json();

/* PLAYERS */
const formatPlayer = (item) => ({
  [item.player.trim()]: {
    new: item.new,
    code: item.code,
    pos: item.position,
    name: item.player.trim(),
    club: item.club,
    isHidden: false,
  },
});

const formatPlayers = (data) => {
  const jsonData = Object.keys(data).reduce((prev, key) => ({
    ...prev,
    ...formatPlayer(data[key]),
  }), {});
  return jsonData;
};

/* TEAMS */
const formatTeam = (item) => ({
  manager: item.manager.trim(),
  code: item.code,
  pos: item.position,
  player: item.player.trim(),
  club: item.club.trim(),
});
const formatTeams = (data) => {
  const jsonData = {};
  Object.keys(data).forEach((key) => {
    const player = data[key];
    if (!jsonData[player.manager.trim()]) {
      jsonData[player.manager.trim()] = [];
    }
    jsonData[player.manager.trim()].push(formatTeam(player));
  });
  return jsonData;
};

/* TRANSFERS */
const formatTransfer = (item) => ({
  manager: item.manager.trim(),
  transferIn: item.transferin,
  transferOut: item.transferout,
  codeIn: item.codein,
  codeOut: item.codeout,
  timestamp: item.timestamp,
  status: item.status.trim(),
});
const formatTransfers = (data) => {
  const jsonData = {};
  Object.keys(data).forEach((key) => {
    const player = data[key];
    if (!jsonData[player.manager.trim()]) {
      jsonData[player.manager.trim()] = [];
    }
    const transfer = formatTransfer(player);
    if (transfer.status === 'Y'){
      jsonData[player.manager.trim()].push(formatTransfer(player));
    }
  });
  return jsonData;
};

/* GAMEWEEKS */
const formatGameWeek = (item) => ({
  gameWeek: item.gameweek,
  start: item.start,
  end: item.end,
});
const formatGameWeeks = (data) => {
  const gameWeeks = [];
  Object.keys(data).forEach((key) => {
    const gameWeek = data[key];
    gameWeeks.push(formatGameWeek(gameWeek));
  });
  return gameWeeks;
};

module.exports = (router) => {
  router.get('/google-spreadsheet/:spreadsheetId/:worksheetName', jsonParser, (req, res) => {
    const { spreadsheetId, worksheetName } = req.params;
    // for authorising a new sheet look: https://www.npmjs.com/package/google-spreadsheet
    // probably easiest to make the sheet public
    new GoogleSpreadsheet(spreadsheetId, GoogleSpreadsheetCred)
      .getWorksheet(worksheetName)
      .toJson((item) => {
        delete item._links;
        delete item._xml;
        return ({ [item.id]: item });
      })
      .then((data) => {
        if (worksheetName === 'Players') {
          return formatPlayers(data);
        } else if (worksheetName === 'Teams') {
          return formatTeams(data);
        } else if (worksheetName === 'Transfers') {
          return formatTransfers(data);
        } else if (worksheetName === 'GameWeeks') {
          return formatGameWeeks(data);
        }
        return data;
      })
      .then((data) => res.json({ data }));
  });
};
