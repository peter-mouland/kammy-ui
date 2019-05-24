const defaults = {
  targets: {
    node: '10.0',
  },
  modules: false,
};

module.exports = function babelNodePreset(ctx, config = {}) {
  return {
    presets: [['@babel/preset-env', Object.assign({}, defaults, config)]],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
    ],
  };
};
