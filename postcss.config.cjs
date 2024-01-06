module.exports = {
  plugins: {
    // postcss-import は vite.config で設定しないと効かない
    // 'postcss-import': {},
    'postcss-mixins': {},
    'postcss-preset-env': {
      features: {
        'custom-media-queries': {
          preserve: false,
        },
        'nesting-rules': true,
      },
      // custom-media-queries/custom-properties の preserve オプションはココで指定
      // @see https://github.com/csstools/postcss-preset-env#preserve
      preserve: false,
    },
  },
};
