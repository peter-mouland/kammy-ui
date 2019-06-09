import React from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy-ui/bem';
import DivisionRankings from '@kammy-ui/division-rankings';
import Interstitial from '@kammy-ui/interstitial';
import GameWeekDate from '@kammy-ui/game-week-date';

import './styles.scss';

const bem = bemHelper({ block: 'home-page' });

class Homepage extends React.Component {
  componentDidMount() {
    const {
      fetchAllPlayerData, fetchGameWeeks, playersLoaded, gameWeeksLoaded,
    } = this.props;
    if (!playersLoaded) fetchAllPlayerData();
    if (!gameWeeksLoaded) fetchGameWeeks();
  }

  render() {
    const { loaded, gameWeeks: { currentGameWeekDates, nextGameWeekDates, prevGameWeekDates } } = this.props;
    if (!loaded) return <Interstitial message='Data Gathering...'/>;
    return (
      <section id="home-page" className={bem()} >
        <div className='homepage-dates'>
          <div className={'homepage__prev-date'}>{
            prevGameWeekDates && (
              <GameWeekDate
                gameWeek={prevGameWeekDates}
                calStart={`GW${prevGameWeekDates.gameWeek}`}
                showEnd={false}
                showStartTime={false}
              />
            )}
          </div>
          <div className={'homepage__gw-date'}><GameWeekDate gameWeek={currentGameWeekDates} label={`Current: GW${currentGameWeekDates.gameWeek}`}/></div>
          <div className={'homepage__next-date'}>{
            nextGameWeekDates ? (
              <GameWeekDate
                gameWeek={nextGameWeekDates}
                calEnd={`GW${nextGameWeekDates.gameWeek}`}
                showStart={false}
                showEndTime={false}
              />
            )
              : (
                <GameWeekDate
                  gameWeek={currentGameWeekDates}
                  calEnd={'fin.'}
                  showStart={false}
                  showEndTime={false}
                />
              )}
          </div>
        </div>
        <DivisionRankings
          label={'Premier League'}
          divisionId={'premierLeague'}
          showGameWeekSwitcher={false}
          showChart={false}
          showWeekly={false}
        />
        <DivisionRankings
          label={'Championship'}
          divisionId={'championship'}
          showGameWeekSwitcher={false}
          showChart={false}
          showWeekly={false}
        />
        <DivisionRankings
          label={'League One'}
          divisionId={'leagueOne'}
          showGameWeekSwitcher={false}
          showChart={false}
          showWeekly={false}
        />
      </section>
    );
  }
}

Homepage.propTypes = {
  fetchAllPlayerData: PropTypes.func,
  fetchGameWeeks: PropTypes.func,
  loaded: PropTypes.bool,
  playersLoaded: PropTypes.bool,
  gameWeeksLoaded: PropTypes.bool,
  gameWeeks: PropTypes.obj,
};

export default Homepage;
