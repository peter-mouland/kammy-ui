import { playerStats } from '@kammy-ui/data-player-stats';
import toDate from '@kammy-ui/helpers-to-date';
import isBefore from 'date-fns/is_before';

import calculateSeasonStats from './calculateSeason';

export const UNKNOWN_PLAYER = (name) => ({
  name: `UNKNOWN: ${name}`,
  fixtures: [],
  club: '',
  code: 0,
});

class TeamSeason {
  constructor({
    gameWeeks, players, transfers, team,
  }) {
    this.transfers = transfers || []; // not all managers would have made transfers
    this.gameWeeks = gameWeeks;
    this.players = players;
    this.team = team;
    this.endOfSeason = toDate(toDate(gameWeeks[gameWeeks.length - 1].end).setHours(23, 59, 59, 999));
    this.startOfSeason = toDate(toDate(gameWeeks[0].start).setHours(0, 0, 0, 0));
  }

  getPlayer = (player) => (
    this.players[player.name] || UNKNOWN_PLAYER(player.name)
  );

  /*
   PURPOSE: to find a transfer list of players
   OUTPUT:
    [
      { ...Player, ...PlayerStats }
    ]
  */
  findPlayerThisGw = ({ transferList, gameWeek }) => {
    const gwPlayers = (gameWeek.gameWeek === 0)
      ? transferList
      : transferList.filter((transfer) => isBefore(transfer.start, gameWeek.start));
    try {
      const item = gwPlayers[gwPlayers.length - 1] || {};
      const transfer = item.player || UNKNOWN_PLAYER();
      return playerStats({ player: transfer, gameWeeks: [gameWeek] });
    } catch (e) {
      console.error(e);
      console.error('gwPlayers.length: ', gwPlayers.length);
      console.error('last Player: ', gwPlayers[gwPlayers.length - 1]);
      const transfer = UNKNOWN_PLAYER();
      return playerStats({ player: transfer, gameWeeks: [gameWeek] });
    }
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
    let playerInPosition = this.getPlayer(player);
    const playerTransfers = [{
      player: playerInPosition,
      playerOut: null,
      start: startOfSeason,
      type: 'draft',
    }];

    transfers
      .filter((transfer) => (
        (transfer.type !== 'Waiver Request')
        && (transfer.type !== 'Waiver')
        && (transfer.type !== 'New Player')
        && players[transfer.transferIn]
        && players[transfer.transferOut]
      ))
      .forEach((transfer) => {
        if (transfer.type === 'Swap' && transfer.transferIn === playerInPosition.name) {
          playerTransfers[playerTransfers.length - 1].end = toDate(transfer.timestamp);
          playerTransfers.push({
            player: players[transfer.transferOut],
            playerOut: players[transfer.transferIn],
            start: toDate(transfer.timestamp),
            type: transfer.type,
          });
          playerInPosition = players[transfer.transferOut];
        } else if (transfer.transferOut === playerInPosition.name) {
          playerTransfers[playerTransfers.length - 1].end = toDate(transfer.timestamp);
          playerTransfers.push({
            player: players[transfer.transferIn],
            playerOut: players[transfer.transferOut],
            start: toDate(transfer.timestamp),
            type: transfer.type,
          });
          playerInPosition = players[transfer.transferIn];
        }
      });

    playerTransfers[playerTransfers.length - 1].end = endOfSeason;
    return playerTransfers;
  };

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
  getSeason = () => {
    const { team, gameWeeks } = this;

    return team.map((player) => {
      const transferList = this.getPlayerTransfers(player);
      const playerGameWeeks = gameWeeks.map((gameWeek) => (
        this.findPlayerThisGw({ transferList, gameWeek })
      ));
      const seasonToGameWeek = gameWeeks.map(({ gameWeek }) => (
        calculateSeasonStats(playerGameWeeks.slice(0, parseInt(gameWeek, 10)))
      ));

      return {
        teamPos: player.pos,
        pos: this.getPlayer(player).pos,
        gameWeeks: playerGameWeeks,
        seasonToGameWeek,
        seasonStats: calculateSeasonStats(playerGameWeeks),
      };
    });
  }
}


export default TeamSeason;
