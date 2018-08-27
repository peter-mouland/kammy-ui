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

class LeagueOnePlayersPage extends React.Component {
  render() {
    const { players } = this.props;

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

LeagueOnePlayersPage.propTypes = {
  players: PropTypes.object,
};

LeagueOnePlayersPage.defaultProps = {
  players: {},
};

export default LeagueOnePlayersPage;
