/* eslint-disable no-use-before-define */
const fs = require('fs');
const util = require('util');
const events = require('events');
const png = require('png-crop');
const debug = require('debug');
const resemble = require('node-resemble');
const argv = require('yargs').argv;

const log = debug('compareScreenshot');

const saveDir = argv.saveDir || '';
const compareDir = argv.compareDir || '';

const rootDirectory = './tests/regression/screenshots';
const misMatchPercentage = 0.01;
const getDevicePixelRatio = () => window.devicePixelRatio;

let browser;

function regressionTest() {
  events.EventEmitter.call(this);
  browser = this.api;
}
util.inherits(regressionTest, events.EventEmitter);

regressionTest.prototype.complete = function complete({ e, done }) {
  this.emit('complete');
  if (typeof done === 'function') {
    done();
  }
};

regressionTest.prototype.command = function regressionTest({
  client, selector = 'body', adjust = {}, filename = '', done,
}) {
  if (!selector) throw Error('Missing Selector ! ')
  const mobile = isMobile(client || browser);
  const fullScreen = (mobile === 'android') || (selector === 'body')

  adjust.header = getDeviceHeader(client);// eslint-disable-line no-param-reassign
  if (!adjust.height) {
    adjust.height = 0; // eslint-disable-line no-param-reassign
  }
  if (!adjust.width) {
    adjust.width = 0; // eslint-disable-line no-param-reassign
  }
  if (!adjust.x) {
    adjust.x = 0; // eslint-disable-line no-param-reassign
  }
  if (!adjust.y) {
    adjust.y = 0; // eslint-disable-line no-param-reassign
  }

  const namePrefix = `${filename || selector}`.replace(/\./g, '').replace(/#/g, '');
  const env = testEnvironment(client || browser); // default to browser, but client gives more info!
  const baseImagePath = `${rootDirectory}/${compareDir}/${namePrefix}__${env}.png`;
  const newImagePath = `${rootDirectory}/${saveDir}/${namePrefix}__${env}.png`;

  takeScreenshot(newImagePath)
    .then(() => {
      return fullScreen || cropImage({ newImagePath, selector, adjust });
    })
    .then(() => {
      // if full screen we still need to remove that pesky clock on all mobile devices
      return fullScreen && isMobile(client || browser)
        ? cropToSize({
          source: newImagePath,
          output: newImagePath,
          config: { top: adjust.header, left: 0, height: 1200, width: 767 },
        })
        : Promise.resolve();
    })
    .then(() => {
      return compareDir
        ? compareImages({ baseImagePath, newImagePath, misMatchPercentage })
        : true;
    })
    .then(() => this.complete({ done }))
    .catch(e => this.complete({ e, done }));

  return this;
};

const takeScreenshot = (filepath) => {
  return new Promise((resolve, reject) => {
    return browser
      .saveScreenshot(filepath, (data, err) => {
        if (err) {
          browser.assert.ok(false, `error saving screenshot to file: ${err}`);
          return reject(err);
        }
        return resolve(data);
      });
  });
};

const compareImages = ({ baseImagePath, newImagePath, misMatchPercentage }) => {
  return testImage(baseImagePath, 'Base')
    .then(() => {
      return testImage(newImagePath, 'New')
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        return resemble(baseImagePath)
          .compareTo(newImagePath)
          .ignoreAntialiasing()
          .onComplete((data) => {
            browser.verify.ok(!data.error, `comparison: ${data.error || 'no errors'}`);
            const score = (Number(data.misMatchPercentage));
            if (isNaN(score)) {
              return reject('problem with data.misMatchPercentage : ', data)
            }
            return (score >= misMatchPercentage)
              ? saveDelta({ data, newImagePath }).then(() => resolve(score))
              : resolve(score)
          })
      })
    })
    .then((score) => {
      return browser.verify.ok(score < misMatchPercentage, `comparison check: ${score} should be less than ${misMatchPercentage}`);
    })
    .catch((e) => {
      log(e);
      throw new Error(e);
    });
};

