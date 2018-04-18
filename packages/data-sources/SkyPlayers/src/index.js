import React from 'react';
import { getJSON } from '@kammy/fetchr';

class SkyPlayers extends React.Component {
  fetch = () => {
    getJSON('http://localhost:9001/players'); // .then(console.log)
  }

  render() {
    return (
      <div>
        <button onClick={this.fetch}>Fetch!</button>
      </div>
    );
  }
}

export default SkyPlayers;
