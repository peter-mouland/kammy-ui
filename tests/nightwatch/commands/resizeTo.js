/* global document */
const util = require('util');
const events = require('events');

let browser;

function resizeTo() {
  events.EventEmitter.call(this);
  browser = this.api;
}
util.inherits(resizeTo, events.EventEmitter);

resizeTo.prototype.complete = function complete({ e, done }) {
  if (e) {
    console.log('e', e);
  }
  this.emit('complete');
  if (typeof done === 'function') {
    done();
  }
};

resizeTo.prototype.command = function pageLoadedFn({ size, height, width, done = () => {} }) {
  const target = this.getDimensions({ size, height, width })
  browser
    .resizeWindow(target.width, target.height)
    .getElementSize('body', (result) => (
      browser
        .resizeWindow(target.width + (target.width - result.value.width),
          target.height + (target.height - result.value.height))
    ))
    .perform(() => {
      this.complete({ done })
    })

  return this
};

resizeTo.prototype.getDimensions = function pageLoadedFn({ size, height, width }) {
  switch (size) {
    case 'xs': return { height: 800, width: 320 }
    case 'sm': return { height: 800, width: 576 }
    case 'md': return { height: 800, width: 768 }
    case 'lg': return { height: 800, width: 992 }
    case 'xl': return { height: 800, width: 1200 }
    default:
      if (!height || !width) {
        throw Error(`Unknown size '${size}'.`)
      }
      return { height, width }
  }
};

module.exports = resizeTo;
