import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';

import './admin-league-page.scss';

const bem = bemHelper({ block: 'admin-league-page' });

class AdminLeaguePage extends React.Component {
  static propTypes = {
    selectedDivision: PropTypes.string,
    divisions: PropTypes.arrayOf(PropTypes.string),
  };

  state = {
    selectedDivision: null,
    divisions: [],
  };

  inputs = {
    division: null,
  };

  addDivision = () => {
    const division = this.inputs.division.value;
    this.setState((prevState) => ({ divisions: prevState.divisions.concat(division) }));
  };

  changeLeague = (league) => {
    this.setState({
      selectedDivision: league,
    });
  };

  render() {
    const { selectedDivision, divisions } = this.state;
    return (
      <div className={bem()} id="teams-page">
        <h1>Divisions</h1>
        <MultiToggle
          id={'divisions'}
          checked={selectedDivision}
          options={divisions}
          onChange={this.changeLeague}
        />
        <input type={'text'} name={'division'} ref={(node) => { this.inputs.division = node; } } />
        <button onClick={this.addDivision}>+ Add Division</button>
      </div>
    );
  }
}

export default AdminLeaguePage;
