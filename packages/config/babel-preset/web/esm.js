const esmPlugins = require('./lib/plugins.esm');
const esmEnvConfig = require('./lib/preset-env-config.esm');

module.exports = function webPreset(ctx, config) {
  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-flow',
      ['@babel/preset-env', Object.assign({}, esmEnvConfig, config)],
    ],
    plugins: esmPlugins,
  };
};
