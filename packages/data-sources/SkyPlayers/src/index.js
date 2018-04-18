import React from 'react';
import { getJSON } from '@kammy/fetchr';

class SkyPlayers extends React.Component {
  state = {
    players: [],
    playerStats: {},
  };

  fetchPlayers = async () => {
    const { players } = await getJSON('http://localhost:9001/players');
    this.setState({ players });
  };

  fetchStats = async (code) => {
    const player = await getJSON(`http://localhost:9001/player/${code}`);
    this.setState({ playerStats: player });
  };

  render() {
    const { players, playerStats } = this.state;
    return (
      <div>
        <button onClick={this.fetchPlayers}>Fetch Players!</button>
        <div><textarea value={JSON.stringify(playerStats, null, 2)} /></div>
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
