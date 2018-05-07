import React from 'react';
import { getJSON } from '@kammy-ui/fetchr';

class SkyPlayers extends React.Component {
  state = {
    players: [],
    playerStats: {},
    fixtures: {},
  };

  fetchPlayers = async () => {
    const { data } = await getJSON('/skysports/players'); // todo: add test to ensure localhost is not used
    this.setState({ players: data.players });
  };

  fetchPlayersWithSummary = async () => {
    const data = await getJSON('/skysports/players-full'); // todo: add test to ensure localhost is not used
    this.setState({ playersFull: data });
  };

  fetchStats = async (code) => {
    const player = await getJSON(`/skysports/player/${code}`); // todo: add test to ensure localhost is not used
    this.setState({ playerStats: player });
  };

  fetchFixturesLocal = async () => {
    const fixtures = await getJSON('/skysports/fixtures'); // todo: add test to ensure localhost is not used
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
          {players.map((player) => (
            <li key={player.id}>
              {player.id}: {player.fName} {player.sName}
              <button onClick={() => this.fetchStats(player.id)}>Fetch Stats</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SkyPlayers;
