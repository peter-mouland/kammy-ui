const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const fs = require('fs')
const path = require('path')
const ROOT = path.join(process.cwd())
const PACKAGES = path.join(ROOT, 'packages')

const timestamp = new Date();
const BUILD_TIME = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`

function getDirectories (srcPath) {
  return fs.readdirSync(srcPath)
    .filter(file => fs.lstatSync(path.join(srcPath, file)).isDirectory())
}
const entries = getDirectories(PACKAGES)
  .filter(package => {
    const meta = require(`./packages/${package}/package.json`);
    const file = meta.esnext || meta.main;
    return (!file)
      ? console.log(`Missing esnext or main from package.json: `, package)
      : true
  })
  .map((package) => {
    const meta = require(`./packages/${package}/package.json`);
    const file = meta.esnext || meta.main;

    // entry
    const isBolt = (String(package) === 'argos-bolt');
    const srcDir =  isBolt ? `src/` : `esnext/`;
    const name = `${package}/dist/${file.replace(srcDir, '').replace(/\.jsx?/, '')}.min`;
    const entry = { [ name ] : `${PACKAGES}/${package}/${file}` };
    if (isBolt) entry['argos-bolt/dist/bolt-compat.min'] = './argos-bolt/src/bolt-compat.jsx';

    return { entry, package, meta }
  })

module.exports = entries.map(({ entry, package, meta }) => ({
  context: PACKAGES,
  externals: { react: true },
  entry,
  output: {
    path: PACKAGES,
    filename: "[name].js",
    libraryTarget: "commonjs2"
  },
  plugins: [
    new CleanWebpackPlugin(`packages/${package}/dist`),
    new ProgressBarPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({ filename: '[name].css?v=[contenthash]', allChunks: true }),
    new Visualizer({ filename: `webpack-stats.html` }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.BannerPlugin({ banner: `PACKAGE: ${String(package)} | VERSION: ${meta.version} | BUILD_TIME: ${BUILD_TIME}`, entryOnly: true })
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
          use: ['css-loader', 'postcss-loader', 'resolve-url-loader', 'sass-loader']
        })
      },
      {
        test: /\.svg$/,
        include: [/packages/],
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: false
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=../../fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    mainFields: ['esnext', 'browser', 'module', 'main'],
    extensions: ['.js', '.jsx'],
  },
}))
