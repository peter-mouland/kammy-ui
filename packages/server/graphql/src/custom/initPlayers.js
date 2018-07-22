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
  console.log(allPlayers);
  const mergedPlayers = Object.keys(allPlayers)
    .reduce((prev, key) => ({
      ...prev,
      [key]: {
        pos: '', // pos is required but doesn't exist on skysports players
        ...spreadsheetPlayers && spreadsheetPlayers[key],
        ...playersSummary && playersSummary[key],
        ...skySportsPlayers && skySportsPlayers[key],
        isHidden: (
          spreadsheetPlayers[key] && (!spreadsheetPlayers[key].club || spreadsheetPlayers[key].isHidden)
        ) || !spreadsheetPlayers[key],
      },
    }), {});
  return mergedPlayers;
};

const initPlayers = () => (
  Promise.all([
    fetchGsheet({ worksheetName: 'Players' }),
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

module.exports = initPlayers;
