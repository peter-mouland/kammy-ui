const cjsPlugins = require('./lib/plugins.cjs');
const cjsEnvConfig = require('./lib/preset-env-config.cjs');

module.exports = function webPreset(ctx, config) {
  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-flow',
      ['@babel/preset-env', Object.assign({}, cjsEnvConfig, config)],
    ],
    plugins: cjsPlugins,
  };
};
