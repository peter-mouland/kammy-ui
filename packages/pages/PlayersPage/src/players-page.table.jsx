/* eslint-disable react/no-deprecated */
import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import bemHelper from '@kammy-ui/bem';
import ErrorBoundary from '@kammy-ui/error-boundary';
import { PlayersFilters, PlayersTable } from '@kammy-ui/players-table';

const bemTable = bemHelper({ block: 'players-page-table' });

const positions = ['GK', 'CB', 'FB', 'MID', 'AM', 'STR'];
const hiddenColumns = ['new', 'isHidden', 'value', 'code'];
const visibleStats = [
  'points', 'apps', 'subs', 'gls', 'asts', 'cs', 'con', 'pensv', 'sb', 'tb', 'ycard', 'rcard',
];

const PlayersPageTable = ({
  players, disabledPlayers,
}) => (
  <ErrorBoundary>
    <section id="players-page" className={bemTable()}>
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
  </ErrorBoundary>
);

PlayersPageTable.propTypes = {
  players: PropTypes.object,
  disabledPlayers: PropTypes.object,
};

PlayersPageTable.defaultProps = {
  playersLoaded: false,
  disabledPlayers: {},
};

export default PlayersPageTable;
