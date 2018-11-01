import React from 'react';
import PropTypes from 'prop-types';

const PlayerPicker = ({ team }) => (
  <select>
    <option> - </option>
    {team.map((player, i) => <option key={`${i}${player.name}`} disabled={player.picked}>{player.name}</option>)}
  </select>
);

PlayerPicker.propTypes = {
  team: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    picked: PropTypes.bool,
  })),
};

export default PlayerPicker;
