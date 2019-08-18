/* eslint-disable prefer-spread */
const getTeamPoints = (team) => team.player1.points + team.player2.points + team.player3.points + team.player4.points;

class Cup {
  // see packages/server/fetch-google-sheets/src/index.js for shapes
  // @cup: [{ group, gameWeek, round, manager, player1, player2, player3, player4 }]
  // @players: [Player]
  // @currentGameWeek: String
  constructor({
    cup, players,
  }) {
    this.playersByName = players.reduce((prev, player) => ({
      ...prev,
      [player.name]: { ...player },
    }), {});
    // public api

    this.managers = [...new Set(cup.map((team) => team.manager))]; // [ manager ]
    this.groups = [...new Set(cup.map((team) => team.group))]; // [ groups ]
    this.rounds = [...new Set(cup.map((team) => team.round))]; // [ rounds ]

    this.teams = cup.map((team) => {
      const teamWithPlayers = ({
        ...team,
        player1: this.getPlayer(team.player1, team),
        player2: this.getPlayer(team.player2, team),
        player3: this.getPlayer(team.player3, team),
        player4: this.getPlayer(team.player4, team),
        rank: 0,
      });
      return {
        ...teamWithPlayers,
        points: getTeamPoints(teamWithPlayers),
      };
    });
  }

  getPlayer(name, team) {
    const { playersByName } = this;
    const player = playersByName[name] || { gameWeeks: [] };
    const gameWeek = player.gameWeeks[team.gameWeek - 1] || { stats: {} };
    return {
      name,
      code: player.code || 0,
      pos: player.pos || 0,
      points: gameWeek.stats.points || 0,
      rank: 0,
    };
  }
}

export default Cup;
