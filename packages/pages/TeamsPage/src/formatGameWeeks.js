const findPlayerThisGw = (transferList, { start }) => {
  const gwPlayers = transferList.filter((transfer) => transfer.start < new Date(start));
  return gwPlayers[gwPlayers.length - 1];
};


/* OUTPUT:
  [
    { player, start, end }
  ]
*/
const findTransfer = ({
  manager, player, transfers, gameWeeks, players,
}) => {
  if (!player || !player.name) {
    console.error('no Player: ', player);
    return [];
  }
  const managerTransfers = transfers[manager] || [];
  const endOfSeason = gameWeeks[gameWeeks.length - 1].end;
  const dbPlayer = players[player.name];
  const playerTransfers = [{
    player: dbPlayer,
    start: new Date(gameWeeks[0].start).setHours(0, 0, 0, 0),
  }];

  managerTransfers
    .filter((transfer) => (
      transfer.type === 'Transfer'
      && players[transfer.transferIn]
      && players[transfer.transferOut]
    ))
    .forEach((transfer) => {
      const lastTransfer = playerTransfers[playerTransfers.length - 1];
      const playerIn = players[transfer.transferIn];
      if (transfer.transferOut === lastTransfer.player.name) {
        playerTransfers[playerTransfers.length - 1].end = new Date(transfer.timestamp);
        playerTransfers[playerTransfers.length - 1].endTS = transfer.timestamp;
        const dbPlayerIn = players[playerIn.name];
        playerTransfers.push({
          player: dbPlayerIn,
          start: new Date(transfer.timestamp),
          startTS: transfer.timestamp,
        });
      }
    });

  playerTransfers[playerTransfers.length - 1].end = new Date(endOfSeason).setHours(23, 59, 59, 999);
  return playerTransfers;
};

const findGameWeekTeam = ({
  teams, gameWeeks, manager, transfers, players,
}) => {
  const originalTeam = teams[manager];
  return originalTeam.map((player) => {
    const playerTransfers = findTransfer({
      manager, player, gameWeeks, transfers, players,
    });
    return gameWeeks
      .map((gw) => {
        const playerThisGw = findPlayerThisGw(playerTransfers, gw);
        return { ...playerThisGw };
      })
      .filter((gw, i) => gw.player.fixtures[i]);
  });
};

export default findGameWeekTeam;
