import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';
import { calculatePoints } from '@kammy-ui/data-player-stats';

import { keysAsCellHeaders, keysAsCells } from '../lib/tableHelpers';
import statsToKeys from '../lib/extract-ff-stats';
import './positionTimeline.scss';

const bem = bemHelper({ block: 'position-timeline' });

const PositionTimelineTable = ({ positionGameWeeks, positionSeason, position }) => (
  <div>
    <table>
      <tbody>
        <tr>
          <th colSpan={4} />
          {keysAsCellHeaders(positionGameWeeks[0].points)}
        </tr>
        {
          positionGameWeeks.map((gameWeek, gw) => (
            gameWeek.fixturesWithinTeam.map((fixture, i) => (
              <tr key={`${fixture.event}`}>
                <th>{i === 0 && (gw + 1)}</th>
                <td className={bem('team', {
                  home: true,
                  'my-team': gameWeek.club === fixture.hTname,
                })}>{fixture.hTname} {fixture.hScore}</td>
                <td>vs</td>
                <td className={bem('team', {
                  away: true,
                  'my-team': gameWeek.club === fixture.aTname,
                })}>{fixture.aScore} {fixture.aTname}</td>
                {keysAsCells(calculatePoints({ stats: statsToKeys(fixture.stats), pos: position }))}
              </tr>
            ))
          ))
        }
        <tr>
          <th colSpan={4} />
          {keysAsCells(positionSeason)}
        </tr>
      </tbody>
    </table>
  </div>
);

PositionTimelineTable.propTypes = {
  position: PropTypes.string.isRequired,
  positionSeason: PropTypes.object.isRequired,
  positionGameWeeks: PropTypes.array.isRequired,
};

export default PositionTimelineTable;
