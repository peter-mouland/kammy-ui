import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Svg from '@kammy-ui/svg';
import bemHelper from '@kammy-ui/bem';

import exit from '../lib/exit.svg';

const bem = bemHelper({ block: 'transfers-page' });

class Team extends React.Component {
  render() {
    const {
      changePlayer, intGameWeek, onSelect, team,
    } = this.props;

    return (
      <Fragment>
        <h3>Who is out?</h3>
        <table className='table'>
          <tbody>
            {team
              .map((teamSheetItem) => {
                const player = teamSheetItem.gameWeeks[intGameWeek];
                const selected = changePlayer && (player.name === changePlayer.name);
                return (
                  <tr
                    key={player.name}
                    className={bem('item', { selected })}
                  >
                    <td className={'cell cell--team-position'}>
                      {teamSheetItem.pos}
                      {teamSheetItem.teamPos === 'SUB' && ' (SUB)'}
                    </td>
                    <td className={'cell cell--player'}>
                      {player.name}
                    </td>
                    <td className={'cell cell--club'}>{player.club}</td>
                    <td>
                      <button
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
      </Fragment>
    );
  }
}

Team.propTypes = {
  intGameWeek: PropTypes.number.isRequired,
  changePlayer: PropTypes.object,
  team: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Team;
