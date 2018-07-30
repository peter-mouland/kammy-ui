import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import '@kammy-ui/bootstrap';
import bemHelper from '@kammy-ui/bem';
import Errors from '@kammy-ui/errors';
import Interstitial from '@kammy-ui/interstitial';
import MultiToggle from '@kammy-ui/multi-toggle';

import { positionMapping } from './lib/positions';

import './divisions-rankings.scss';

const bem = bemHelper({ block: 'divisions' });

function AdditionalPoints({ children: points }) {
  if (points === 0) {
    return null;
  }
  return (
    <span {...bem('additional-point')}>
      {
        points > 0
          ? <span className="text--success">+{points}</span>
          : <span className="text--error">{points}</span>
      }
    </span>
  );
}

AdditionalPoints.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default class DivisionsPage extends React.Component {
  state = {
    seasonOrGameWeek: 'Season',
  };

  static propTypes = {
    errors: PropTypes.array,
    loading: PropTypes.bool,
    divisions: PropTypes.array,
  };

  static defaultProps = {
    divisions: [],
    errors: [],
    loading: false,
  };

  toggleSeasonOrGameWeek = (e) => {
    this.setState({
      seasonOrGameWeek: e.target.value,
    });
  };

  render() {
    const { errors, loading, divisions } = this.props;
    const { seasonOrGameWeek } = this.state;
    const rank = seasonOrGameWeek === 'Season' ? 'seasonRank' : 'gameWeekRankChange';
    const points = seasonOrGameWeek === 'Season' ? 'season' : 'gameWeek';
    const positions = (Object.keys(positionMapping))
      .filter((pos) => !positionMapping[pos].hiddenFromManager);

    if (errors.length) {
      return <Errors errors={errors}/>;
    }
    if (loading || !divisions.length) {
      return <Interstitial/>;
    }

    return (
      <div {...bem()} id="division-ranking">
        <h1>Divisions</h1>
        <section {...bem('config', null, 'page-content')}>
          <MultiToggle
            label="Display:"
            {...bem('season-or-gameweek')}
            checked={seasonOrGameWeek}
            id={'points-or-stats'}
            onChange={this.toggleSeasonOrGameWeek}
            options={['Season', 'GameWeek']}
          />
        </section>
        {divisions.map((division) => (
          <section className="page-content" key={division.name}>
            <h2>{division.name}</h2>
            <table {...bem('table')} cellPadding={0} cellSpacing={0}>
              <thead>
                <tr>
                  <th>Team</th>
                  {positions.map((pos) => (
                    <th key={pos} colSpan={2}>{positionMapping[pos].label}</th>
                  ))}
                  <th colSpan={2}>Total</th>
                </tr>
              </thead>
              <tbody>
                {division.teams.map((team) => (
                  <tr key={`${team.name}-${team.user.name}`}>
                    <td>{team.name} {team.user.name}</td>
                    {positions.map((pos) => (
                      <Fragment key={`${pos}-${rank}`}>
                        <td key={`${pos}-rank`} {...bem('data', 'rank')}>
                          <span {...bem('point')}>
                            {team[rank][pos]}
                          </span>
                        </td>
                        <td key={`${pos}-points`} {...bem('data', 'points')}>
                          {points === 'gameWeek'
                            ? <AdditionalPoints>{team[points][pos]}</AdditionalPoints>
                            : <span>{team[points][pos]}</span>
                          }
                        </td>
                      </Fragment>
                    ))}
                    <td {...bem('data', 'rank')}>
                      <span {...bem('point')}>
                        {team[rank].points}
                      </span>
                    </td>
                    <td {...bem('data', 'points')}>
                      {points === 'gameWeek'
                        ? <AdditionalPoints>{team[points].points}</AdditionalPoints>
                        : <span>{team[points].points}</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
      </div>
    );
  }
}
