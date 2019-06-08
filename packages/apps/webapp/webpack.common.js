const webpack = require('webpack');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const { SRC, STATIC, COMPILED } = require('./src/config/paths');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  context: SRC,
  // always web. yup. This webpack is for compiling solely for the bwoser.
  target: 'web',
  output: {
    path: STATIC,
    filename: '[name]_[chunkhash].js',
    publicPath: '/static/',
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.GA_KEY': JSON.stringify(process.env.GA_KEY),
    }),
    new LoadablePlugin({ filename: path.resolve(COMPILED, 'loadable-stats.json'), writeToDisk: true }),
  ],
  resolve: {
    modules: ['node_modules', SRC],
    mainFields: ['src', 'browser', 'module', 'main'],
    extensions: ['.mjs', '.js', '.jsx', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [/src/],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        include: [/src/],
        use: [
          { loader: MiniCssExtractPlugin.loader, options: {} },
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        include: [/src/],
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: false,
        },
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          'file-loader?name=[name]-[hash].[ext]',
        ],
      },
    ],
  },
};
