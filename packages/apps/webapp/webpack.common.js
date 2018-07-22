const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin')

const { SRC, DIST } = require('./src/config/paths');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  context: SRC,
  output: {
    path: DIST,
    filename: '[name]_[hash].js',
    publicPath: '/',
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin('[name]_[hash].css'),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.GA_KEY': JSON.stringify(process.env.GA_KEY),
    }),
    // new CopyWebpackPlugin([
    //   { from: 'assets', to: '.' }
    // ]),
  ],
  resolve: {
    modules: ['node_modules', SRC],
    mainFields: ['src', 'browser', 'module', 'main'],
    extensions: ['.js', '.jsx', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [/src/, /kammy/],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.scss$/,
        include: [/src/, /kammy/],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'resolve-url-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.svg$/,
        include: [/src/, /kammy/],
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
