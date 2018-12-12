import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import DataListInput from './DataList';

class Players extends React.Component {
  render() {
    const {
      onSelect, players,
    } = this.props;

    return (
      <Fragment>
        <h3>Who is in?</h3>
        <div className='transfer-player__input'>
          <DataListInput placeholder={'Search by player name...'} items={players} onSelect={onSelect} />
        </div>
      </Fragment>
    );
  }
}

Players.propTypes = {
  players: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Players;
