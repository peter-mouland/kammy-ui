const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: ['./packages/argos-vendor/esnext/argosVendor.js'],
  output: {
    path: path.join(__dirname, 'packages/argos-vendor/dist'),
    filename: 'commonvendor.min.js',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin('packages/argos-vendor/dist')
  ]
}
