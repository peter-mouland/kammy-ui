import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import positions from './lib/positions';

const DivisionRankingsTable = ({ rank, points, type }) => (
  <table className='table'>
    <thead>
      <tr className='row row--header'>
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
      {points
        .sort((managerA, managerB) => rank.total[managerB.manager] - rank.total[managerA.manager])
        .map(({ manager, points: pos }) => (
          <tr key={manager} className={'row'}>
            <td>{manager}</td>
            {positions.map((position) => (
              <Fragment key={position.label}>
                <td className={`cell cell--${position.key}`}>
                  { rank[position.label][manager] }
                </td>
                <td className={`cell cell--pair cell--${position.key}`}>
                  { pos[position.label][type] }
                </td>
              </Fragment>
            ))}
            <td className={'cell cell--total'}>{ rank.total[manager] }</td>
            <td className={'cell cell--pair cell--total'}>{ pos.total[type] }</td>
          </tr>
        ))}
    </tbody>
  </table>
);

DivisionRankingsTable.propTypes = {
  rank: PropTypes.object,
  points: PropTypes.array,
  type: PropTypes.oneOf(['season', 'gameWeek']).isRequired,
};

DivisionRankingsTable.defaultProps = {
  rank: {},
  points: [],
};

export default DivisionRankingsTable;
