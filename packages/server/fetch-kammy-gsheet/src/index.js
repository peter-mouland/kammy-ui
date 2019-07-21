import toDate from '@kammy-ui/helpers-to-date';
import { getJSON } from '@kammy-ui/fetchr';

const ACCESS_KEY = 'AIzaSyDA7UXEi96G7qFNIdgMg6nVJW9OajORO-I';
const spreadsheets = {
  DRAFTFF_TRANSFERS_ID: '10xathUydH-GDTLjngRXioaUVqBZoiZqfjfM6fhgUcYk',
  DRAFTFF_DRAFT_ID: '1gVEHnzHPfSR7isLNfxJxq8DKKLY4mKeiffwUb7YfFlc', // teams + draft picks
  DRAFTFF_SETUP_ID: '1HoInFwqCFLSl0yh8JBvQEFFjOg5ImiiT-BY_aDCy0AU', // game-weeks + players
  KAMMY_ID: '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI',
};
const DRAFT = 'DRAFTFF_DRAFT_ID';
const TRANSFERS = 'DRAFTFF_TRANSFERS_ID';
const SETUP = 'DRAFTFF_SETUP_ID';
const GS_API = (spreadsheet, endpoint) => (
  `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheets[spreadsheet]}${endpoint}?key=${ACCESS_KEY}`
);
const rowToObj = ({ values }) => {
  const headers = values.splice(0, 1)[0]; // remove and extract headers row
  const data = values.map((row) => row.reduce((prev, col, i) => ({
    ...prev,
    [headers[i]]: col,
  }), {}));
  return data;
};

/* PLAYERS */
const formatPlayer = ({
  Player = '', isHidden = '', Code, Pos = '', ...item
}) => ({
  [(Player || '').trim()]: {
    isHidden: ['hidden', 'y', 'Y'].includes(isHidden),
    new: ['new', 'y', 'Y'].includes(item.new),
    code: parseInt(Code, 10),
    pos: Pos.toUpperCase(),
    name: Player.trim(),
  },
});

const formatPlayers = (data) => data.map(formatPlayer);

/* TEAMS */
const formatTeam = ({
  manager = '', code, position, player = '',
}) => ({
  manager: manager.trim(),
  code,
  pos: position,
  name: player.trim(),
});
const formatDivision = (data) => {
  const jsonData = {};
  data.forEach((player) => {
    const manager = player.manager || '';
    if (!jsonData[manager.trim()]) {
      jsonData[manager.trim()] = [];
    }
    jsonData[manager.trim()].push(formatTeam(player));
  });
  return jsonData;
};

/* CUP */
const formatCupPlayer = ({
  group = '', gameweek, round = '', manager = '', player1 = '', player2 = '', player3 = '', player4 = '',
}) => ({
  group: group.trim(),
  gameWeek: gameweek,
  round: round.trim(),
  manager: manager.trim(),
  player1: player1.trim(),
  player2: player2.trim(),
  player3: player3.trim(),
  player4: player4.trim(),
});
const formatCup = (data = []) => data.map(formatCupPlayer);

/* TRANSFERS */
const formatTimeStamp = (timestamp = '') => {
  const dateTimeArray = timestamp.split(' ');
  const dateArray = dateTimeArray[0].split('/');
  const year = dateArray[2];
  const month = dateArray[1];
  const day = dateArray[0];
  const time = dateTimeArray[1];
  return toDate(`${year}/${month}/${day} ${time}`);
};

const formatTransfer = ({
  Comment = '', Status, Timestamp, Manager, ...item
}) => ({
  comment: Comment.trim(),
  status: Status.trim(),
  timestamp: formatTimeStamp(Timestamp),
  manager: Manager.trim(),
  transferIn: item['Transfer In'],
  codeIn: item['Code In'],
  transferOut: item['Transfer Out'],
  codeOut: item['Code Out'],
  type: item['Transfer Type'],
});

const formatTransfers = (data = []) => {
  try {
    return data.map(formatTransfer);
  } catch (e) {
    console.error('formatTransfers error');
    console.error(e);
    return [];
  }
};

/* GAMEWEEKS */
const formatGameWeek = (item) => ({
  notes: item.notes,
  cup: ['cup', 'y', 'yes', 'Y'].includes(item.cup),
  gameWeek: item.gameweek,
  start: toDate(item.start),
  end: toDate(item.end),
});

const formatGameWeeks = (data) => data.map(formatGameWeek);

const fetch = {
  gameWeeks: () => getJSON(GS_API(SETUP, '/values/GameWeeks')).then(rowToObj).then(formatGameWeeks),
  divisionList: () => getJSON(GS_API(DRAFT, '/values/Divisions')).then(rowToObj),
  cup: () => getJSON(GS_API(DRAFT, '/values/cup')).then(rowToObj).then(formatCup),
  players: () => getJSON(GS_API(SETUP, '/values/Players')).then(rowToObj).then(formatPlayers),
  draft: (division) => getJSON(GS_API(DRAFT, `/values/${division}`)).then(rowToObj).then(formatDivision),
  transfers: (division) => getJSON(GS_API(TRANSFERS, `/values/${division}`)).then(rowToObj).then(formatTransfers),
};

export default fetch;
