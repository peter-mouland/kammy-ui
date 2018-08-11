const { fetchPlayersFull } = require('@kammy-ui/fetch-sky-sports');
const fetchGsheet = require('@kammy-ui/fetch-google-sheets');
const { rootActions } = require('@kammy-ui/database');

const { upsertPlayers } = rootActions();

const mergePlayersData = ({ spreadsheetPlayers, skySportsPlayers }) => {
  const allPlayers = {
    ...spreadsheetPlayers,
    ...skySportsPlayers,
  };
  try {
    const mergedPlayers = Object.keys(allPlayers)
      .filter((key) => skySportsPlayers[key])
      .reduce((prev, key) => {
        const mergedPlayer = ({
          ...prev,
          [key]: {
            isHidden: spreadsheetPlayers[key] ? spreadsheetPlayers[key].isHidden : false,
            new: spreadsheetPlayers[key] ? spreadsheetPlayers[key].new : true,
            pos: spreadsheetPlayers[key] ? spreadsheetPlayers[key].pos : '',
            fixtures: skySportsPlayers[key].fixtures,
            stats: skySportsPlayers[key].stats,
            value: skySportsPlayers[key].value,
            name: skySportsPlayers[key].name,
            code: skySportsPlayers[key].code,
            club: skySportsPlayers[key].skySportsClub,
            skySportsPosition: skySportsPlayers[key].skySportsPosition,
          },
        });
        return mergedPlayer;
      }, {});
    return mergedPlayers;
  } catch (e) {
    console.error(e);
  }
  return {};
};

const mergePlayers = () => (
  Promise.all([
    fetchGsheet({ spreadsheetId: '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI', worksheetName: 'Players' }),
    fetchPlayersFull(),
  ])
    .then(([spreadsheetPlayers, skySportsPlayers]) => (
      mergePlayersData({
        spreadsheetPlayers,
        skySportsPlayers: skySportsPlayers.data,
      })
    ))
    .then((mergedPlayers) => upsertPlayers(Object.values(mergedPlayers)))
);

module.exports = mergePlayers;
