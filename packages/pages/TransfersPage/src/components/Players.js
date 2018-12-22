import React from 'react';
import PropTypes from 'prop-types';

import DataListInput from './DataList';

// const getPlayers = (type = '') => {
//   switch (type.toLowerCase()) {
//   case 'swap': return (team, players) => team;
//   }
// };

const playerOptions = (players) => (
  players.map((player) => (
    { value: player.name, label: `${player.name} (${player.pos}) `, key: player.name }
  ))
);

class Players extends React.Component {
  shouldComponentUpdate = (nextProps) => JSON.stringify(nextProps.players) !== JSON.stringify(this.props.players)

  render() {
    const {
      onSelect, players,
    } = this.props;

    return (
      <div className='transfer-player__input'>
        <DataListInput placeholder={'Search by player name...'} alwaysShowItems items={playerOptions(players)} onSelect={onSelect} />
      </div>
    );
  }
}

Players.propTypes = {
  players: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Players;
