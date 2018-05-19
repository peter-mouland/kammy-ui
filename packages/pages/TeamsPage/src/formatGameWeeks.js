import { playerStats } from '@kammy-ui/data-player-stats';

const calculateSeasonPoints = (playerGameWeeks) => (
  playerGameWeeks.reduce((totals, gw) => (
    Object.keys(gw.points).reduce((prev, stat) => ({
      ...prev,
      [stat]: gw.points[stat] + (totals[stat] || 0),
    }), {})
  ), {})
);
const calculateSeasonStats = (playerGameWeeks) => (
  playerGameWeeks.reduce((totals, gw) => (
    Object.keys(gw.gameWeekStats).reduce((prev, stat) => ({
      ...prev,
      [stat]: gw.gameWeekStats[stat] + (totals[stat] || 0),
    }), {})
  ), {})
);

/*
 PURPOSE: to find a transfer list of players
 OUTPUT:
  [
    { ...Player, ...PlayerStats }
  ]
*/
const findPlayerThisGw = (transferList, gameWeek) => {
  const gwPlayers = transferList.filter((transfer) => transfer.start < new Date(gameWeek.start));
  const transfer = gwPlayers[gwPlayers.length - 1];
  return playerStats({ data: transfer.player, gameWeeks: [gameWeek] });
};


/*
 PURPOSE: to find a transfer list of players
 OUTPUT:
  [
    { player, start, end }
  ]
*/
const findPlayerTransfers = ({
  player, transfers = [], endOfSeason, startOfSeason, players,
}) => {
  let playerInPosition = players[player.name];
  const playerTransfers = [{
    player: playerInPosition,
    playerOut: null,
    start: startOfSeason,
    type: 'draft',
  }];

  transfers
    .filter((transfer) => (
      // transfer.type !== 'Swap' &&
      transfer.type !== 'Waiver Request' &&
      players[transfer.transferIn] &&
      players[transfer.transferOut]
    ))
    .forEach((transfer) => {
      if (transfer.type === 'Swap' && transfer.transferIn === player.name) {
        playerTransfers[playerTransfers.length - 1].end = new Date(transfer.timestamp);
        playerTransfers.push({
          player: players[transfer.transferOut],
          playerOut: players[transfer.transferIn],
          start: new Date(transfer.timestamp),
          type: transfer.type,
        });
        playerInPosition = players[transfer.transferOut];
      } else if (transfer.transferOut === playerInPosition.name) {
        playerTransfers[playerTransfers.length - 1].end = new Date(transfer.timestamp);
        playerTransfers.push({
          player: players[transfer.transferIn],
          playerOut: players[transfer.transferOut],
          start: new Date(transfer.timestamp),
          type: transfer.type,
        });
        playerInPosition = players[transfer.transferIn];
      }
    });

  playerTransfers[playerTransfers.length - 1].end = endOfSeason;
  return playerTransfers;
};

// out:
//   {   // teams obj
//     [manager]: {
//        [
//          teamPos, // GK, CB, CB, ..., SUB
//          pos, // GK, CB, CB, ..., STR
//          gameWeeks: [  // * 40
//            {
//              player,
//              gameWeekStats: [ stats ],
//              gameWeekPoints: [ stats ],
//            }
//          ],
//          seasonStats: [ stats ],
//          seasonPoints: [ stats ],
//        ]
//     }
//   }

const findGameWeekTeam = ({
  teams, gameWeeks, transfers, players,
}) => {
  const endOfSeason = new Date(gameWeeks[gameWeeks.length - 1].end).setHours(23, 59, 59, 999);
  const startOfSeason = new Date(gameWeeks[0].start).setHours(0, 0, 0, 0);
  return Object.keys(teams).reduce((prev, manager) => {
    const initialPlayers = teams[manager];
    const managerTransfers = transfers[manager];
    // console.log({ managerTransfers })
    const teamPlayers = initialPlayers.map((player) => {
      const teamPositionTransfers = findPlayerTransfers({
        player,
        endOfSeason,
        startOfSeason,
        transfers: managerTransfers,
        players,
      });
      // console.log({ teamPositionTransfers })
      const playerGameWeeks = gameWeeks.map((gw) => findPlayerThisGw(teamPositionTransfers, gw));
      return {
        teamPos: player.pos,
        pos: players[player.name].pos,
        gameWeeks: playerGameWeeks,
        seasonStats: calculateSeasonStats(playerGameWeeks),
        seasonPoints: calculateSeasonPoints(playerGameWeeks),
      };
    });

    return {
      ...prev,
      [manager]: teamPlayers,
    };
  }, {});
};


// const findGameWeekTeam = ({
//                             teams, gameWeeks, transfers, players,
//                           }) => {
//   const endOfSeason = new Date(gameWeeks[gameWeeks.length - 1].end).setHours(23, 59, 59, 999);
//   const startOfSeason = new Date(gameWeeks[0].start).setHours(0, 0, 0, 0);
//   return Object.keys(teams).reduce((prev, manager) => {
//     console.log(' ** manager ** ', manager)
//     const initialPlayers = teams[manager];
//     const managerTransfers = transfers[manager];
//     const teamTransfers = initialPlayers.map((player) => findPlayerTransfers({
//       player,
//       endOfSeason,
//       startOfSeason,
//       transfers: managerTransfers,
//       players,
//     }));
//     const teamByGameWeek = gameWeeks.map((gameWeek) => findTeamThisGw({ teamTransfers, gameWeek }));
//
//
//     const teamPlayers = initialPlayers.map((player) => {
//       const playerTransfers = findPlayerTransfers({
//         player,
//         endOfSeason,
//         startOfSeason,
//         transfers: managerTransfers,
//         players,
//       });
//       const playerGameWeeks = gameWeeks.map((gw) => findPlayerThisGw(playerTransfers, gw));
//       return {
//         teamPos: player.pos,
//         pos: players[player.name].pos,
//         gameWeeks: playerGameWeeks,
//         seasonStats: calculateSeasonStats(playerGameWeeks),
//         seasonPoints: calculateSeasonPoints(playerGameWeeks),
//       };
//     });
//
//     return {
//       ...prev,
//       [manager]: teamPlayers,
//     };
//   }, {});
// };

export default findGameWeekTeam;
