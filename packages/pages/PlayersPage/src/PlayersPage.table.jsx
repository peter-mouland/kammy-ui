import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import bemHelper from '@kammy-ui/bem';
import PlayersFilters from '@kammy-ui/players-table/src/PlayersFilters';
import PlayersTable from '@kammy-ui/players-table/src/PlayersTable';

const bem = bemHelper({ block: 'players-page-table' });

const positions = ['GK', 'CB', 'FB', 'MID', 'AM', 'STR'];

class PlayersPageTable extends React.Component {
  render() {
    const { players } = this.props;
    const mismatchFilter = (player) => (
      (player.skySportsClub !== player.club || !player.pos)
    );

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
                editable
                positions={positions}
                players={playersFiltered}
                additionalColumns={['skySportsPosition', 'skySportsClub', 'isHidden']}
                visibleColumns={[]}
              />
            )}
          </PlayersFilters>

          <h4>Todo:hookup button</h4>
          <p>
            <button className={'warning'}>Update the DataBase</button>
          </p>
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
