let config = {};

const setConfig = () => {
// explicitly check vars so that webpack can help us
  if (process.env.NODE_ENV === 'development') {
    // set dev envs here
    if (typeof process.env.NODE_ENV === 'undefined') { process.env.NODE_ENV = 'development'; }
  }

  // set prod / default env here
  if (typeof process.env.NODE_ENV === 'undefined') { process.env.NODE_ENV = 'production'; }
  if (typeof process.env.DEBUG === 'undefined') { process.env.DEBUG = 'lego:*'; }
  if (typeof process.env.PORT === 'undefined') { process.env.PORT = 3000; }


  if (process.env.NODE_ENV === 'test') {
    // set test envs here
    process.env.DEBUG = false;
  }

  config = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
  };
};

if (Object.keys(config).length === 0) {
  setConfig();
}

module.exports = config;
