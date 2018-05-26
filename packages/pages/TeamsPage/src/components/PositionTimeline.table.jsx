import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';

import { keysAsCellHeaders, keysAsCells } from '../components/tableHelpers';
import './positionTimeline.scss';

const bem = bemHelper({ block: 'position-timeline' });

const PositionTimelineTable = ({
  gameWeeks, season, total,
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
                {keysAsCells(fixture.stats)}
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
