import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Select from '@kammy-ui/select';
import bemHelper from '@kammy-ui/bem';
// import PlayersTable from '@kammy-ui/players-table/src/PlayersTable';
// const positions = ['GK', 'CB', 'FB', 'MID', 'AM', 'STR'];

import './teamsPage.scss';

const bem = bemHelper({ block: 'teams-table' });

const keysAsCells = (obj) => (
  Object.keys(obj).map((key) => <td key={key}>{obj[key]}</td>)
);
const keysAsCellHeaders = (obj) => (
  Object.keys(obj).map((key) => <th key={key}>{key}</th>)
);

class TeamsPage extends React.Component {
  state = {
    displayGw: '1',
    seasonStats: null,
    gameWeekStats: null,
  }

  updateDisplayGw = (displayGw) => {
    this.setState({ displayGw });
  }

  render() {
    const { teams, gameWeeks, gwTeams } = this.props;
    const { displayGw } = this.state;
    const intGameWeek = parseInt(displayGw, 10) - 1;
    const previousGameWeek = intGameWeek - 1 > -1 ? intGameWeek - 1 : 0;

    return (
      <div className={bem(null, null, 'page-content')}>
        <h3>Teams</h3>
        <p>
          GameWeek:
          <Select
            options={gameWeeks.map((gw) => gw.gameWeek)}
            defaultValue={displayGw}
            onChange={this.updateDisplayGw}
          />
          <span>{gameWeeks[intGameWeek].start} to {gameWeeks[intGameWeek].end}</span>
        </p>
        <table>
          <thead>
            <tr>
              <th>Team Position</th>
              <th>Code</th>
              <th>Player</th>
              <th>Position</th>
              <th colSpan={12}>GameWeek Score</th>
              <th colSpan={12}>Season Score</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(teams).map((manager) => (
              <Fragment key={manager}>
                <tr>
                  <th colSpan="3">{manager}</th>
                </tr>
                <tr>
                  <th colSpan={4} />
                  {keysAsCellHeaders(gwTeams[manager][0].gameWeeks[0].points)}
                  {keysAsCellHeaders(gwTeams[manager][0].seasonPoints)}
                </tr>
                {gwTeams[manager].map((teamSheetItem) => (
                  <tr
                    key={teamSheetItem.gameWeeks[intGameWeek].name}
                    className={
                      teamSheetItem.gameWeeks[previousGameWeek].name !== teamSheetItem.gameWeeks[intGameWeek].name
                        ? bem('transfer')
                        : null
                    }
                  >
                    <th>{teamSheetItem.teamPos}</th>
                    <td>{teamSheetItem.gameWeeks[intGameWeek].code}</td>
                    <td>{teamSheetItem.gameWeeks[intGameWeek].name}</td>
                    <td>{teamSheetItem.gameWeeks[intGameWeek].pos}</td>
                    {
                      teamSheetItem.gameWeeks[intGameWeek] && (
                        <Fragment>
                          {keysAsCells(teamSheetItem.gameWeeks[intGameWeek].points)}
                          {keysAsCells(teamSheetItem.seasonPoints)}
                        </Fragment>
                      )
                    }
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

TeamsPage.propTypes = {
  gameWeeks: PropTypes.array,
  teams: PropTypes.object,
  gwTeams: PropTypes.object,
};

TeamsPage.defaultProps = {
  gameWeeks: [],
  teams: {},
  gwTeams: {},
};

export default TeamsPage;
