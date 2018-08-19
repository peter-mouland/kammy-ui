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
  status: item.status.trim(),
  timestamp: formatTimeStamp(item.timestamp),
  manager: item.manager.trim(),
  transferIn: item.transferin,
  codeIn: item.codein,
  transferOut: item.transferout,
  codeOut: item.codeout,
  type: item.transfertype,
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

const fetchGsheet = ({ spreadsheetId, worksheetName, formatter }) => (
  new GoogleSpreadsheet(spreadsheetId, GoogleSpreadsheetCred)
    .getWorksheet(worksheetName)
    .toJson((item) => ({ [item.id]: item }))
    .then((data) => {
      // note: headers from spreadsheets will be lowercase
      // i.e. column header isHidden will be data[0].ishidden
      if (formatter) {
        return formatter(data);
      } if (worksheetName === 'Players') {
        return formatPlayers(data);
      } if (worksheetName === 'PremierLeague') {
        return formatTeams(data);
      } if (worksheetName === 'Championship') {
        return formatTeams(data);
      } if (worksheetName === 'LeagueOne') {
        return formatTeams(data);
      } if (worksheetName === 'Transfers') {
        return formatTransfers(data);
      } if (worksheetName === 'GameWeeks') {
        return formatGameWeeks(data);
      }
      return data;
    })
);

export default fetchGsheet;
