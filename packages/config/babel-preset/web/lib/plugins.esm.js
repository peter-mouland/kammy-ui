const pluginsCjs = [
  '@loadable/babel-plugin',
  'babel-plugin-macros',
  'babel-plugin-jsx-control-statements',
  '@babel/plugin-syntax-dynamic-import',
  [
    '@babel/plugin-transform-runtime',
    {
      absoluteRuntime: false,
      corejs: false,
      helpers: true,
      regenerator: true,
      useESModules: true,
    },
  ],
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-class-properties',
];

module.exports = pluginsCjs;
