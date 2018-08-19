const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ROOT = path.join(process.cwd());
const PACKAGES = path.join(ROOT, 'packages');

const CATEGORIES = ['components', 'global', 'helpers', 'pages', 'redux', 'server'];

const timestamp = new Date();
const BUILD_TIME = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`;

function getPackages(category) {
  const srcPath = path.join(PACKAGES, category);
  return fs.readdirSync(srcPath)
    .filter((file) => fs.lstatSync(path.join(srcPath, file)).isDirectory())
    .map((packageName) => ({ packageName, category }));
}

function getPackagesJson({ packageName, category }) {
  try {
    return require(`./packages/${category}/${packageName}/package.json`);
  } catch (e) {
    return {};
  }
}

function getPackage({ packageName, category }) {
  const pkg = getPackagesJson({ packageName, category });
  return pkg.src || pkg.main;
}

function getPackageInfo({ packageName, category }) {
  const { main, src, version } = getPackagesJson({ packageName, category });
  const file = src || main;
  const fileName = file.replace('src', '').replace(/\.jsx?/, '');
  const name = `${category}/${packageName}/dist${fileName}.min`;
  const entry = { [name]: `${PACKAGES}/${category}/${packageName}/${file}` };
  return {
    entry, packageName, file, category, version,
  };
}

const entries = CATEGORIES
  .reduce((prev, category) => prev.concat(getPackages(category)), [])
  .filter(getPackage)
  .map(getPackageInfo);

module.exports = entries.map(({
  entry, packageName, category, version,
}) => ({
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  context: PACKAGES,
  externals: [nodeExternals()],
  // always node. yup. This webpack is for compiling solely for the webapp.
  target: 'node', // category === 'server' ? 'node' : 'web',
  entry,
  output: {
    path: PACKAGES,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    mainFields: ['src', 'browser', 'module', 'main'],
    extensions: ['.mjs', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(`packages/${category}/${packageName}/dist`),
    new webpack.HashedModuleIdsPlugin(),
    new ProgressBarPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
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
}));
