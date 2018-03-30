/* global document */
const util = require('util');
const events = require('events');

let browser;

function loadStory() {
  events.EventEmitter.call(this);
  browser = this.api;
}
util.inherits(loadStory, events.EventEmitter);

loadStory.prototype.complete = function complete({ e, done }) {
  if (e) {
    console.log('e', e);
  }
  this.emit('complete');
  if (typeof done === 'function') {
    done();
  }
};

loadStory.prototype.command = function pageLoadedFn(opts = {}) {
  const {
    selector = 'body', disableAnimations = true, component, story, cookie, done
  } = opts;
  if (opts.knobs) {
    throw Error(`If you would like to change 'knobs' please use 'browser.loadStoryBook()'.`)
  }
  const url = `${browser.globals.TARGET_PATH_IFRAME}?selectedKind=${component}&selectedStory=${story}`;
  const args = [disableAnimations ? ' disable-animations ' : ''];
  function disableAnimationFunction(className) {
    document.body.className += ` ${className}`;
    return document.body.className;
  }

  console.log(`goto ${url}`);

  if (cookie) {
    browser.url(url).setCookie(cookie);
  }

  browser.url(url).waitForElementVisible(selector, 2500)
    .execute(disableAnimationFunction, args, () => {
      this.complete({ done });
    });

  return this;
};

module.exports = loadStory;
