const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  resolve: {
    mainFields: ['src', 'browser', 'module', 'main'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [/packages/],
      },
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
    new ExtractTextPlugin('static/[name].css')
  ]
}
