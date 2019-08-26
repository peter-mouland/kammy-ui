import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './modal.scss';

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).isRequired,
    open: PropTypes.bool.isRequired,
    wide: PropTypes.bool,
    disableClose: PropTypes.bool,
    disableOverlay: PropTypes.bool,
    focusElement: PropTypes.string,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    style: PropTypes.object,
  }

  static defaultProps = {
    open: false,
    wide: false,
    disableClose: false,
    disableOverlay: false,
    focusElement: null,
    onOpen: () => {},
    onClose: () => {},
  }

  componentDidMount() {
    window.addEventListener('keydown', this.closeModalUsingKey);
  }

  componentDidUpdate(prevProps) {
    if (this.props.open && !prevProps.open) {
      this.openModal();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalUsingKey);
  }

  openModal() {
    this.props.onOpen();
    this.focusOnModalOpen();
    document.body.setAttribute('style', 'overflow: hidden');
  }

  closeModal() {
    this.props.onClose();
    document.body.setAttribute('style', 'overflow: auto');
  }

  closeModalUsingKey = (event) => {
    if (event.keyCode === 27) {
      event.preventDefault();
      event.stopPropagation();
      this.closeModal();
    }
  }

  focusOnModalOpen() {
    const {
      focusElement,
    } = this.props;

    if (!focusElement) {
      this.modal.focus();
    } else {
      const element = this.modal.querySelector(focusElement);
      if (element) element.focus();
    }
  }

  render() {
    const {
      disableClose,
      disableOverlay,
      open,
      id,
      title,
      wide,
      children,
      style,
    } = this.props;

    const className = `modal modal--${open ? 'show' : 'hide'} font-standard modal--${wide ? 'wide' : 'default'}`;
    return open && (
      <div
        id={id}
        ref={(modal) => { this.modal = modal; }}
        onKeyPress={this.closeModalUsingKey}
        className={className}
      >
        <div className='modal__content modal__content--mobile-full' style={style}>
          <div className='modal__header'>
            <div className='modal__title'>
              <h2 className='h2 uppercase'>{title}</h2>
            </div>
            {!disableClose && (
              <button className='modal__close' onClick={() => this.closeModal()}>
              X
              </button>
            )}
          </div>
          <div className='modal__inner'>
            {children}
          </div>
        </div>
        {!disableOverlay && <div className='modal__overlay' onClick={() => this.closeModal()} />}
      </div>
    );
  }
}
