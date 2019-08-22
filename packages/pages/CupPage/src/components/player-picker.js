import React from 'react';
import PropTypes from 'prop-types';

const PlayerPicker = ({
  team, pendingTransfers, handleChange, picked, playerNumber, ...props
}) => (
  <select {...props} onChange={(e) => handleChange(e.target.value, playerNumber)}>
    <option> - </option>
    {team.map((player, i) => (
      <option key={`${i}${player.name}`} disabled={picked.includes(player.name)}>{player.name}</option>
    ))}
    {pendingTransfers.length && (
      [<option disabled key={'disabled-pending'}> - pending transfers - </option>].concat(
        pendingTransfers.map((player, i) => (
          <option key={`${i}${player.transferIn}`} disabled={picked.includes(player.transferIn)}>
            {player.transferIn}
          </option>
        )),
      )
    )}
  </select>
);

PlayerPicker.propTypes = {
  team: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  playerNumber: PropTypes.number.isRequired,
  pendingTransfers: PropTypes.array,
  picked: PropTypes.array,
  handleChange: PropTypes.func.isRequired,
};

PlayerPicker.defaultProps = {
  picked: [],
  pendingTransfers: [],
};

export default PlayerPicker;
