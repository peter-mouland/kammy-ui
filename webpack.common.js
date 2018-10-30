/* eslint-disable import/no-dynamic-require, global-require */
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const timestamp = new Date();
const BUILD_TIME = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`;
const devMode = process.env.NODE_ENV !== 'production';

module.exports = (entries) => entries.map(({
  entry, packageName, category, version, context,
}) => ({
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  context,
  externals: [nodeExternals()],
  // always node. yup. This webpack is for compiling solely for the webapp.
  target: 'node', // category === 'server' ? 'node' : 'web',
  entry,
  output: {
    path: context,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    mainFields: ['src', 'browser', 'module', 'main'],
    extensions: ['.mjs', '.js', '.jsx'],
  },
  watch: devMode,
  plugins: [
    // new CleanWebpackPlugin(`packages/${category}/${packageName}/dist`),
    new webpack.HashedModuleIdsPlugin(),
    new ProgressBarPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.BannerPlugin({
      banner: `PACKAGE: ${packageName} | VERSION: ${version} | BUILD_TIME: ${BUILD_TIME}`,
      entryOnly: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [/packages/],
      },
      {
        test: /\.scss$/,
        include: [/packages/],
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
        include: [/packages/],
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: false,
        },
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=../../fonts/[name].[ext]',
      },
    ],
  },
}));
