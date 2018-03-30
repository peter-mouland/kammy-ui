/* eslint-env browser */
const util = require('util');
const events = require('events');

let browser;

function loadStoryBook() {
  events.EventEmitter.call(this);
  browser = this.api;
}
util.inherits(loadStoryBook, events.EventEmitter);

loadStoryBook.prototype.complete = function complete({ e, done }) {
  if (e) {
    console.log('e', e);
  }
  this.emit('complete');
  if (typeof done === 'function') {
    done();
  }
};

loadStoryBook.prototype.parseKnobs = function parseKnobs(knobs = {}) {
  return (Object.keys(knobs)).map((val) => {
    const uriVal = (Array.isArray(knobs[val]))
      ? `[${knobs[val].map((nestedVal) => JSON.stringify(nestedVal)).join(',')}]`
      : knobs[val]
    return `knob-${val}=${encodeURIComponent(uriVal)}`
  }).join('&')
}

loadStoryBook.prototype.command = function pageLoadedFn(opts = {}) {
  const {
    knobs = {}, disableAnimations = true, selector = 'body',
    component, story, cookie, done
  } = opts;

  const newKnobs = this.parseKnobs(knobs)
  const browerPath = browser.globals.TARGET_PATH_INDEX
  const url = `${browerPath}?${newKnobs}&selectedKind=${component}&selectedStory=${encodeURIComponent(story)}&down=1&full=1&left=0&downPanel=storybooks%2Fstorybook-addon-knobs`
  const args = [disableAnimations ? 'disable-animations' : ''];
  function disableAnimationFunction(className) {
    document.body.className += ` ${className}`
    return document.body.className
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

module.exports = loadStoryBook;
