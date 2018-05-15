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
const findTransfer = ({
  player, transfers = [], endOfSeason, startOfSeason, players,
}) => {
  if (!player) {
    console.error('no Player: ');
    return [];
  }
  const playerTransfers = [{ player: players[player.name], start: startOfSeason }];

  transfers
    .filter((transfer) => (
      transfer.type !== 'Swap'
      && transfer.type !== 'Waiver Request'
      && players[transfer.transferIn]
      && players[transfer.transferOut]
    ))
    .forEach((transfer) => {
      const lastTransfer = playerTransfers[playerTransfers.length - 1];
      if (transfer.transferOut === lastTransfer.player.name) {
        playerTransfers[playerTransfers.length - 1].end = new Date(transfer.timestamp);
        playerTransfers.push({
          player: players[transfer.transferIn],
          start: new Date(transfer.timestamp),
        });
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
    const teamPlayers = initialPlayers.map((player) => {
      const playerTransfers = findTransfer({
        player,
        endOfSeason,
        startOfSeason,
        transfers: managerTransfers,
        players,
      });
      const playerGameWeeks = gameWeeks.map((gw) => findPlayerThisGw(playerTransfers, gw));
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

export default findGameWeekTeam;
