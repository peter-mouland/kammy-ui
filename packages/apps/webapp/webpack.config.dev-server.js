const nodemon = require('nodemon');
const merge = require('webpack-merge');

const nodemonConfig = require('./nodemon.json');
const baseConfig = require('./webpack.common');
const { SRC, DIST } = require('./src/config/paths');

process.env.NODE_ENV = 'development';

require('./src/config/config');

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: {
    app: [
      `${SRC}/client-entry.jsx`,
    ],
  },
  output: {
    path: DIST,
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    port: 3005,
    publicPath: baseConfig.output.publicPath,
    stats: { colors: true },
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 1000,
    },
    proxy: {
      '**': 'http://localhost:5000',
    },
    hot: false,
    overlay: {
      // Shows a full-screen overlay in the browser when there are compiler errors or warnings
      warnings: true, // default false
      errors: true, // default false
    },
    open: true,
    before() {
      process.env.DEV_PORT = 5000;
      nodemonConfig.script = 'src/server-entry.js';
      nodemon(nodemonConfig)
        .on('crash', () => { console.log('CRASH'); })
        .on('exit', () => { console.log('EXIT'); })
        .on('start', () => {
          console.log('start nodemon');
        });
      // workaround for nodemon
      process.once('SIGUSR2', () => {
        // gracefulShutdown(function () {
        process.kill(process.pid, 'SIGUSR2');
        // });
      });
    },
  },
});
