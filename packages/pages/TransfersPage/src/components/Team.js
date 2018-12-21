import React from 'react';
import PropTypes from 'prop-types';
import Svg from '@kammy-ui/svg';
import bemHelper from '@kammy-ui/bem';

import exit from '../lib/exit.svg';

const bem = bemHelper({ block: 'transfers-page' });

class Team extends React.Component {
  render() {
    const {
      changePlayer, onSelect, team,
    } = this.props;

    return (
      <table className='table'>
        <tbody>
          {team
            .map((player, i) => {
              const selected = changePlayer && (player.name === changePlayer.name);
              return (
                <tr
                  key={player.name}
                  className={bem('item', { selected })}
                >
                  <td className={'cell cell--team-position'}>
                    {player.pos}
                    {i === 11 && ' (SUB)'}
                  </td>
                  <td className={'cell cell--club'}>{player.club}</td>
                  <td className={'cell cell--player'}>{player.name}</td>
                  <td className={'cell cell--cta'}>
                    <button
                      disabled={!onSelect}
                      type='button'
                      onClick={() => onSelect(player)}
                      className={'change-icon-button'}
                    >
                      <Svg
                        className={'change-icon'}
                      >
                        {exit}
                      </Svg>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

Team.propTypes = {
  changePlayer: PropTypes.object,
  team: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

Team.defaultProps = {
  changePlayer: {},
  team: [{ pos: 'GK' }, { pos: 'CB' }, { pos: 'CB' }, { pos: 'FB' }, { pos: 'FB' }, { pos: 'MID' }, { pos: 'MID' }, { pos: 'AM' }, { pos: 'AM' }, { pos: 'STR' }, { pos: 'STR' }, { pos: '' }],
  onSelect: null,
};

export default Team;
