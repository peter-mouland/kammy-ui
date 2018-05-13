import React from 'react';
import PropTypes from 'prop-types';
import bemHelper from '@kammy-ui/bem';
import Toggle from '@kammy-ui/toggle';
import MultiToggle from '@kammy-ui/multi-toggle';
import Selector from '@kammy-ui/select';
import sortColumns from '@kammy-ui/sort-columns';

import './players-filters.scss';

const bem = bemHelper({ block: 'players-filters' });
const MY_TEAM = 'My Team';

const setClubs = ({ players = [], myTeam }) => {
  const clubs = new Set();
  players.forEach((player) => clubs.add(player.club));
  const clubsArr = [...clubs.keys()].sort();
  if (myTeam) clubsArr.unshift(MY_TEAM);
  return clubsArr.filter((item) => item);
};

const applyFilters = ({
  nameFilter, posFilter, clubFilter, player, myTeam, showHidden, showOnlyNewPlayers, customFilter, customFilterChecked,
}) => {
  const customFiltered = !customFilter || !customFilterChecked || customFilter.fn(player);
  const nameFiltered = !nameFilter || player.name.toUpperCase().includes(nameFilter.toUpperCase());
  const posFiltered = !posFilter || posFilter === 'all' || (player.pos || '').includes(posFilter);
  const hiddenFiltered = player.isHidden === showHidden;
  const newFiltered = !showOnlyNewPlayers || player.new === showOnlyNewPlayers;
  const clubFiltered = !clubFilter ||
    (clubFilter === MY_TEAM && myTeam && [player.code]) ||
    ((player.club || '').includes(clubFilter));
  return nameFiltered && posFiltered && clubFiltered && hiddenFiltered && newFiltered && customFiltered;
};

export default class PlayersFilters extends React.Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    positions: PropTypes.array.isRequired,
    children: PropTypes.func.isRequired,
    myTeam: PropTypes.object,
    customFilter: PropTypes.object,
    selectedPosition: PropTypes.string,
  };

  static defaultProps = {
    myTeam: null,
    customFilter: null,
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
      customFilterChecked: false,
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

  posFilter = (posFilter) => {
    this.setState({ posFilter });
  }

  customFilter = (e) => {
    this.setState({ customFilterChecked: e.target.checked });
  }

  clubFilter = (clubFilter) => {
    this.setState({ clubFilter });
  }

  nameFilter = (nameFilter) => {
    this.setState({ nameFilter: nameFilter.trim() });
  }

  onFilter = () => {
    const {
      players, myTeam, positions, customFilter,
    } = this.props;
    const {
      posFilter, clubFilter, nameFilter, showHidden, showOnlyNewPlayers, customFilterChecked,
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
        customFilter,
        customFilterChecked,
        myTeam: teamPlayers,
        showHidden,
        showOnlyNewPlayers,
      }))
      .sort(sortColumns(['pos', 'name'], { pos: positions }));
  }

  render() {
    const { customFilter } = this.props;
    const { posFilter, clubFilter, customFilterChecked } = this.state;
    const { clubs, positions } = this.options;

    return (
      <div className={ bem() }>
        <div className={ bem('filters') }>
          <div className={ bem('group')}>
            {customFilter && (
              <div>
                <Toggle
                  label={customFilter.label}
                  id={'custom-filter'}
                  onClick={this.customFilter}
                  checked={customFilterChecked}
                />
              </div>
            )}
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
