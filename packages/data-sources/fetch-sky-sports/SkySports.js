import React from 'react';
import { fetchSkySports } from '@kammy-ui/fetchr';

class SkyPlayers extends React.Component {
  state = {
    players: [],
    playerStats: {},
    fixtures: {},
  };

  fetchPlayers = async () => {
    const { data } = await fetchSkySports('/players'); // todo: add test to ensure localhost is not used
    this.setState({ players: data });
  };

  fetchPlayersWithSummary = async () => {
    const data = await fetchSkySports('/players-full'); // todo: add test to ensure localhost is not used
    console.log(data);
    this.setState({ playersFull: data });
  };

  fetchStats = async (code) => {
    const player = await fetchSkySports(`/player/${code}`); // todo: add test to ensure localhost is not used
    this.setState({ playerStats: player });
  };

  fetchFixturesLocal = async () => {
    const fixtures = await fetchSkySports('/fixtures'); // todo: add test to ensure localhost is not used
    this.setState({ fixtures });
  };

  render() {
    const { players, playerStats, fixtures } = this.state;
    return (
      <div>
        <button onClick={this.fetchPlayers}>Fetch Players!</button>
        <button onClick={this.fetchPlayersWithSummary}>Fetch Players (Full)!</button>
        <button onClick={this.fetchFixturesLocal}>Fetch Fixtures (direct)</button>
        <h2>Stats</h2>
        <div><textarea value={JSON.stringify(playerStats, null, 2)} /></div>
        <h2>Fixtures</h2>
        <div><textarea value={JSON.stringify(fixtures, null, 2)} /></div>
        <ul>
          {Object.keys(players).map((name) => {
            const player = players[name];
            return (
              <li key={player.code}>
                {player.code}: {player.name}
                <button onClick={() => this.fetchStats(player.code)}>Fetch Stats</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SkyPlayers;
