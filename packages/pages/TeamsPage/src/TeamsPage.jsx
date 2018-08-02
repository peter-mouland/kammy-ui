import React from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';
import DivisionStats from '@kammy-ui/division-stats';
import MultiToggle from '@kammy-ui/multi-toggle';

const bem = bemHelper({ block: 'teams-page' });

class TeamsPage extends React.Component {
  state = { }

  componentDidMount() {
    const {
      fetchDbPlayers, fetchPremierLeague, fetchChampionship, fetchLeagueOne, fetchTransfers, fetchGameWeeks,
      playersLoaded, premierLeagueLoaded, championshipLoaded, leagueOneLoaded, transfersLoaded, gameWeeksLoaded,
    } = this.props;
    if (!playersLoaded) fetchDbPlayers();
    if (!premierLeagueLoaded) fetchPremierLeague();
    if (!championshipLoaded) fetchChampionship();
    if (!leagueOneLoaded) fetchLeagueOne();
    if (!transfersLoaded) fetchTransfers();
    if (!gameWeeksLoaded) fetchGameWeeks();
  }

  updateDivision = (division) => {
    const { divisionSheets } = this.context.appConfig;
    const teams = this.props[divisionSheets[division]];
    this.setState({ division, teams });
  };

  render() {
    const {
      loaded,
      playersLoading, playersCount,
      premierLeagueLoading, premierLeagueCount,
      championshipLoading, championshipCount,
      leagueOneLoading, leagueOneCount,
      gameWeeksLoading, gameWeeksCount,
      transfersLoading, transfersCount,
    } = this.props;
    const { division, teams } = this.state;
    const { divisionLabels, divisionSheets } = this.context.appConfig;
    return (
      <section id="teams-page" className={bem(null, 'page-content')}>
        <h1>Teams</h1>
        <p>
          The purpose of this page is to display the Managers Team stats, by GameWeel.
        </p>
        <p>
          Combining the SkySport stats with the Spreadsheet Team Sheet we can output GameWeek Score and Season Score
        </p>
        <p>
          Players :
          {playersLoading ? <Interstitial /> : playersCount}
        </p>
        <p>
          GameWeeks :
          {gameWeeksLoading ? <Interstitial /> : gameWeeksCount}
        </p>
        <p>
          Transfers :
          {transfersLoading ? <Interstitial /> : transfersCount}
        </p>
        <p>
          PremierLeague Teams :
          {premierLeagueLoading ? <Interstitial /> : premierLeagueCount}
        </p>
        <p>
          Championship Teams :
          {championshipLoading ? <Interstitial /> : championshipCount}
        </p>
        <p>
          League One Teams :
          {leagueOneLoading ? <Interstitial /> : leagueOneCount}
        </p>
        {
          loaded && (
            <MultiToggle
              label={'Division'}
              id={'division'}
              options={divisionLabels}
              checked={division}
              onChange={this.updateDivision}
            />
          )
        }
        {
          loaded && teams && (
            <DivisionStats
              label={division}
              divisionId={divisionSheets[division]}
            />
          )
        }
      </section>
    );
  }
}

TeamsPage.propTypes = {
  loaded: PropTypes.bool,
  players: PropTypes.object,
  transfers: PropTypes.object,
  gameWeeks: PropTypes.array,
  premierLeague: PropTypes.object,
  championship: PropTypes.object,
  leagueOne: PropTypes.object,

  fetchDbPlayers: PropTypes.func.isRequired,
  fetchGameWeeks: PropTypes.func.isRequired,
  fetchTransfers: PropTypes.func.isRequired,
  fetchPremierLeague: PropTypes.func.isRequired,
  fetchChampionship: PropTypes.func.isRequired,
  fetchLeagueOne: PropTypes.func.isRequired,

  playersLoading: PropTypes.bool,
  gameWeeksLoading: PropTypes.bool,
  transfersLoading: PropTypes.bool,
  premierLeagueLoading: PropTypes.bool,
  championshipLoading: PropTypes.bool,
  leagueOneLoading: PropTypes.bool,

  playersLoaded: PropTypes.bool,
  gameWeeksLoaded: PropTypes.bool,
  transfersLoaded: PropTypes.bool,
  premierLeagueLoaded: PropTypes.bool,
  championshipLoaded: PropTypes.bool,
  leagueOneLoaded: PropTypes.bool,

  playersCount: PropTypes.number,
  gameWeeksCount: PropTypes.number,
  transfersCount: PropTypes.number,
  premierLeagueCount: PropTypes.number,
  championshipCount: PropTypes.number,
  leagueOneCount: PropTypes.number,
};

TeamsPage.defaultProps = {
  loaded: false,
  playersLoading: false,
  gameWeeksLoading: false,
  transfersLoading: false,
  premierLeagueLoading: false,
  championshipLoading: false,
  leagueOneLoading: false,
  playersLoaded: false,
  gameWeeksLoaded: false,
  transfersLoaded: false,
  teamsLoaded: false,
  transfers: {},
  Players: {},
  PlayersCount: null,
  gameWeeks: [],
  gameWeeksCount: null,
  transfersCount: null,
  premierLeague: {},
  premierLeagueCount: null,
  championship: {},
  championshipCount: null,
  leagueOne: {},
  leagueOneCount: null,
};

TeamsPage.contextTypes = {
  appConfig: PropTypes.object,
};

export default TeamsPage;
