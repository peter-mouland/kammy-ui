class TeamByGameWeek {
  constructor({
    gameWeeks, transfers, draft,
  }) {
    this.transfers = transfers || []; // not all managers would have made transfers
    this.gameWeeks = gameWeeks;
    this.draft = draft;
    this.endOfSeason = new Date(gameWeeks[gameWeeks.length - 1].end).setHours(23, 59, 59, 999);
    this.startOfSeason = new Date(gameWeeks[0].start).setHours(0, 0, 0, 0);
  }

  /*
   PURPOSE: to find a transfer list of players
   OUTPUT:
    [ player ]
  */
  findPlayerThisGw = ({ transferList, gameWeek }) => {
    const gwPlayers = transferList.filter((transfer) => transfer.start < new Date(gameWeek.start));
    return gwPlayers[gwPlayers.length - 1].player;
  };

  /*
   PURPOSE: to find a transfer list of players
   OUTPUT:
    [
      { player, start, end }
    ]
  */
  getTransferList = (player) => {
    const {
      startOfSeason, endOfSeason, transfers,
    } = this;
    let playerInPosition = player;
    const playerTransfers = [{
      player: playerInPosition,
      playerOut: null,
      start: startOfSeason,
      type: 'draft',
    }];

    transfers
      .filter((transfer) => (
        transfer.type !== 'Waiver Request'
        && transfer.transferIn
        && transfer.transferOut
      ))
      .forEach((transfer) => {
        if (transfer.type === 'Swap' && transfer.transferIn === playerInPosition) {
          playerTransfers[playerTransfers.length - 1].end = new Date(transfer.timestamp);
          playerTransfers.push({
            player: transfer.transferOut,
            playerOut: transfer.transferIn,
            start: new Date(transfer.timestamp),
            type: transfer.type,
          });
          playerInPosition = transfer.transferOut;
        } else if (transfer.transferOut === playerInPosition) {
          playerTransfers[playerTransfers.length - 1].end = new Date(transfer.timestamp);
          playerTransfers.push({
            player: transfer.transferIn,
            playerOut: transfer.transferOut,
            start: new Date(transfer.timestamp),
            type: transfer.type,
          });
          playerInPosition = transfer.transferIn;
        }
      });

    playerTransfers[playerTransfers.length - 1].end = endOfSeason;
    return playerTransfers;
  };

  getSeason = () => {
    const { draft, gameWeeks } = this;
    return gameWeeks.map((gameWeek) => {
      const players = draft.map((teamPlayer) => {
        const transferList = this.getTransferList(teamPlayer);
        return this.findPlayerThisGw({ transferList, gameWeek });
      });
      return {
        ...gameWeek,
        players,
      };
    });
  }
}

export default TeamByGameWeek;