const testImage = (filePath, type = 'base') => new Promise((resolve, reject) => {
  try {
    log(filePath);
    const stat = fs.statSync(filePath);
    browser.assert.ok(true, `${type} image exists: ${filePath}`);
    log(stat);
    return resolve(stat);
  } catch (err) {
    browser.verify.ok(false, `${type} screen-shot does not exist.`);
    return reject(err);
  }
});

const getPixelDensity = (prev = []) => new Promise((resolve) => {
  return browser.execute(getDevicePixelRatio, [], curr => resolve(prev.concat(curr)));
});
const getElementSize = (selector, prev = []) => new Promise((resolve) => {
  return browser.getElementSize(selector, curr => resolve(prev.concat(curr)));
});
const getLocation = (selector, prev = []) => new Promise((resolve) => {
  return browser.getLocationInView(selector, curr => resolve(prev.concat(curr)));
});
const cropToSize = ({ source, output, config }) => new Promise((resolve) => {
  return png.crop(source, output, config, resolve);
});
const calculateNewSize = ({ size, location, pixelDensity, adjust }) => {
  const pixelDensityInt = parseInt(pixelDensity.value, 10) || 1;
  return {
    width: (size.value.width + adjust.width) * pixelDensityInt,
    height: (size.value.height + adjust.height) * pixelDensityInt,
    top: ((location.value.y + adjust.y) * pixelDensityInt) + adjust.header,
    left: (location.value.x + adjust.x) * pixelDensityInt,
  };
};
const saveDelta = ({ data, newImagePath }) => {
  const delta = data.getImageDataUrl();
  const base64Png = delta.replace(/^data:image\/png;base64,/, '');
  const buffer = new Buffer(base64Png, 'base64');
  const deltaFileName = newImagePath.replace('.png', '.delta.png');
  log('deltaFileName', deltaFileName);
  return new Promise((resolve, reject) => {
    return fs.writeFile(deltaFileName, buffer, (err) => (err) ? reject(err) : resolve())
  })
};

const cropImage = ({ newImagePath, selector, adjust }) => {
  // todo: check selector exists
  return getElementSize(selector)
    .then(results => getLocation(selector, results))
    .then(results => getPixelDensity(results))
    .then(([size, location, pixelDensity]) => {
      return calculateNewSize({ size, location, pixelDensity, adjust });
    })
    .then(config => cropToSize({ source: newImagePath, output: newImagePath, config }))
    .catch(e => console.log('e', e));
};

function isMobile(client) {
  const options = client.options.desiredCapabilities;
  const browserName = ((options.browser || options.browserName) || 'any').toLowerCase();
  return browserName === 'iphone' || browserName === 'android'
    ? browserName
    : false;
}

function getDeviceHeader(client) {
  const mobile = isMobile(client || browser);
  let height = 0;
  if (mobile === 'iphone') {
    height = 129;
  } else if (mobile === 'android') {
    height = 107;
  }
  return height;
}

function testEnvironment(client) {
  const options = client.options.desiredCapabilities;
  const platform = options.os
    ? options.os + osVersionToDigit(options.os_version)
    : options.platform;
  const browserName = (options.browser || options.browserName) || 'any';
  const browserVersion = (options.browser_version || options.version) || 'any';
  const normalisedBrowser = normaliseBrowser(browserName) + normaliseBrowser(browserVersion);
  const meta = [platform, normalisedBrowser];
  return meta.join('-').toLowerCase().replace(/ /g, '');
}

function osVersionToDigit(version) {
  switch (version) {
    case 'High Sierra': return '10.13';
    case 'Sierra': return '10.12';
    case 'El Capitan': return '10.11';
    case 'Yosemite': return '10.10';
    case 'Mavericks': return '10.9';
    default: return version;
  }
}

function normaliseBrowser(version) {
  switch (version) {
    case 'MicrosoftEdge': return 'Edge';
    case '13.10586': return '13';
    case '14.14393': return '14';
    case '15.0': return '15';
    default: return version;
  }
}

module.exports = regressionTest;
