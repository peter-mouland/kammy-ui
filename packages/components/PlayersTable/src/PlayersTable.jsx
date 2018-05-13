import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';
import Selector from '@kammy-ui/select';
import Svg from '@kammy-ui/svg';

import New from './new.svg';

import './players-table.scss';

const bem = bemHelper({ block: 'player-table' });
const POSITIONS = ['GK', 'CB', 'FB', 'MID', 'AM', 'STR'];

const extremeStat = (int) => int < -10 || int > 10;

const Cell = ({
  editable, showEditor, options, value, previousValue,
}) => {
  if (!editable) return value;
  return (
    <div >
      {showEditor && (
        <Selector
          onChange={ () => {} }
          defaultValue={ value }
          options={ options }
        />
      )}
      {previousValue && value !== previousValue && (
        <em { ...bem(null, null, ['text--warning', 'editable'])}>{value}</em>
      )}
      {(!previousValue || value === previousValue) && (
        <span className='editable' >{value}</span>
      )}
    </div>
  );
};

Cell.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  editable: PropTypes.bool,
  showEditor: PropTypes.bool,
  previousValue: PropTypes.string,
};

Cell.defaultProps = {
  editable: false,
  showEditor: false,
  previousValue: null,
};

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

AdditionalPoints.propTypes = {
  children: PropTypes.number.isRequired,
};

const PlayerTable = ({
  players, visibleColumns, additionalColumns, editable, myTeam,
}) => (
  <table className={ bem() }>
    <thead>
      <tr className={ bem('data-header')}>
        <th className={ bem('meta', 'new')}>New</th>
        <th className={ bem('meta', 'code')}>Code</th>
        <th className={ bem('meta', 'pos')}>Position</th>
        <th className={ bem('meta', 'player')}>Player</th>
        <th className={ bem('meta', 'club')}>Club</th>
        { additionalColumns.map((col) => [
          <td key={col} className={ bem('meta', 'stat')} >{col}</td>,
        ])}
        { visibleColumns.map((stat) => [
          <td key={stat} className={ bem('meta', 'stat')} >{stat}</td>,
          <td key={`${stat}-gw`} className={ bem('meta', 'stat')} ><sup>(gw)</sup></td>,
        ])}
      </tr>
    </thead>
    <tbody>
      {
        players
          .map((player) => {
            const isOnMyTeam = myTeam && myTeam[player.code];
            return (
              <tr key={player.code} id={player.code} className={ bem('player', { selected: isOnMyTeam, new: !!player.new })}>
                <td>
                  { player.new && <Svg className={ bem('new-icon')}>{New}</Svg> }
                  { player.new && <span className="sr-only">new</span> }
                </td>
                <td>
                  { player.code }
                </td>
                <td>
                  <Cell
                    { ...{
                      editable, value: player.pos, options: POSITIONS,
                    } }
                  />
                </td>
                <td>
                  <a href="#" >{ player.name }</a>
                </td>
                <td>
                  <small>{ player.club }</small>
                </td>
                { additionalColumns.map((col) => (
                  <td key={col} className={ bem('stat')}>
                    {String(player[col])}
                  </td>
                ))}
                { visibleColumns.map((stat) => [
                  <td key={stat} className={ bem('stat')}>
                    {player.season[stat]}
                  </td>,
                  <td key={`${stat}-gw`} className={ bem('stat')}>
                    { player.gameWeek[stat]
                      ? (
                        <AdditionalPoints className={ bem('additional', { highlight: extremeStat(player.gameWeek[stat]) })}>
                          {player.gameWeek[stat]}
                        </AdditionalPoints>
                      )
                      : null
                    }
                  </td>,
                ])}
              </tr>
            );
          })
      }
    </tbody>
  </table>
);

PlayerTable.propTypes = {
  players: PropTypes.array.isRequired,
  visibleColumns: PropTypes.array,
  additionalColumns: PropTypes.array,
  editable: PropTypes.bool,
  myTeam: PropTypes.object,
};

PlayerTable.defaultProps = {
  myTeam: null,
  visibleColumns: [],
  editable: false,
  additionalColumns: [],
};

export default PlayerTable;
