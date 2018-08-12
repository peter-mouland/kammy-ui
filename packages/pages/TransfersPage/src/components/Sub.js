import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Svg from '@kammy-ui/svg';

import changeIcon from '../lib/change.svg';

class Swap extends React.Component {
  render() {
    const {
      intGameWeek, swapPlayer, team,
    } = this.props;

    const sub = team.find((teamSheetItem) => teamSheetItem.teamPos === 'SUB');
    return (
      <Fragment>
        <h3>Who to <em>sub</em> in (to replace {sub.gameWeeks[intGameWeek].name})</h3>
        <table className={'table'}>
          <tbody>
            {team
              .filter((teamSheetItem) => teamSheetItem.teamPos !== 'SUB')
              .map((teamSheetItem) => {
                const player = teamSheetItem.gameWeeks[intGameWeek];
                const selected = player.name === sub.name;
                return (
                  <tr key={player.name} className={'transfer'}>
                    <td className={'cell cell--team-position'}>
                      {teamSheetItem.teamPos}
                    </td>
                    <td className={'cell cell--player'}>
                      {player.name}
                    </td>
                    <td className={'cell cell--position'}>{player.pos}</td>
                    <td className={'cell cell--club'}>{player.club}</td>
                    <td>
                      {
                        !selected && (
                          <Svg
                            className={'change-icon'}
                            onClick={() => swapPlayer(player)}
                          >
                            {changeIcon}
                          </Svg>
                        )
                      }
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

Swap.propTypes = {
  intGameWeek: PropTypes.number.isRequired,
  swapPlayer: PropTypes.func.isRequired,
  team: PropTypes.array.isRequired,
};

export default Swap;
