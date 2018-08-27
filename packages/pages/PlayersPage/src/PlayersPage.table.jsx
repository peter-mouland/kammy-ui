import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import bemHelper from '@kammy-ui/bem';
import { PlayersFilters, PlayersTable } from '@kammy-ui/players-table';

const bem = bemHelper({ block: 'players-page-table' });

const positions = ['GK', 'CB', 'FB', 'MID', 'AM', 'STR'];
const hiddenColumns = ['new', 'isHidden', 'value'];
const visibleStats = [
  'apps', 'subs', 'gls', 'asts', 'cs', 'con', 'pensv', 'sb', 'tb', 'ycard', 'rcard', 'points',
];

class PlayersPageTable extends React.Component {
  render() {
    const { players, disabledPlayers } = this.props;

    return (
      <section id="players-page" className={bem()}>
        <div className="page-content">
          <PlayersFilters
            players={Object.values(players)}
            positions={positions}
          >
            {(playersFiltered) => (
              <PlayersTable
                positions={positions}
                players={playersFiltered}
                disabledPlayers={disabledPlayers}
                hiddenColumns={hiddenColumns}
                visibleStats={visibleStats}
              />
            )}
          </PlayersFilters>
        </div>
      </section>
    );
  }
}

PlayersPageTable.propTypes = {
  players: PropTypes.object,
  disabledPlayers: PropTypes.object,
};

PlayersPageTable.defaultProps = {
  players: {},
  disabledPlayers: {},
};

export default PlayersPageTable;
