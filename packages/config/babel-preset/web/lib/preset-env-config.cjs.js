/*
    Browsers as of 9th Jan 2019:
      "android": "4",
      "chrome": "70",
      "edge": "17",
      "firefox": "63",
      "ie": "11",
      "ios": "9",
      "safari": "9"
 */

module.exports = {
  targets: {
    browsers: [
      'last 2 Chrome versions',
      'last 2 Firefox versions',
      'last 2 Edge versions',
      'ie >= 11',
      'safari >= 9',
      'ios_saf >= 9',
      'ie_mob >= 11',
      'Android >= 4',
    ],
  },
  modules: false,
  useBuiltIns: false,
  debug: !!process.env.DEBUG,
};
