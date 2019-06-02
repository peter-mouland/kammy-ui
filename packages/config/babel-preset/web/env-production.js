module.exports = function webProdPreset() {
  return {
    plugins: ['babel-plugin-transform-react-remove-prop-types'],
  };
};
