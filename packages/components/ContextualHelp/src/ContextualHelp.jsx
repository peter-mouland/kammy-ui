/* eslint-disable id-length */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Bem from '@kammy-ui/bem';

import Caret from './components/Caret';
import Popover from './components/Popover';

import './contextualHelp.scss';

const bem = new Bem({ block: 'contextual-help' });

class ContextualHelp extends PureComponent {
    static propTypes = {
      /** @type {string} title text content of the popover */
      header: PropTypes.string,
      /** @type {string} body text content of the popover */
      body: PropTypes.node,
      /** @type {number} popover width */
      width: PropTypes.number,
      Trigger: PropTypes.node,
    };

    static defaultProps = {
      width: 360,
    };

    /**
     * Calculate distance from element
     * @param element HTMLDivElement
     * @param {number} x
     * @param {number} y
     * @return {number}
     */
    static calculateDistance(element, x, y) {
      return Math.floor(
        Math.sqrt(
          ((x - (element.offsetLeft + (element.clientWidth / 2))) ** 2) +
          ((y - (element.offsetTop + (element.clientHeight / 2))) ** 2),
        ),
      );
    }

    state = {
      isOpen: false,
    };

    componentDidMount() {
      this.calculateBoxPosition();
    }

    componentDidUpdate() {
      this.calculateBoxPosition();
    }

    open = () => {
      this.setState({ isOpen: true, opacity: 1 });
    };

    close = () => {
      this.setState({ isOpen: false, opacity: 0 });
    };

    /**
     * Determine and update the correct position of the popover box so as to ensure it's visibility in the viewport
     */
    calculateBoxPosition = () => {
      if (!this.boxRef) {
        return;
      }

      const containerElement = this.containerRef.getBoundingClientRect();
      const boxElement = this.boxRef.getBoundingClientRect();

      let x = containerElement.width / 2;
      let y = (boxElement.height + containerElement.height) * -1;

      if ((containerElement.x - (this.props.width / 2)) < 0) {
        x = this.props.width / 2;
      } else if ((containerElement.x + (this.props.width / 2)) > window.innerWidth) {
        x = ((this.props.width / 2) * -1) + containerElement.width;
      }

      if (containerElement.y - (boxElement.height + containerElement.height) < 0) {
        y = 0;
      }

      this.setState({ x, y });
    };

    caretXTranslate = () => {
      const { x } = this.state;
      const { width } = this.props;

      if (this.containerRef) {
        const w = this.containerRef.getBoundingClientRect().width / 2;
        if (x < 0) { // off right screen
          return (width / 2) - w;
        } else if (x > w) { // off left screen
          return ((width / 2) * -1) + w;
        }
      }
      return 0;
    };

    render() {
      const { isOpen, x, y } = this.state;
      const {
        body, header, width, Trigger,
      } = this.props;

      const boxStyle = {
        width: `${width}px`,
        left: `${(width / 2) * -1}px`,
        transform: `translate(${x || 0}px, ${y || 0}px)`,
      };

      return (
        <div
          className={bem(null, { active: isOpen })}
          ref={(node) => { this.containerRef = node; }}
          onMouseOver={this.open}
          onMouseLeave={this.close}
        >
          {Trigger}
          <div className={bem('box', { active: isOpen })} style={boxStyle} ref={(node) => { this.boxRef = node; }}>
            <Caret isUp={y >= 0} x={this.caretXTranslate()} />
            <Popover
              header={header}
              body={body}
              hasShadow
            />
          </div>
        </div>
      );
    }
}

export default ContextualHelp;
