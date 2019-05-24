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
      useESModules: false,
    },
  ],
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-transform-spread',
  '@babel/plugin-transform-arrow-functions',
];

module.exports = pluginsCjs;
