const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const timestamp = new Date();
const BUILD_TIME = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`

module.exports = {
  resolve: {
    mainFields: ['src', 'browser', 'module', 'main'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader' },
            'sass-loader'
          ]
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
        loaders: ['url-loader?mimetype=application/font-woff']
      },
      {
        test: /\.(ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: ['file-loader']
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({ banner: `PACKAGE: storybook | BUILD_TIME: ${BUILD_TIME}`, entryOnly: true }),
    new ExtractTextPlugin('static/[name].css')
  ]
}
