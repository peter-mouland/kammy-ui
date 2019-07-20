import { fetchPlayersFull } from '@kammy-ui/fetch-sky-sports';
import * as fetchSpreadsheet from '@kammy-ui/fetch-kammy-sheets';
import { connect } from '@kammy-ui/database';

export const mergePlayersData = ({ spreadsheetPlayers, skySportsPlayers }) => {
  const allPlayers = {
    ...spreadsheetPlayers,
    ...skySportsPlayers,
  };
  try {
    // turn array into obj
    const spreadsheetPlayersObj = spreadsheetPlayers.reduce((prev, player) => ({
      ...prev,
      ...player,
    }), {});
    // console.log(allPlayers['Hazard, Eden'])
    const mergedPlayers = Object.keys(allPlayers)
      .filter((key) => skySportsPlayers[key])
      .reduce((prev, key) => ({
        ...prev,
        [key]: {
          isHidden: spreadsheetPlayersObj[key] ? spreadsheetPlayersObj[key].isHidden : false,
          new: spreadsheetPlayersObj[key] ? spreadsheetPlayersObj[key].new : true,
          pos: spreadsheetPlayersObj[key] ? spreadsheetPlayersObj[key].pos : '',
          fixtures: skySportsPlayers[key].fixtures,
          value: skySportsPlayers[key].value,
          name: skySportsPlayers[key].name,
          code: skySportsPlayers[key].code,
          club: skySportsPlayers[key].skySportsClub,
          skySportsPosition: skySportsPlayers[key].skySportsPosition,
        },
      }), {});
    // console.log(mergedPlayers['Hazard, Eden'])

    return mergedPlayers;
  } catch (e) {
    console.error(e);
  }
  return {};
};

const mergePlayers = async () => {
  const { upsertPlayers } = await connect();
  return (
    Promise.all([
      (fetchSpreadsheet.default || fetchSpreadsheet).gameWeeks(),
      (fetchSpreadsheet.default || fetchSpreadsheet).players(),
      fetchPlayersFull(),
    ])
      .then(([gameWeeks, spreadsheetPlayers, skySportsPlayers]) => ({
        players: mergePlayersData({
          spreadsheetPlayers,
          skySportsPlayers: skySportsPlayers.data,
        }),
        gameWeeks,
      }))
      .then(({ players, gameWeeks }) => upsertPlayers({
        players: Object.values(players),
        gameWeeks,
      }))
  );
};

export default mergePlayers;
