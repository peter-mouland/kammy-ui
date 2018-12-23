import React from 'react';
import PropTypes from 'prop-types';

import './data-list.scss';

/**
 * default function for matching the current input value (needle) and the values of the items array
 * @param currentInput
 * @param item
 * @returns {boolean}
 */
const match = (currentInput, item) => (
  item.label.substr(0, currentInput.length).toUpperCase() === currentInput.toUpperCase()
);

/**
 * function for getting the index of the currentValue inside a value of the values array
 * @param currentInput
 * @param item
 * @returns {number}
 */
const indexOfMatch = (currentInput, item) => item.label.toUpperCase().indexOf(currentInput.toUpperCase());

class DataListInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      /*  last valid item that was selected from the drop down menu */
      lastValidItem: {},
      /* current input text */
      currentInput: '',
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
    const currentInput = event.target.value;
    const matchingItems = currentInput === '' ? [] : this.props.items.filter((item) => this.props.match(currentInput, item));

    this.setState({
      currentInput,
      searchTerm: currentInput,
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
  onSelect = (selectedItem) => {
    if (this.state.lastValidItem !== undefined && selectedItem.key === this.state.lastValidItem.key) {
      // do not trigger the callback function
      // but still change state to fit new selection
      this.setState({
        currentInput: selectedItem.label,
        visible: false,
        focusIndex: -2,
      });
      return;
    }
    // change state to fit new selection
    this.setState({
      currentInput: selectedItem.label,
      lastValidItem: selectedItem,
      visible: false,
      focusIndex: -2,
    });
    // callback function onSelect
    this.props.onSelect(selectedItem);
  };

  render() {
    const { items, emptyStateMessage } = this.props;
    const {
      currentInput, matchingItems, searchTerm, visible,
    } = this.state;
    const { placeholder, alwaysShowItems } = this.props;
    const inputClassName = alwaysShowItems || visible ? 'datalist datalist--on' : 'datalist';
    const itemsClassName = alwaysShowItems || visible ? 'datalist-items datalist-items--on' : 'datalist-items';
    const itemClassName = 'datalist-item';
    const itemsToShow = matchingItems.length === 0 && currentInput.length === 0 ? items : matchingItems;

    return (
      <div className={inputClassName}>
        <input
          onKeyDown={this.onHandleKeydown}
          onInput={this.onHandleInput}
          type="search"
          className="datalist__input"
          placeholder={placeholder} value={currentInput}/>
        <div className={itemsClassName}>
          {items.length === 0 && emptyStateMessage}
          {(alwaysShowItems || visible) && itemsToShow.map((item, i) => {
            const isActive = this.state.focusIndex === i || currentInput === item.label;
            return (
              <div
                onClick={() => this.onSelect(item)}
                className={isActive ? `${itemClassName} ${itemClassName}--active` : itemClassName}
                key={item.key}
              >
                {/* {item.img && <img src={item.img} className='datalist-item__img' />} */}
                {item.label.substr(0, indexOfMatch(searchTerm, item))}
                <strong>{item.label.substr(indexOfMatch(searchTerm, item), searchTerm.length)}</strong>
                {item.label.substr(indexOfMatch(searchTerm, item) + searchTerm.length)}
              </div>
            );
          })}
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
