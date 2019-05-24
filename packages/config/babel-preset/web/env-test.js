module.exports = function webTestPreset() {
  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          targets: {
            node: '10.15.0',
          },
        },
      ],
    ],
    plugins: ['dynamic-import-node'],
  };
};
