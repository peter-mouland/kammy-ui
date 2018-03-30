/*
 * File Purpose: To configure NightWatch to start up dependencies before running tests
 * */
const argv = require('yargs')
  .usage('Usage: $0 --target=[string]')
  .argv

const TARGET_PATH_INDEX = argv.target || 'http://localhost:3210/index.html'
const TARGET_PATH_IFRAME = argv.target || 'http://localhost:3210/iframe.html'
const TARGET_PATH = TARGET_PATH_IFRAME
const branch = process.env.CIRCLE_BRANCH || 'local'

module.exports = (function (settings) {
  settings.test_settings.default.globals = {
    TARGET_PATH,
    TARGET_PATH_INDEX,
    TARGET_PATH_IFRAME,
    // before(done){ /* before tests run */ done() },
    // after(done){  /* after tests run */  done() }
  };
  if (argv.filter) {
    settings.test_settings.default.filter = argv.filter;
  }
  settings.test_settings.default.launch_url = "http://hub.browserstack.com";
  settings.test_settings.default.selenium_host = "hub.browserstack.com";
  settings.test_settings.default.desiredCapabilities['browserstack.local'] = TARGET_PATH.indexOf('://local') > -1;
  settings.test_settings.default.desiredCapabilities['browserstack.user'] = argv.bsuser || process.env.BROWSERSTACK_USERNAME;
  settings.test_settings.default.desiredCapabilities['browserstack.key'] = argv.bskey || process.env.BROWSERSTACK_ACCESS_KEY;
  settings.test_settings.default.desiredCapabilities['build'] = branch;
  return settings;
})(require('./nightwatch.json'));
