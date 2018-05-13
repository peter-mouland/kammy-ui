const { fetchPlayersFull } = require('@kammy-ui/fetch-sky-sports');
const fetchGsheet = require('@kammy-ui/fetch-google-sheets');
const { rootActions } = require('@kammy-ui/database');

const { upsertPlayers } = rootActions();

const mergePlayersData = ({ spreadsheetPlayers, skySportsPlayers }) => {
  const allPlayers = {
    ...spreadsheetPlayers,
    ...skySportsPlayers,
  };
  const mergedPlayers = Object.keys(allPlayers).reduce((prev, key) => ({
    ...prev,
    [key]: {
      pos: '', // pos is required but doesn't exist on skysports players
      ...spreadsheetPlayers && spreadsheetPlayers[key],
      ...skySportsPlayers && skySportsPlayers[key],
      hidden: (
        spreadsheetPlayers[key] && (!spreadsheetPlayers[key].club || spreadsheetPlayers[key].hidden)
      ) || spreadsheetPlayers[key],
    },
  }), {});
  return mergedPlayers;
};


const fetchAndMergePlayers = () => (
  Promise.all([
    fetchGsheet({ worksheetName: 'Players' }),
    fetchPlayersFull(),
  ])
    .then(([spreadsheetPlayers, skySportsPlayers]) => (
      mergePlayersData({ spreadsheetPlayers, skySportsPlayers: skySportsPlayers.data })
    ))
);

const initPlayers = () => (
  fetchAndMergePlayers()
    .then((mergedPlayers) => (
      upsertPlayers(Object.values(mergedPlayers))
    ))
);

module.exports = initPlayers;
