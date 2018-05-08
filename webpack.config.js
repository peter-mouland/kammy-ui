const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const Visualizer = require('clean-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(process.cwd());
const PACKAGES = path.join(ROOT, 'packages');

// not data-sources as this is serverside only.. not for the web!
const CATEGORIES = ['components', 'global', 'helpers', 'pages', 'authentication', 'redux', 'data-helpers'];

const timestamp = new Date();
const BUILD_TIME = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`;

function getPackages(category) {
  const srcPath = path.join(PACKAGES, category);
  return fs.readdirSync(srcPath)
    .filter((file) => fs.lstatSync(path.join(srcPath, file)).isDirectory())
    .map((packageName) => ({ packageName, category }));
}

function getPackageInfo({ packageName, category }) {
  const { main, src, version } = require(`./packages/${category}/${packageName}/package.json`);
  const file = src || main;
  const fileName = (file || '').replace('src', '').replace(/\.jsx?/, '');
  const name = `${category}/${packageName}/dist${fileName}.min`;
  const entry = { [name]: `${PACKAGES}/${category}/${packageName}/${file}` };
  return { entry, packageName, file, category, version };
}

function removePackagesWithoutPackageJson({ packageName, file }) {
  return (!file)
    ? console.error('Missing src or main from package.json: ', packageName)
    : true;
}

const entries = CATEGORIES
  .reduce((prev, category) => prev.concat(getPackages(category)), [])
  .map(getPackageInfo)
  .filter(removePackagesWithoutPackageJson);

module.exports = entries.map(({ entry, packageName, category, version }) => ({
  context: PACKAGES,
  externals: { react: true },
  entry,
  output: {
    path: PACKAGES,
    filename: '[name].js',
    libraryTarget: packageName === 'vendor' ? 'umd' : 'commonjs2',
  },
  plugins: [
    new CleanWebpackPlugin(`packages/${category}/${packageName}/dist`),
    new webpack.HashedModuleIdsPlugin(),
    new ProgressBarPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    // new Visualizer({ filename: 'webpack-stats.html' }),
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
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'resolve-url-loader', 'sass-loader'],
        }),
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
  resolve: {
    mainFields: ['src', 'browser', 'module', 'main'],
    extensions: ['.js', '.jsx'],
  },
}));
