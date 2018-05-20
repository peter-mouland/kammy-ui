import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';
import { calculatePoints } from '@kammy-ui/data-player-stats';

import { keysAsCellHeaders, keysAsCells } from '../lib/tableHelpers';
import statsToKeys from '../lib/extract-ff-stats';
import './positionTimeline.scss';

const bem = bemHelper({ block: 'position-timeline' });

const PositionTimelineTable = ({
  gameWeeks, season, total, position,
}) => (
  <div>
    <table>
      <tbody>
        <tr>
          <th colSpan={5} />
          {keysAsCellHeaders(season)}
        </tr>
        {
          gameWeeks.map((gameWeek, gw) => (
            gameWeek.fixturesWithinTeam.map((fixture, i) => (
              <tr key={`${fixture.event}`}>
                <th>{i === 0 && (gw + 1)}</th>
                <td>{gameWeek.name}</td>
                <td className={bem('team', {
                  home: true,
                  'my-team': gameWeek.club === fixture.hTname,
                })}>{fixture.hTname} {fixture.hScore}</td>
                <td>vs</td>
                <td className={bem('team', {
                  away: true,
                  'my-team': gameWeek.club === fixture.aTname,
                })}>{fixture.aScore} {fixture.aTname}</td>
                {keysAsCells(statsToKeys(fixture.stats))}
                <td>{(calculatePoints({ stats: statsToKeys(fixture.stats), pos: position }).total)}</td>
              </tr>
            ))
          ))
        }
        <tr>
          <th colSpan={5} />
          {keysAsCells({ ...season, points: total })}
        </tr>
      </tbody>
    </table>
  </div>
);

PositionTimelineTable.propTypes = {
  position: PropTypes.string.isRequired,
  season: PropTypes.object.isRequired,
  gameWeeks: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
};

export default PositionTimelineTable;
