/*
    Browsers as that fully support 'modules'
    https://caniuse.com/#search=modules
*/

module.exports = {
  targets: {
    browsers: ['Chrome >= 61', 'Firefox >= 60', 'Edge >= 17', 'Opera >= 48', 'safari >= 11', 'ios_saf >= 11'],
  },
  modules: false,
  useBuiltIns: false,
  debug: !!process.env.DEBUG,
};
