import React from 'react';
import PropTypes from 'prop-types';

import DataListInput from './DataList';

const playerOptions = (players, playersFilter) => {
  const filteredPlayers = playersFilter ? players.filter(playersFilter) : players;
  return (
    filteredPlayers.map((player) => (
      {
        value: player.name,
        label: `${player.name} (${player.pos}) `,
        key: player.name,
        img: `${`https://fantasyfootball.skysports.com/assets/img/players/${player.code}.png`}`,
      }
    ))
  );
};

class Players extends React.Component {
  shouldComponentUpdate = (nextProps) => (
    JSON.stringify(nextProps.playersArray) !== JSON.stringify(this.props.playersArray)
  )

  render() {
    const {
      onSelect, playersArray, playersFilter,
    } = this.props;

    return (
      <div className='transfer-player__input'>
        <DataListInput placeholder={'Search by player name...'} alwaysShowItems items={playerOptions(playersArray, playersFilter)} onSelect={onSelect} />
      </div>
    );
  }
}

Players.propTypes = {
  playersArray: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  playersFilter: PropTypes.func,
};

Players.defaultProps = {
  playersFilter: null,
};

export default Players;
