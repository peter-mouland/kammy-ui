import toDate from '@kammy-ui/helpers-to-date';

import GoogleSpreadsheet from './GoogleSpreadsheet';
import GoogleSpreadsheetCred from './google-generated-creds.json';

/* PLAYERS */
const formatPlayer = ({
  player = '', ishidden = '', code, pos = '', ...item
}) => ({
  [player.trim()]: {
    isHidden: ['hidden', 'y', 'Y'].includes(ishidden),
    new: ['new', 'y', 'Y'].includes(item.new),
    code: parseInt(code, 10),
    pos: pos.toUpperCase(),
    name: player.trim(),
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
});
const formatDivision = (data) => {
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

/* CUP */
const formatCupPlayer = (item) => ({
  group: item.group.trim(),
  gameWeek: item.gameweek,
  round: item.round.trim(),
  manager: item.manager.trim(),
  player1: item.player1.trim(),
  player2: item.player2.trim(),
  player3: item.player3.trim(),
  player4: item.player4.trim(),
});
const formatCup = (data) => Object.keys(data).map((key) => formatCupPlayer(data[key]));

/* TRANSFERS */
const formatTimeStamp = (timestamp) => {
  const dateTimeArray = timestamp.split(' ');
  const dateArray = dateTimeArray[0].split('/');
  const year = dateArray[2];
  const month = dateArray[1];
  const day = dateArray[0];
  const time = dateTimeArray[1];
  return toDate(`${year}/${month}/${day} ${time}`);
};

const formatTransfer = (item) => ({
  status: item.status.trim(),
  timestamp: formatTimeStamp(item.timestamp),
  manager: item.manager.trim(),
  transferIn: item.transferin,
  codeIn: item.codein,
  transferOut: item.transferout,
  codeOut: item.codeout,
  type: item.transfertype,
});

const formatDivisionTransfers = (data) => {
  try {
    return Object.keys(data).map((key) => formatTransfer(data[key]));
  } catch (e) {
    console.error('formatDivisionTransfers error');
    console.error(e);
    return [];
  }
};

/* GAMEWEEKS */
const formatGameWeek = (item) => ({
  gameWeek: item.gameweek,
  start: toDate(item.start),
  end: toDate(item.end),
});

const formatGameWeeks = (data) => Object.keys(data).map((key) => formatGameWeek(data[key]));

const fetchGsheet = ({ spreadsheetId, worksheetName, formatter }) => (
  new GoogleSpreadsheet(spreadsheetId, GoogleSpreadsheetCred)
    .getWorksheet(worksheetName)
    .toJson((item) => ({ [item.id]: item }))
    .then((data) => {
      // note: headers from spreadsheets will be lowercase
      // i.e. column header isHidden will be data[0].ishidden
      switch (true) {
      case !!formatter:
        return formatter(data);
      case worksheetName === 'Players':
        return formatPlayers(data);
      case worksheetName === 'PremierLeague':
      case worksheetName === 'Championship':
      case worksheetName === 'LeagueOne':
        return formatDivision(data);
      case worksheetName === 'PremierLeagueTransfers':
      case worksheetName === 'ChampionshipTransfers':
      case worksheetName === 'LeagueOneTransfers':
        return formatDivisionTransfers(data);
      case worksheetName === 'GameWeeks':
        return formatGameWeeks(data);
      case worksheetName === 'Cup':
        return formatCup(data);
      default:
        return data;
      }
    })
);

export const saveRow = ({ spreadsheetId, worksheetName, data }) => (
  new GoogleSpreadsheet(spreadsheetId, GoogleSpreadsheetCred)
    .getWorksheet(worksheetName)
    .addRows([data])
);

export const saveRows = ({ spreadsheetId, worksheetName, data }) => (
  new GoogleSpreadsheet(spreadsheetId, GoogleSpreadsheetCred)
    .getWorksheet(worksheetName)
    .addRows(data)
);

export default fetchGsheet;
