const { fetchPlayersFull, fetchPlayersSummary } = require('@kammy-ui/fetch-sky-sports');
const fetchGsheet = require('@kammy-ui/fetch-google-sheets');
const { rootActions } = require('@kammy-ui/database');

const { upsertPlayers } = rootActions();

const mergePlayersData = ({ spreadsheetPlayers, skySportsPlayers, playersSummary }) => {
  const allPlayers = {
    ...spreadsheetPlayers,
    ...playersSummary,
    ...skySportsPlayers,
  };
  const mergedPlayers = Object.keys(allPlayers)
    .reduce((prev, key) => ({
      ...prev,
      [key.trim()]: {
        pos: '', // position is required but doesn't exist on skysports players
        ...playersSummary && playersSummary[key],
        ...skySportsPlayers && skySportsPlayers[key],
        ...spreadsheetPlayers && spreadsheetPlayers[key],
      },
    }), {});
  return mergedPlayers;
};

const mergePlayers = () => (
  Promise.all([
    fetchGsheet({ spreadsheetId: '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI', worksheetName: 'Players' }),
    fetchPlayersFull(),
    fetchPlayersSummary(),
  ])
    .then(([spreadsheetPlayers, skySportsPlayers, playersSummary]) => (
      mergePlayersData({
        spreadsheetPlayers,
        skySportsPlayers: skySportsPlayers.data,
        playersSummary,
      })
    ))
    .then((mergedPlayers) => (
      upsertPlayers(Object.values(mergedPlayers))
    ))
);

module.exports = mergePlayers;
