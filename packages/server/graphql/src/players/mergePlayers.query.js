import { fetchPlayersFull } from '@kammy-ui/fetch-sky-sports';
import fetchSpreadsheet from '@kammy-ui/fetch-google-sheets';
import { connect } from '@kammy-ui/database';

export const mergePlayersData = ({ spreadsheetPlayers, skySportsPlayers }) => {
  const allPlayers = {
    ...spreadsheetPlayers,
    ...skySportsPlayers,
  };
  try {
    return Object.keys(allPlayers)
      .filter((key) => skySportsPlayers[key])
      .reduce((prev, key) => ({
        ...prev,
        [key]: {
          isHidden: spreadsheetPlayers[key] ? spreadsheetPlayers[key].isHidden : false,
          new: spreadsheetPlayers[key] ? spreadsheetPlayers[key].new : true,
          pos: spreadsheetPlayers[key] ? spreadsheetPlayers[key].pos : '',
          fixtures: skySportsPlayers[key].fixtures,
          value: skySportsPlayers[key].value,
          name: skySportsPlayers[key].name,
          code: skySportsPlayers[key].code,
          club: skySportsPlayers[key].skySportsClub,
          skySportsPosition: skySportsPlayers[key].skySportsPosition,
        },
      }), {});
  } catch (e) {
    console.error(e);
  }
  return {};
};

export default async () => {
  const { upsertPlayers } = await connect();
  return (
    Promise.all([
      fetchSpreadsheet({ spreadsheetId: '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI', worksheetName: 'GameWeeks' }),
      fetchSpreadsheet({ spreadsheetId: '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI', worksheetName: 'Players' }),
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
