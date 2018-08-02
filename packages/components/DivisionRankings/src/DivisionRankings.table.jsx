import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import positions from './lib/positions';

import './divisions-rankings.scss';

const DivisionRankingsTable = ({ divisionRank, divisionPoints }) => (
  <table>
    <thead>
      <tr>
        <th className={'cell cell--team-manager'}>Manager</th>
        {
          positions.map((position) => (
            <th
              key={position.label}
              colSpan={2}
              className={'cell cell--team-season'}
            >
              {position.label}
            </th>
          ))
        }
        <th
          colSpan={2}
          className={'cell cell--team-season'}
        >
          Total
        </th>
      </tr>
    </thead>
    <tbody>
      {divisionPoints
        .map(({ manager, points }) => (
          <tr key={manager}>
            <td>{manager}</td>
            {positions.map((position) => (
              <Fragment key={position.label}>
                <td className={`cell cell--${position.key}`}>
                  { divisionRank.gameWeek[position.label][manager] }
                </td>
                <td className={`cell cell--pair cell--${position.key}`}>
                  { points[position.label].gameWeek }
                </td>
              </Fragment>
            ))}
            <td>{ divisionRank.gameWeek.total[manager] }</td>
            <td>{ points.total.gameWeek }</td>
          </tr>
        ))}
    </tbody>
  </table>
);

DivisionRankingsTable.propTypes = {
  divisionRank: PropTypes.object,
  divisionPoints: PropTypes.array,
};

DivisionRankingsTable.defaultProps = {
  divisionRank: {},
  divisionPoints: [],
};

export default DivisionRankingsTable;
