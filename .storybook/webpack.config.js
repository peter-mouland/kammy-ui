const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        use: [
          'style-loader',
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
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ]
};
