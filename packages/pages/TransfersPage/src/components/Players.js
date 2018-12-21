import React from 'react';
import PropTypes from 'prop-types';

import DataListInput from './DataList';

class Players extends React.Component {
  render() {
    const {
      onSelect, players,
    } = this.props;

    return (
      <div className='transfer-player__input'>
        <DataListInput placeholder={'Search by player name...'} items={players} onSelect={onSelect} />
      </div>
    );
  }
}

Players.propTypes = {
  players: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Players;
