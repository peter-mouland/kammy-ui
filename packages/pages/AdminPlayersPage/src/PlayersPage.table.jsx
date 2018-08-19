import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import bemHelper from '@kammy-ui/bem';
import { PlayersFilters, PlayersTable } from '@kammy-ui/players-table';

const bem = bemHelper({ block: 'players-page-table' });

const positions = ['GK', 'CB', 'FB', 'MID', 'AM', 'STR'];

class PlayersPageTable extends React.Component {
  render() {
    const { players } = this.props;
    const mismatchFilter = (player) => (!player.pos);

    return (
      <section id="players-page" className={bem()}>
        <div className="page-content">
          <PlayersFilters
            players={Object.values(players)}
            positions={positions}
            showNewToggle={true}
            showHiddenToggle={true}
            customFilter={{ fn: mismatchFilter, label: 'Show only mis-matches' }}
          >
            {(playersFiltered) => (
              <PlayersTable
                positions={positions}
                players={playersFiltered}
                additionalColumns={['skySportsPosition']}
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
};

PlayersPageTable.defaultProps = {
  players: {},
};

export default PlayersPageTable;
