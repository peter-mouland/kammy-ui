const nodemon = require('nodemon');
const merge = require('webpack-merge');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');
const Router = require('koa-router');

const nodemonConfig = require('./nodemon.json');
const baseConfig = require('./webpack.common');
const { SRC, DIST } = require('./src/config/paths');
require('./src/config/config');

const isHot = true;
const router = new Router();

router.get('*', convert(proxy({ target: 'http://localhost:9090' })));

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      `${SRC}/client-entry.jsx`,
    ],
  },
  output: {
    path: DIST,
    filename: '[name].js',
    publicPath: '/',
  },
  serve: {
    devMiddleware: {
      hot: isHot,
      compress: false,
      watchOptions: {
        aggregateTimeout: 300,
      },
      headers: { 'Access-Control-Allow-Origin': '*' },
      publicPath: '/',
      stats: { colors: true, cached: false },
    },
    port: 3000,
    host: 'localhost',
    clipboard: false,
    hotClient: {
      hot: isHot,
      port: 8081,
    },
    add: async (app, middleware) => {
      await middleware.webpack();
      await middleware.content();
      app.use(router.routes());

      nodemon(nodemonConfig).on('start', () => {
        console.log('start nodemon');
      });
      // workaround for nodemon
      process.once('SIGINT', () => {
        process.exit(0);
      });
    },
  },
});
