import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';
import MultiToggle from '@kammy-ui/multi-toggle';
import Selector from '@kammy-ui/select';
import sortColumns from '@kammy-ui/sort-columns';

import './players-filters.scss';

const bem = bemHelper({ block: 'players-filters' });

const setClubs = ({ players = [], myTeam }) => {
  const clubs = new Set();
  players.forEach((player) => clubs.add(player.club));
  const clubsArr = [...clubs.keys()].sort();
  if (myTeam) clubsArr.unshift('My Team');
  return clubsArr;
};

const applyFilters = ({
  nameFilter, posFilter, clubFilter, player, myTeam, showHidden, showOnlyNewPlayers,
}) => {
  const nameFiltered = !nameFilter || player.name.toUpperCase().includes(nameFilter.toUpperCase());
  const posFiltered = !posFilter || posFilter === 'all' || player.pos.toUpperCase().includes(posFilter.toUpperCase());
  const hiddenFiltered = player.isHidden === showHidden;
  const newFiltered = !showOnlyNewPlayers || player.new === showOnlyNewPlayers;
  const clubFiltered = !clubFilter ||
    (clubFilter.toUpperCase() === 'MY TEAM' && myTeam && [player.code]) ||
    (player.club.toUpperCase().includes(clubFilter.toUpperCase()));
  return nameFiltered && posFiltered && clubFiltered && hiddenFiltered && newFiltered;
};

export default class PlayerTable extends React.Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    positions: PropTypes.array.isRequired,
    children: PropTypes.func.isRequired,
    myTeam: PropTypes.object,
    selectedPosition: PropTypes.string,
  };

  static defaultProps = {
    myTeam: null,
    selectedPosition: null,
  };

  options = {
    clubs: [],
    positions: [],
  };

  constructor(props) {
    super(props);
    this.options.clubs = setClubs(props);
    this.options.positions = ['all'].concat(props.positions);
    this.state = {
      showOnlyNewPlayers: false,
      showHidden: false,
      isSaving: false,
      nameFilter: '',
      posFilter: props.selectedPosition || 'all',
      clubFilter: this.options.clubs[0],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.options.clubs = setClubs(nextProps);
    if (nextProps.selectedPosition !== this.state.selectedPosition) {
      this.setState({ posFilter: nextProps.selectedPosition || 'all' });
    }
  }

  posFilter = (e) => {
    this.setState({ posFilter: e.target.value });
  }

  clubFilter = (e) => {
    this.setState({ clubFilter: e.target.value });
  }

  nameFilter = (e) => {
    this.setState({ nameFilter: e.target.value.trim() });
  }

  onFilter = () => {
    const { players, myTeam, positions } = this.props;
    const {
      posFilter, clubFilter, nameFilter, showHidden, showOnlyNewPlayers,
    } = this.state;
    const teamPlayers = myTeam
      ? (Object.keys(myTeam))
        .reduce((prev, curr) => myTeam[curr] &&
          ({ ...prev, [myTeam[curr].code]: { ...myTeam[curr], teamPos: curr } }), {})
      : {};

    return players.filter((player) =>
      applyFilters({
        player,
        nameFilter,
        posFilter,
        clubFilter,
        myTeam: teamPlayers,
        showHidden,
        showOnlyNewPlayers,
      }))
      .sort(sortColumns(['pos', 'name'], { pos: positions }));
  }

  render() {
    const { posFilter, clubFilter } = this.state;
    const { clubs, positions } = this.options;

    return (
      <div className={ bem() }>
        <div className={ bem('filters') }>
          <div className={ bem('group')}>
            <div>
              <MultiToggle
                label="Position:"
                id={'position-filter'}
                onChange={this.posFilter}
                checked={posFilter}
                options={positions}
              />
            </div>
            <div>
              <label htmlFor="name-filter">Player:</label>
              <input
                id="name-filter"
                name="name-filter"
                type="search"
                onChange={this.nameFilter}
                defaultValue=""
              />
            </div>
            <div>
              <label htmlFor="club-filter">Club:</label>
              <Selector
                id="club-filter"
                name="club-filter"
                onChange={this.clubFilter}
                defaultValue={clubFilter}
                options={clubs}
              />
            </div>
          </div>
        </div>
        {this.props.children(this.onFilter())}
      </div>
    );
  }
}
