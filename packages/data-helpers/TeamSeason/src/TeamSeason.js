import { playerStats } from '@kammy-ui/data-player-stats';

import { calculateSeasonPoints, calculateSeasonStats } from './calculateSeason';

class TeamSeason {
  constructor({
    gameWeeks, players, transfers, team,
  }) {
    this.transfers = transfers || []; // not all managers would have made transfers
    this.gameWeeks = gameWeeks;
    this.players = players;
    this.team = team;
    this.endOfSeason = new Date(gameWeeks[gameWeeks.length - 1].end).setHours(23, 59, 59, 999);
    this.startOfSeason = new Date(gameWeeks[0].start).setHours(0, 0, 0, 0);
  }

  formatSeasonUntilGw = (playerGameWeeks, gameWeek) => {
    const seasonStats = calculateSeasonStats(playerGameWeeks.slice(0, parseInt(gameWeek, 10)));
    const seasonPoints = calculateSeasonPoints(playerGameWeeks.slice(0, parseInt(gameWeek, 10)));
    return {
      seasonStats, seasonPoints,
    };
  }

  /*
   PURPOSE: to find a transfer list of players
   OUTPUT:
    [
      { ...Player, ...PlayerStats }
    ]
  */
  findPlayerThisGw = ({ transferList, gameWeek, withStats }) => {
    const gwPlayers = transferList.filter((transfer) => transfer.start < new Date(gameWeek.start));
    const transfer = gwPlayers[gwPlayers.length - 1];
    if (withStats) {
      return playerStats({ data: transfer.player, gameWeeks: [gameWeek] });
    }
    return transfer.player;
  };

  /*
   PURPOSE: to find a transfer list of players
   OUTPUT:
    [
      { player, start, end }
    ]
  */
  getPlayerTransfers = (player) => {
    const {
      players, startOfSeason, endOfSeason, transfers,
    } = this;
    let playerInPosition = players[player.name];
    const playerTransfers = [{
      player: playerInPosition,
      playerOut: null,
      start: startOfSeason,
      type: 'draft',
    }];

    transfers
      .filter((transfer) => (
        transfer.type !== 'Waiver Request' &&
        players[transfer.transferIn] &&
        players[transfer.transferOut]
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
  }

  // out:
  //  [{
  //     teamPos, // GK, CB, CB, ..., SUB
  //     pos, // GK, CB, CB, ..., STR
  //     gameWeeks: [  // * 40
  //       {
  //         player,
  //         gameWeekStats: [ stats ],
  //         gameWeekPoints: [ stats ],
  //       }
  //     ],
  //     seasonStats: [ stats ],
  //     seasonPoints: [ stats ],
  //   }]
  getSeason = ({ withStats }) => {
    const { players, team, gameWeeks } = this;
    return team.map((player) => {
      const transferList = this.getPlayerTransfers(player);
      const playerGameWeeks = gameWeeks.map((gameWeek) => (
        this.findPlayerThisGw({ transferList, gameWeek, withStats })
      ));
      const stats = withStats ? {
        seasonStats: calculateSeasonStats(playerGameWeeks),
        seasonPoints: calculateSeasonPoints(playerGameWeeks),
      } : {};
      const seasonToGameWeek = gameWeeks.map((gameWeek) => (
        this.formatSeasonUntilGw(playerGameWeeks, gameWeek.gameWeek)
      ));

      return {
        teamPos: player.pos,
        pos: players[player.name].pos,
        gameWeeks: playerGameWeeks,
        seasonToGameWeek,
        ...stats,
      };
    });
  }
}

export default TeamSeason;
