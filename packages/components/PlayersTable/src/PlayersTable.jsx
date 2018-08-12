import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';
import Svg from '@kammy-ui/svg';
import sortColumns, { SortIcon, SortDownIcon, SortUpIcon } from '@kammy-ui/sort-columns';

import New from './new.svg';

const bem = bemHelper({ block: 'table' });

const isSortUp = (sort, id) => sort.includes(id);
const isSortDown = (sort, id) => sort.includes(`-${id}`);
const isNotSorted = (sort, id) => !isSortUp(sort, id) && !isSortDown(sort, id);

const SortableHeader = ({
  id, label, sort, handleSort, className = '',
}) => (
  <th className={`cell cell--${id} ${className}`}>
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
  className: PropTypes.func,
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
      players, visibleStats, additionalColumns, hiddenColumns, myTeam, positions,
    } = this.props;
    const { sort } = this.state;
    return (
      <table className={'table'}>
        <thead>
          <tr className={'row row--header'}>
            { !hiddenColumns.includes('isHidden') && <th className='cell cell--hidden'>isHidden</th>}
            { !hiddenColumns.includes('new') && <th className='cell cell--new'>New</th>}
            { !hiddenColumns.includes('code') && <th className='cell cell--code'>Code</th>}
            <SortableHeader id={'pos'} label={'Position'} sort={sort} handleSort={this.handleSort} />
            <SortableHeader id={'name'} label={'Player'} sort={sort} handleSort={this.handleSort} />
            <SortableHeader id={'club'} label={'Club'} sort={sort} handleSort={this.handleSort} />
            { !hiddenColumns.includes('value') && (
              <SortableHeader id={'value'} label={'Value'} sort={sort} handleSort={this.handleSort} />
            )}
            { additionalColumns.map((col) => (<th key={col} className={`cell cell--${col}`} >{col}</th>))}
            { visibleStats.map((stat) => (
              <SortableHeader id={`season.${stat}`} label={stat} key={stat} sort={sort} handleSort={this.handleSort} className={'cell--stat'} />
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
                  <tr key={player.code} id={player.code} className={ bem('player', { selected: isOnMyTeam, new: !!player.new }, 'row')}>
                    { !hiddenColumns.includes('isHidden') && (<td className={'cell'}>{ player.isHidden && 'hidden' }</td>) }
                    { !hiddenColumns.includes('new') && (
                      <td className={'cell'}>
                        { player.new && <Svg className={ bem('new-icon')}>{New}</Svg> }
                        { player.new && <span className="sr-only">new</span> }
                      </td>
                    )}
                    { !hiddenColumns.includes('code') && <td className={'cell'}>{ player.code }</td> }
                    <td className={'cell'}>
                      { player.pos }
                    </td>
                    <td className={'cell'}>
                      <a href="#" >{ player.name }</a>
                    </td>
                    <td className={'cell'}>
                      <small>{ player.club }</small>
                    </td>
                    { !hiddenColumns.includes('value') && <td className={'cell'}>{ player.value }</td> }
                    { additionalColumns.map((col) => (
                      <td key={col} className={ bem('stat', null, 'cell')}>
                        {String(player[col])}
                      </td>
                    ))}
                    { visibleStats.map((stat) => (
                      <td key={stat} className={ bem('stat', null, 'cell')}>
                        {player.season && player.season[stat]}
                      </td>
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
  visibleStats: PropTypes.array,
  hiddenColumns: PropTypes.arrayOf(PropTypes.string),
  additionalColumns: PropTypes.arrayOf(PropTypes.string),
  myTeam: PropTypes.object,
};

PlayerTable.defaultProps = {
  myTeam: null,
  hiddenColumns: [],
  visibleStats: [],
  additionalColumns: [],
};

export default PlayerTable;
