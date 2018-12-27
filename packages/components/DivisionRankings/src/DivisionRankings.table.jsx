import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import positions from './lib/positions';

import './division-rankings.scss';

const DivisionRankingsTable = ({
  rank, points, type, handleRowHover,
}) => (
  <table className='table'>
    <thead>
      <tr className='row row--header'>
        <th className={'cell cell--team-manager'}></th>
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
          <tr key={manager} className={'row'} onMouseEnter={() => handleRowHover(manager)} onMouseLeave={() => handleRowHover(manager)}>
            <td className='cell cell--manager'>{manager}</td>
            {positions.map((position) => {
              const gradient = `gradient_${parseInt(rank[position.label][manager], 10).toString().replace('.', '-')}`;
              return (
                <Fragment key={position.label}>
                  <td className={`cell cell--${position.key} ${gradient}`}>
                    { rank[position.label][manager] }
                  </td>
                  <td className={`cell cell--pair cell--${position.key} ${gradient}`}>
                    { pos[position.label][type] }
                  </td>
                </Fragment>
              );
            })}
            <td className={'cell cell--total'}>{ rank.total[manager] }</td>
            <td className={'cell cell--pair cell--total'}>{ pos.total[type] }</td>
          </tr>
        ))}
    </tbody>
  </table>
);

DivisionRankingsTable.propTypes = {
  handleRowHover: PropTypes.func,
  rank: PropTypes.object,
  points: PropTypes.array,
  type: PropTypes.oneOf(['season', 'gameWeek']).isRequired,
};

DivisionRankingsTable.defaultProps = {
  handleRowHover: () => {},
  rank: {},
  points: [],
};

export default DivisionRankingsTable;
