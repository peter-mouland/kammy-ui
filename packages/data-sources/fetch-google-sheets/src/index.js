const GoogleSpreadsheet = require('./GoogleSpreadsheet');
const GoogleSpreadsheetCred = require('./google-generated-creds.json');

function toTitleCase(str = '') {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

/* PLAYERS */
const formatPlayer = (item) => ({
  [item.player.trim()]: {
    new: item.new,
    code: parseInt(item.code, 10),
    pos: item.position.toUpperCase(),
    name: item.player.trim(),
    club: toTitleCase(item.club),
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
  name: item.player.trim(),
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
const formatTimeStamp = (timestamp) => {
  const dateTimeArray = timestamp.split(' ');
  const dateArray = dateTimeArray[0].split('/');
  const year = dateArray[2];
  const month = dateArray[1];
  const day = dateArray[0];
  const time = dateTimeArray[1];
  return `${year}/${month}/${day} ${time}`;
};
const formatTransfer = (item) => ({
  manager: item.manager.trim(),
  transferIn: item.transferin,
  transferOut: item.transferout,
  codeIn: item.codein,
  codeOut: item.codeout,
  timestamp: formatTimeStamp(item.timestamp),
  type: item.transfertype,
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
    if (transfer.status === 'Y') {
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

const getSpreadsheetId = (worksheetName) => {
  switch (worksheetName) {
  case 'Players': return '1x2qD0aS6W-MeARu6QT0YthgLV91-Hmlip5_Gut2nEBI';
  case 'Teams': return '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI';
  case 'Transfers': return '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI';
  case 'GameWeeks': return '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI';
  default: return 'UNKNOWN';
  }
};


const fetchGsheet = ({ spreadsheetId, worksheetName, formatter }) =>
  // for authorising a new sheet look: https://www.npmjs.com/package/google-spreadsheet
  // probably easiest to make the sheet public
  new GoogleSpreadsheet(spreadsheetId || getSpreadsheetId(worksheetName), GoogleSpreadsheetCred)
    .getWorksheet(worksheetName)
    .toJson((item) => ({ [item.id]: item }))
    .then((data) => {
      if (formatter) {
        return formatter(data);
      } else if (worksheetName === 'Players') {
        return formatPlayers(data);
      } else if (worksheetName === 'Teams') {
        return formatTeams(data);
      } else if (worksheetName === 'Transfers') {
        return formatTransfers(data);
      } else if (worksheetName === 'GameWeeks') {
        return formatGameWeeks(data);
      }
      return data;
    });
module.exports = fetchGsheet;
