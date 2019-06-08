const merge = require('webpack-merge');
const Visualizer = require('webpack-visualizer-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const { SRC } = require('./src/config/paths');
const defaultConfig = require('./webpack.common');

const prodConfig = merge(defaultConfig, {
  entry: {
    app: [`${SRC}/client-entry.jsx`],
    polyfills: [`${SRC}/polyfills.js`],
  },
  optimization: {
    splitChunks: {
      // dont split polyfills
      chunks: (chunk) => (chunk.name && chunk.name.indexOf('polyfills') < 0),
      minSize: 0,
    },
  },
  plugins: [
    new AssetsPlugin({ filename: 'compiled/webpack-assets.json' }),
    new Visualizer({
      filename: '../webpack-stats.html',
    }),
    new LoadablePlugin({ filename: '../../loadable-stats.json', writeToDisk: true }),
  ],
});

module.exports = prodConfig;
