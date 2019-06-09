import React from 'react';
import PropTypes from 'prop-types';

import bemHelper from '@kammy-ui/bem';
import DivisionRankings from '@kammy-ui/division-rankings';
import Interstitial from '@kammy-ui/interstitial';
import GameWeekDate from '@kammy-ui/game-week-date';
import GameWeekFixtures from '@kammy-ui/game-week-fixtures';
import Modal from '@kammy-ui/modal';

import './styles.scss';

const bem = bemHelper({ block: 'home-page' });

class Homepage extends React.Component {
  state = {
    showTransfers: false,
  }

  componentDidMount() {
    const {
      fetchAllPlayerData, fetchGameWeeks, playersLoaded, gameWeeksLoaded,
    } = this.props;
    if (!playersLoaded) fetchAllPlayerData();
    if (!gameWeeksLoaded) fetchGameWeeks();
  }

  showFixtures = (gameWeekFixtures) => {
    this.setState({ showTransfers: true, gameWeekFixtures });
  }

  render() {
    const { loaded, gameWeeks: { currentGameWeekDates, nextGameWeekDates, prevGameWeekDates } } = this.props;
    const { showTransfers, gameWeekFixtures } = this.state;
    if (!loaded) return <Interstitial message='Data Gathering...'/>;
    return (
      <section id="home-page" className={bem()} >
        <div className='homepage-dates'>
          <div className={'homepage__prev-date'}>{
            prevGameWeekDates && (
              <a onClick={() => this.showFixtures(prevGameWeekDates)}>
                <GameWeekDate
                  gameWeek={prevGameWeekDates}
                  calStart={`
                      GW${prevGameWeekDates.gameWeek}
                  `}
                  showEnd={false}
                  showStartTime={false}
                />
              </a>
            )}
          </div>
          <div className={'homepage__gw-date'}>
            <a onClick={() => this.showFixtures(currentGameWeekDates)}>
              <GameWeekDate gameWeek={currentGameWeekDates} label={`
                Current: GW${currentGameWeekDates.gameWeek}
              `}/>
            </a>
          </div>
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
        <Modal
          id={'GameWeekFixtures'}
          title={`GW${gameWeekFixtures && gameWeekFixtures.gameWeek} Fixtures`}
          open={showTransfers}
          onClose={() => this.setState({ showTransfers: false })}
        >
          <GameWeekFixtures {...gameWeekFixtures} />
        </Modal>
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
