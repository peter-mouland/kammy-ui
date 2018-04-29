import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';

import './add-division.scss';

const bem = bemHelper({ block: 'add-division' });

class AddDivisions extends React.Component {
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

  constructor(props) {
    super(props);

    this.state = {
      selectedDivision: null,
      divisions: props.divisions,
    };
  }

  addDivision = () => {
    const division = this.inputs.division.value;
    this.setState((prevState) => ({ divisions: prevState.divisions.concat(division) }));
    // this.onSave()
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

AddDivisions.props = {
  divisions: PropTypes.arrayOf(PropTypes.string),
  onSave: PropTypes.func,
};

AddDivisions.defaultProps = {
  onSave: () => {},
  divisions: [],
};

export default AddDivisions;
