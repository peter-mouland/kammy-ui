/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import './button.scss';

export const STATE = {
  LOADING: 'loading',
  DISABLED: 'disabled',
  SUCCESS: 'success',
  ERROR: 'error',
  NOTHING: '',
};

class ProgressButton extends React.Component {
  static propTypes = {
    classNamespace: PropTypes.string,
    controlled: PropTypes.bool,
    durationError: PropTypes.number,
    durationSuccess: PropTypes.number,
    form: PropTypes.string,
    onClick: PropTypes.func,
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
    state: PropTypes.oneOf(Object.keys(STATE).map((k) => STATE[k])),
    type: PropTypes.string,
    shouldAllowClickOnLoading: PropTypes.bool,
  }

  static defaultProps = {
    classNamespace: 'pb-',
    controlled: false,
    durationError: 1200,
    durationSuccess: 500,
    onClick() {},
    onError() {},
    onSuccess() {},
    shouldAllowClickOnLoading: false,
  }

  state = {
    currentState: this.props.state || STATE.NOTHING,
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.state === this.props.state) { return; }
    switch (nextProps.state) {
    case STATE.SUCCESS:
      this.success();
      break;
    case STATE.ERROR:
      this.error();
      break;
    case STATE.LOADING:
      this.loading();
      break;
    case STATE.DISABLED:
      this.disable();
      break;
    case STATE.NOTHING:
      this.notLoading();
      break;
    default:
    }
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeout);
  }

  handleClick = (e) => {
    if (this.props.controlled) {
      this.props.onClick(e);
      return true;
    }

    if ((this.props.shouldAllowClickOnLoading
      || this.state.currentState !== STATE.LOADING)
      && this.state.currentState !== STATE.DISABLED
    ) {
      this.loading();
      const ret = this.props.onClick(e);
      this.handlePromise(ret);
    } else {
      e.preventDefault();
    }
  }

  handlePromise = (promise) => {
    if (promise && promise.then && promise.catch) {
      promise
        .then(() => {
          this.success();
        })
        .catch((err) => {
          this.error(null, err);
        });
    }
  }

  loading = () => {
    this.setState({ currentState: STATE.LOADING });
  }

  notLoading = () => {
    this.setState({ currentState: STATE.NOTHING });
  }

  enable = () => {
    this.setState({ currentState: STATE.NOTHING });
  }

  disable = () => {
    this.setState({ currentState: STATE.DISABLED });
  }

  success = (callback, dontRemove) => {
    this.setState({ currentState: STATE.SUCCESS });
    this.timeout = setTimeout(() => {
      if (!dontRemove) { this.setState({ currentState: STATE.NOTHING }); }
      callback = callback || this.props.onSuccess;
      if (typeof callback === 'function') { callback(); }
    }, this.props.durationSuccess);
  }

  error = (callback, err) => {
    this.setState({ currentState: STATE.ERROR });
    this.timeout = setTimeout(() => {
      this.setState({ currentState: STATE.NOTHING });
      callback = callback || this.props.onError;
      if (typeof callback === 'function') { callback(err); }
    }, this.props.durationError);
  }

  render = () => {
    const {
      className,
      classNamespace,
      children,
      type,
      form,
      durationError, // eslint-disable-line no-unused-vars
      durationSuccess, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      onError, // eslint-disable-line no-unused-vars
      onSuccess, // eslint-disable-line no-unused-vars
      state, // eslint-disable-line no-unused-vars
      shouldAllowClickOnLoading, // eslint-disable-line no-unused-vars
      controlled, // eslint-disable-line no-unused-vars
      ...containerProps
    } = this.props;

    return (
      <div
        {...containerProps}
        className={`${classNamespace}container ${this.state.currentState} ${className}`}
        onClick={this.handleClick}
      >
        <button disabled={state === STATE.DISABLED} type={type} form={form} className={`${classNamespace}button`}>
          <span>{children}</span>
          <svg className={`${classNamespace}progress-circle`} viewBox='0 0 41 41'>
            <path d='M38,20.5 C38,30.1685093 30.1685093,38 20.5,38' />
          </svg>
          <svg className={`${classNamespace}checkmark`} viewBox='0 0 70 70'>
            <path d='m31.5,46.5l15.3,-23.2' />
            <path d='m31.5,46.5l-8.5,-7.1' />
          </svg>
          <svg className={`${classNamespace}cross`} viewBox='0 0 70 70'>
            <path d='m35,35l-9.3,-9.3' />
            <path d='m35,35l9.3,9.3' />
            <path d='m35,35l-9.3,9.3' />
            <path d='m35,35l9.3,-9.3' />
          </svg>
        </button>
      </div>
    );
  }
}

export default ProgressButton;
