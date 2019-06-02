module.exports = function babelConfig(api) {
    api.cache(true);

    return {
      presets: ['@kammy-ui/babel-preset/web/index'],
        env: {
            test: {
                presets: ['@kammy-ui/babel-preset/web/env-test'],
            },
        },
    };
};
