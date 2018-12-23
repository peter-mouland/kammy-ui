import React from 'react';
import PropTypes from 'prop-types';

import './data-list.scss';

/**
 * default function for matching the current input value (needle) and the values of the items array
 * @param searchTerm
 * @param item
 * @returns {boolean}
 */
const match = (searchTerm, item) => (
  item.label.substr(0, searchTerm.length).toUpperCase() === searchTerm.toUpperCase()
);

/**
 * function for getting the index of the currentValue inside a value of the values array
 * @param searchTerm
 * @param item
 * @returns {number}
 */
const indexOfMatch = (searchTerm, item) => item.label.toUpperCase().indexOf(searchTerm.toUpperCase());

const Item = ({
  item, index, focusIndex, onSelect, searchTerm, selectedItem,
}) => {
  const itemClassName = 'datalist-item';
  const isActive = focusIndex === index || (selectedItem && selectedItem.key === item.key);
  return (
    <div
      onClick={() => onSelect(item)}
      className={isActive ? `${itemClassName} ${itemClassName}--active` : itemClassName}
      key={item.key}
    >
      {/* {item.img && <img src={item.img} className='datalist-item__img' />} */}
      {item.label.substr(0, indexOfMatch(searchTerm, item))}
      <strong>{item.label.substr(indexOfMatch(searchTerm, item), searchTerm.length)}</strong>
      {item.label.substr(indexOfMatch(searchTerm, item) + searchTerm.length)}
      {item.additional}
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({ key: PropTypes.string, label: PropTypes.string }).isRequired,
  selectedItem: PropTypes.shape({ key: PropTypes.string, label: PropTypes.string }).isRequired,
  index: PropTypes.number.isRequired,
  focusIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

class DataListInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      /*  last valid item that was selected from the drop down menu */
      selectedItem: {},
      /* current input text */
      searchTerm: '',
      /* current set of matching items */
      matchingItems: [],
      /* visibility property of the drop down menu */
      visible: props.alwaysShowItems,
      /* index of the currently focused item in the drop down menu */
      focusIndex: -1,
    };
  }

  /**
   * gets called when someone starts to write in the input field
   * @param event
   */
  onHandleInput = (event) => {
    const searchTerm = event.target.value;
    const matchingItems = searchTerm === '' ? [] : this.props.items.filter((item) => this.props.match(searchTerm, item));

    this.setState({
      searchTerm,
      matchingItems,
      focusIndex: -1,
      visible: true,
    });
  };

  /**
   * handle key events
   * @param event
   */
  onHandleKeydown = (event) => {
    // only do something if drop-down div is visible
    if (!this.state.visible) return;
    let currentFocusIndex = this.state.focusIndex;
    if (event.keyCode === 40 || event.keyCode === 9) {
      // If the arrow DOWN key or tab is pressed increase the currentFocus variable:
      currentFocusIndex += 1;
      if (currentFocusIndex >= this.state.matchingItems.length) currentFocusIndex = 0;
      this.setState({
        focusIndex: currentFocusIndex,
      });
      // prevent tab to jump to the next input field if drop down is still open
      event.preventDefault();
    } else if (event.keyCode === 38) {
      // If the arrow UP key is pressed, decrease the currentFocus variable:
      currentFocusIndex -= 1;
      if (currentFocusIndex <= -2) currentFocusIndex = this.state.matchingItems.length - 1;
      this.setState({
        focusIndex: currentFocusIndex,
      });
    } else if (event.keyCode === 13) {
      // Enter pressed, similar to onClickItem
      if (this.state.focusIndex > -2) {
        // Simulate a click on the "active" item:
        const selectedItem = this.state.matchingItems[currentFocusIndex];
        this.onSelect(selectedItem);
      }
    }
  };

  /**
   * onSelect is called onClickItem and onEnter upon an option of the drop down menu
   * does nothing if the key has not changed since the last onSelect event
   * @param selectedItem
   */
  onSelect = (input) => {
    // (this.state.selectedItem !== undefined && selectedItem.key === this.state.selectedItem.key)
    const selectedItem = this.state.selectedItem && input.key === this.state.selectedItem.key ? null : input;
    this.setState({
      selectedItem,
      visible: false,
      focusIndex: -2,
    });

    this.props.onSelect(selectedItem);
  };

  render() {
    const { items, emptyStateMessage } = this.props;
    const {
      matchingItems, searchTerm, visible, selectedItem, focusIndex,
    } = this.state;
    const { placeholder, alwaysShowItems } = this.props;
    const dataListClassName = alwaysShowItems || visible ? 'datalist datalist--on' : 'datalist';
    const itemsClassName = alwaysShowItems || visible ? 'datalist-items datalist-items--on' : 'datalist-items';
    const itemsToShow = matchingItems.length === 0 && searchTerm.length === 0 ? items : matchingItems;

    return (
      <div className={dataListClassName}>
        <input
          onKeyDown={this.onHandleKeydown}
          onChange={this.onHandleInput}
          type="search"
          className="datalist__input"
          placeholder={placeholder} value={searchTerm}/>
        <div className={itemsClassName}>
          {items.length === 0 && emptyStateMessage}
          {selectedItem && searchTerm && !itemsToShow.find((item) => item.key === selectedItem.key) && (
            <Item
              key={selectedItem.key}
              item={selectedItem}
              focusIndex={focusIndex}
              index={0}
              onSelect={this.onSelect}
              searchTerm={searchTerm}
              selectedItem={selectedItem}
            />
          )}
          {(alwaysShowItems || visible) && itemsToShow.map((item, i) => (
            <Item
              key={item.key}
              item={item}
              focusIndex={focusIndex}
              index={i}
              onSelect={this.onSelect}
              searchTerm={searchTerm}
              selectedItem={selectedItem}
            />
          ))}
        </div>
      </div>
    );
  }
}

DataListInput.propTypes = {
  items: PropTypes.array.isRequired,
  emptyStateMessage: PropTypes.node,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  match: PropTypes.func,
  alwaysShowItems: PropTypes.bool,
};

DataListInput.defaultProps = {
  match,
  placeholder: null,
  emptyStateMessage: null,
  alwaysShowItems: false,
};

export default DataListInput;
