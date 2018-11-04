import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import '@kammy-ui/bootstrap';
import Interstitial from '@kammy-ui/interstitial';
import bemHelper from '@kammy-ui/bem';

const bem = bemHelper({ block: 'division-stats' });

class Cup extends React.Component {
  componentDidMount() {
    const { draftCupLoaded, fetchCup } = this.props;
    if (!draftCupLoaded) fetchCup();
  }

  render() {
    const { draftCupLoaded, draftCup } = this.props;
    return (
      <section id="cup-page" className={bem()}>
        <h1>Draft Cup</h1>
        {!draftCupLoaded && (
          <Fragment>
            <Interstitial /> Data Gathering...
          </Fragment>
        )}
        <table className={'table'}>
          <thead>
            <tr className={'row'}>
              <th className={'cell'}>Round</th>
              <th className={'cell'}>Group</th>
              <th className={'cell'}>Manager</th>
              <th className={'cell'}>player1</th>
              <th className={'cell'}>player2</th>
              <th className={'cell'}>player3</th>
              <th className={'cell'}>player4</th>
            </tr>
          </thead>
          <tbody>
            {
              draftCup.map((team) => (
                <tr key={`${team.group}-${team.round}-${team.manager}`} className={'row'}>
                  <td className={'cell'}>{team.round}</td>
                  <td className={'cell'}>{team.group}</td>
                  <td className={'cell'}>{team.manager}</td>
                  <td className={'cell'}>{team.player1}</td>
                  <td className={'cell'}>{team.player2}</td>
                  <td className={'cell'}>{team.player3}</td>
                  <td className={'cell'}>{team.player4}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    );
  }
}

Cup.propTypes = {
  draftCupLoaded: PropTypes.bool,
  draftCup: PropTypes.arrayOf(PropTypes.shape({
    round: PropTypes.number,
    group: PropTypes.string,
    manager: PropTypes.string,
    player1: PropTypes.string,
    player2: PropTypes.string,
    player3: PropTypes.string,
    player4: PropTypes.string,
  })),
  fetchCup: PropTypes.func.isRequired,
};

Cup.defaultProps = {
  draftCupLoaded: false,
  draftCup: [],
};

export default Cup;
