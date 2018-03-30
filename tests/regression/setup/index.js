const browserstack = require('browserstack-local');
const Nightwatch = require('nightwatch');

// check to see if multiple process have been started by nightwatch i.e. multiple envs/browsers
const isChildProcess = !!process.argv.find(arg => arg === '--parallel-mode');
const bs_local = new browserstack.Local();
const envIndex = process.argv.findIndex(item => item==='--env');
const isLocal = process.argv[envIndex + 1] === 'local';

const nightwatch = (teardown) => {
  console.log('Starting Nightwatch...');
  Nightwatch.bs_local = bs_local;
  Nightwatch.cli(function(argv) {
    Nightwatch.runner(argv, (passed) => {
      if (!isChildProcess) {
        if (passed !== true){
          console.log(`
            Your tests failed!
            Perhaps run the review server to checkout any visual differences
              * npm run regression:review
          `)
        }
        return teardown().then(disconnect)
      }
    });
  });
}

const connect = () => new Promise((resolve, reject) => {
  if (isLocal) {
    resolve()
  } else {
    console.log('connect to browserStack ...')
    bs_local.start({ key: process.env.BROWSERSTACK_ACCESS_KEY }, (e) => {
      e && reject(e);
      !e && resolve();
    });
  }
});

const disconnect = () => new Promise((resolve, reject) => {
  if (isLocal) {
    resolve()
  } else {
    console.log('stopping browserStack ...')
    bs_local.stop((e) => {
      e && reject(e);
      !e && resolve();
    });
  }
});

module.exports = function({ setup, tearDown }){
  const start = (isChildProcess)
    ? Promise.resolve()
    : setup().then(connect);
  return start.then(() => nightwatch(tearDown))
    .catch(e => {
      if (e.name === 'LocalError'){
        console.log(e);
        console.log(`
          That means BrowserStack failed to shutdown properly last time.
          Find the process, and kill it!
            * lsof -i tcp:45691
        `)
      } else {
        throw(e);
      }
      if (!isChildProcess) {
        return tearDown().then(disconnect);
      }
  });
};
