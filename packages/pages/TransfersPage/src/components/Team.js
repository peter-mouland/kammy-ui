import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Svg from '@kammy-ui/svg';
import bemHelper from '@kammy-ui/bem';

import changeIcon from '../lib/change.svg';

const bem = bemHelper({ block: 'transfers-page' });

class Team extends React.Component {
  render() {
    const {
      changePlayer, changeType, intGameWeek, updateChangePlayer, team,
    } = this.props;
    return (
      <Fragment>
        <h3>Who would you like to <em>{changeType}</em> out?</h3>
        <table>
          <tbody>
            {team.map((teamSheetItem) => {
              const player = teamSheetItem.gameWeeks[intGameWeek];
              const selected = changePlayer && (player.name === changePlayer.name);
              return (
                <tr
                  key={player.name}
                  className={bem('item', { selected })}
                >
                  <td className={'cell cell--team-position'}>
                    {teamSheetItem.teamPos}
                  </td>
                  <td className={'cell cell--player'}>
                    {player.name}
                  </td>
                  <td className={'cell cell--position'}>{player.pos}</td>
                  <td className={'cell cell--club'}>{player.club}</td>
                  <td>
                    <Svg
                      className={'change-icon'}
                      onClick={() => updateChangePlayer(player)}
                    >
                      {changeIcon}
                    </Svg>
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
  changeType: PropTypes.string.isRequired,
  intGameWeek: PropTypes.number.isRequired,
  changePlayer: PropTypes.object.isRequired,
  team: PropTypes.array.isRequired,
  updateChangePlayer: PropTypes.func.isRequired,
};

export default Team;
