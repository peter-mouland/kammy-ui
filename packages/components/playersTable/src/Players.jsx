import React from 'react';
import PropTypes from 'prop-types';

import PlayersFilters from './PlayersFilters';
import PlayersTable from './PlayersTable';

class Players extends React.Component {
  render() {
    const { players, positions, visibleColumns } = this.props;
    return (
      <div>
        <PlayersFilters
          players={players}
          positions={positions}
        >
          {(playersFiltered) => (
            <PlayersTable
              positions={positions}
              players={playersFiltered}
              visibleColumns={visibleColumns}
              onPlayerClick={this.setShowFixtures}
            />
          )}
        </PlayersFilters>
      </div>
    );
  }
}

Players.propTypes = {
  players: PropTypes.array.isRequired,
  visibleColumns: PropTypes.array.isRequired,
  positions: PropTypes.array.isRequired,
  myTeam: PropTypes.object,
};

Players.defaultProps = {
  myTeam: {},
};

export default Players;
