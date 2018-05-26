import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';
import { fixturesWithStats } from '@kammy-ui/data-player-stats';

import { keysAsCellHeaders, keysAsCells } from '../components/tableHelpers';
import './positionTimeline.scss';

const bem = bemHelper({ block: 'position-timeline' });

const PlayerTimelineTable = ({ player }) => (
  <div>
    <table>
      <tbody>
        <tr>
          <th colSpan={4} />
          {keysAsCellHeaders(player.gameWeekStats)}
        </tr>
        {
          fixturesWithStats(player.fixtures, player.pos).map((fixture) => (
            <tr key={`${fixture.event}`}>
              <td className={bem('team', {
                home: true,
                'my-team': player.club === fixture.hTname,
              })}>{fixture.hTname} {fixture.hScore}</td>
              <td>vs</td>
              <td className={bem('team', {
                away: true,
                'my-team': player.club === fixture.aTname,
              })}>{fixture.aScore} {fixture.aTname}</td>
              {keysAsCells(fixture.stats)}
            </tr>
          ))
        }
        <tr>
          <th colSpan={5} />
        </tr>
      </tbody>
    </table>
  </div>
);

PlayerTimelineTable.propTypes = {
  player: PropTypes.object.isRequired,
  season: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
};

export default PlayerTimelineTable;