import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';
import Svg from '@kammy-ui/svg';
import sortColumns, { SortIcon, SortDownIcon, SortUpIcon } from '@kammy-ui/sort-columns';

import New from './new.svg';

import './players-table.scss';

const bem = bemHelper({ block: 'player-table' });

const extremeStat = (int) => int < -10 || int > 10;

function AdditionalPoints({ children: points }) {
  return (
    <sup className={ bem('additional-point')}>
      {
        points > 0
          ? <span className="text--success">{points}</span>
          : <span className="text--error">{points}</span>
      }
    </sup>
  );
}

const isSortUp = (sort, id) => sort.includes(id);
const isSortDown = (sort, id) => sort.includes(`-${id}`);
const isNotSorted = (sort, id) => !isSortUp(sort, id) && !isSortDown(sort, id);

const SortableHeader = ({
  id, label, sort, handleSort,
}) => (
  <th className={ bem('meta', id) }>
    <a className={ bem('sort-link') } onClick={() => handleSort(id)}>
      {isSortUp(sort, id) && <Svg className={ bem('sort-icon', 'selected')}>{SortUpIcon}</Svg>}
      {isSortDown(sort, id) && <Svg className={ bem('sort-icon', 'selected')}>{SortDownIcon}</Svg>}
      {isNotSorted(sort, id) && <Svg className={ bem('sort-icon') }>{SortIcon}</Svg>}
      <span className={ bem('label') }>{label}</span>
    </a>
  </th>
);

SortableHeader.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  sort: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSort: PropTypes.func.isRequired,
};

AdditionalPoints.propTypes = {
  children: PropTypes.number.isRequired,
};

class PlayerTable extends React.Component {
  state = {
    sort: [],
  }

  handleSort = (column) => {
    const { sort } = this.state;
    switch (true) {
    case isSortUp(sort, column): return this.setState({ sort: [`-${column}`] });
    case isSortDown(sort, column): return this.setState({ sort: [] });
    case isNotSorted(sort, column):
    default: return this.setState({ sort: [column] });
    }
  }

  render() {
    const {
      players, visibleColumns, additionalColumns, myTeam, positions,
    } = this.props;
    const { sort } = this.state;
    return (
      <table className={ bem() }>
        <thead>
          <tr className={ bem('data-header')}>
            <th className={ bem('meta', 'isHidden')}>isHidden</th>
            <th className={ bem('meta', 'new')}>New</th>
            <th className={ bem('meta', 'code')}>Code</th>
            <SortableHeader id={'pos'} label={'Position'} sort={sort} handleSort={this.handleSort} />
            <SortableHeader id={'name'} label={'Player'} sort={sort} handleSort={this.handleSort} />
            <SortableHeader id={'club'} label={'Club'} sort={sort} handleSort={this.handleSort} />
            <SortableHeader id={'value'} label={'Value'} sort={sort} handleSort={this.handleSort} />
            { additionalColumns.map((col) => (<td key={col} className={ bem('meta', 'stat')} >{col}</td>))}
            { visibleColumns.map((stat) => (
              <Fragment key={stat}>
                <td className={ bem('meta', 'stat')} >{stat}</td>
                <td className={ bem('meta', 'stat')} ><sup>(gw)</sup></td>
              </Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            players
              .sort(sortColumns(sort.concat(['pos', 'name']), { pos: positions }))
              .map((player) => {
                const isOnMyTeam = myTeam && myTeam[player.code];
                return (
                  <tr key={player.code} id={player.code} className={ bem('player', { selected: isOnMyTeam, new: !!player.new })}>
                    <td>
                      { player.isHidden && 'hidden' }
                    </td>
                    <td>
                      { player.new && <Svg className={ bem('new-icon')}>{New}</Svg> }
                      { player.new && <span className="sr-only">new</span> }
                    </td>
                    <td>
                      { player.code }
                    </td>
                    <td>
                      { player.pos }
                    </td>
                    <td>
                      <a href="#" >{ player.name }</a>
                    </td>
                    <td>
                      <small>{ player.club }</small>
                    </td>
                    <td>
                      { player.value }
                    </td>
                    { additionalColumns.map((col) => (
                      <td key={col} className={ bem('stat')}>
                        {String(player[col])}
                      </td>
                    ))}
                    { visibleColumns.map((stat) => (
                      <Fragment key={stat}>
                        <td className={ bem('stat')}>
                          {player.season[stat]}
                        </td>
                        <td className={ bem('stat')}>
                          { player.gameWeek[stat]
                            ? (
                              <AdditionalPoints className={ bem('additional', { highlight: extremeStat(player.gameWeek[stat]) })}>
                                {player.gameWeek[stat]}
                              </AdditionalPoints>
                            )
                            : null
                          }
                        </td>
                      </Fragment>
                    ))}
                  </tr>
                );
              })
          }
        </tbody>
      </table>
    );
  }
}

PlayerTable.propTypes = {
  players: PropTypes.array.isRequired,
  positions: PropTypes.array.isRequired,
  visibleColumns: PropTypes.array,
  additionalColumns: PropTypes.array,
  myTeam: PropTypes.object,
};

PlayerTable.defaultProps = {
  myTeam: null,
  visibleColumns: [],
  additionalColumns: [],
};

export default PlayerTable;
