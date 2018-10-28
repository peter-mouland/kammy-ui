import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';

const bem = bemHelper({ block: 'division-stats' });

class Cup extends React.Component {
  state = { }

  componentDidMount() {
    const { cupLoaded, fetchCup } = this.props;
    if (!cupLoaded) fetchCup();
  }

  render() {
    const {
      cupLoaded, cupGroups, label = 'Cup', groups, rounds,
    } = this.props;

    return (
      <section id="cup-page" className={bem()}>
        <h1>{label}</h1>
        {!cupLoaded && (
          <Fragment>
            <Interstitial /> Data Gathering...
          </Fragment>
        )}
        <table className={'table'}>
          {
            rounds.map((round) => (
              <Fragment key={`${round}`}>
                <tr className={'row'}>
                  <th className={'cell'} colSpan={11}>Round {round}</th>
                </tr>
                {
                  groups.map((group) => (
                    <Fragment key={`${group}-${round}`} >
                      <tr className={'row'}>
                        <th className={'cell'} colSpan={11}>{group}</th>
                      </tr>
                      <tr className={'row'}>
                        <th className={'cell'}>Manager</th>
                        <th colSpan={2} className={'cell'}>player1</th>
                        <th colSpan={2} className={'cell'}>player2</th>
                        <th colSpan={2} className={'cell'}>player3</th>
                        <th colSpan={2} className={'cell'}>player4</th>
                        <th className={'cell'}>Points</th>
                        <th className={'cell'}>Rank</th>
                      </tr>
                      {
                        cupGroups[group]
                          .filter((team) => team.round === round)
                          .map((team) => (
                            <tr key={`${group}-${round}-${team.manager}`} className={'row'}>
                              <td className={'cell'}>{team.manager}</td>
                              <td className={'cell'}>{team.player1.name}</td>
                              <td className={'cell'}>{team.player1.points}</td>
                              <td className={'cell'}>{team.player2.name}</td>
                              <td className={'cell'}>{team.player2.points}</td>
                              <td className={'cell'}>{team.player3.name}</td>
                              <td className={'cell'}>{team.player3.points}</td>
                              <td className={'cell'}>{team.player4.name}</td>
                              <td className={'cell'}>{team.player4.points}</td>
                              <td className={'cell'}>{team.points}</td>
                              <td className={'cell'}>{team.rank}</td>
                            </tr>
                          ))
                      }
                    </Fragment>
                  ))
                }
              </Fragment>
            ))
          }
        </table>
      </section>
    );
  }
}

Cup.propTypes = {
  cupLoaded: PropTypes.bool,
  cupGroups: PropTypes.object,
  label: PropTypes.string,
  fetchCup: PropTypes.func.isRequired,
  managers: PropTypes.arrayOf(PropTypes.string),
  groups: PropTypes.arrayOf(PropTypes.string),
  rounds: PropTypes.arrayOf(PropTypes.string),
};

Cup.defaultProps = {
  label: 'Cup',
  cupLoaded: false,
  managers: [],
  groups: [],
  rounds: [],
};

Cup.contextTypes = {
  appConfig: PropTypes.object,
};

export default Cup;
