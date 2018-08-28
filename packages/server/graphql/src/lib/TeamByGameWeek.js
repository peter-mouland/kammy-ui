export const UNKNOWN_PLAYER = (name) => ({
  name: `UNKNOWN: ${name}`,
  club: '',
  code: 0,
});

class TeamByGameWeek {
  constructor({
    gameWeeks, players, transfers, draft
  }) {
    this.transfers = transfers || []; // not all managers would have made transfers
    this.gameWeeks = gameWeeks;
    this.players = players;
    this.draft = draft;
    this.endOfSeason = new Date(gameWeeks[gameWeeks.length - 1].end).setHours(23, 59, 59, 999);
    this.startOfSeason = new Date(gameWeeks[0].start).setHours(0, 0, 0, 0);
  }

  getPlayer = (Player) => {
    const player = { ...(this.players[Player.name] || UNKNOWN_PLAYER(Player.name)) };
    return {
      name: player.name,
      club: player.club,
      code: player.code,
      pos: player.pos,
    };
  };

  /*
   PURPOSE: to find a transfer list of players
   OUTPUT:
    [ player ]
  */
  findPlayerThisGw = ({ transferList, gameWeek }) => {
    const gwPlayers = transferList.filter((transfer) => transfer.start < new Date(gameWeek.start));
    return gwPlayers[gwPlayers.length - 1].player || UNKNOWN_PLAYER();
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
      players, startOfSeason, endOfSeason, transfers,
    } = this;
    let playerInPosition = this.getPlayer(player);
    const playerTransfers = [{
      player: playerInPosition,
      playerOut: null,
      start: startOfSeason,
      type: 'draft',
    }];

    transfers
      .filter((transfer) => (
        transfer.type !== 'Waiver Request'
        && players[transfer.transferIn]
        && players[transfer.transferOut]
      ))
      .forEach((transfer) => {
        if (transfer.type === 'Swap' && transfer.transferIn === playerInPosition.name) {
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

  getSeason = () => {
    const { draft, gameWeeks } = this;
    return gameWeeks.map((gameWeek) => {
      const players = draft.map((teamPlayer) => {
        const transferList = this.getTransferList(teamPlayer);
        const player = this.findPlayerThisGw({ transferList, gameWeek });
        return {
          teamPos: teamPlayer.pos,
          pos: this.getPlayer(player).pos,
          code: player.code,
          name: player.name,
          club: player.club,
          manager: teamPlayer.manager,
        };
      });
      return {
        ...gameWeek,
        players,
      };
    });
  }
}

export default TeamByGameWeek;
