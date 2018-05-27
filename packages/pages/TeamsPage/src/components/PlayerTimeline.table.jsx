import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';

import { keysAsCellHeaders, keysAsCells } from '../components/tableHelpers';
import './positionTimeline.scss';

const bem = bemHelper({ block: 'position-timeline' });

const sum = (total, stats) => {
  Object.keys(stats).forEach((key) => {
    total[key] = (total[key] || 0) + stats[key]; // eslint-disable-line
  });
  return null;
};

const PlayerTimelineTable = ({ player }) => {
  const totals = {};
  return (
    <table>
      <tbody>
        <tr>
          <th colSpan={3} />
          {keysAsCellHeaders(player.gameWeekStats)}
        </tr>
        {
          player.fixtures.map((fixture) => (
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
              {sum(totals, fixture.stats)}
            </tr>
          ))
        }
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={3} />
          {keysAsCells(totals)}
        </tr>
      </tfoot>
    </table>
  );
};

PlayerTimelineTable.propTypes = {
  player: PropTypes.object.isRequired,
};

export default PlayerTimelineTable;
