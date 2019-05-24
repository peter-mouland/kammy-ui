const defaults = {
  targets: {
    node: '10.0',
  },
};

module.exports = function babelNodePreset(ctx, config = {}) {
  return {
    presets: [['@babel/preset-env', Object.assign({}, defaults, config)]],
  };
};
