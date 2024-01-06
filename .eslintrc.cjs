module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base',
  ],
  // ここにカスタムルールを追加します。
  rules: {
    // 最大字数は警告に留める
    'max-len': ['warn'],
    // strict モードは警告に留める
    strict: ['warn', 'safe'],

    'import/no-unresolved': 'off',

    'no-alert': 'warn',
    'no-restricted-globals': 'warn',
    'no-restricted-syntax': 'warn',
    'no-param-reassign': 'warn',
    'no-else-return': 'warn',
    'no-plusplus': 'warn',
    'no-unused-expressions': 'warn',
    'prefer-destructuring': 'warn',
    'no-shadow': 'warn',

    /** standard rules (@nuxtjs/eslint-config の依存関係に eslint-config-standard があるので仕方なく使っているだけ、必要に応じて無効化) */
    'standard/no-callback-literal': ['off'],

    /** airbnb rules */

    // v14.0.0 で有効になったが、 影響範囲広いので対応は後回し
    'max-classes-per-file': ['off'],

    /** import rules */

    // 拡張子指定対象
    'import/extensions': [
      'warn',
      {
        js: 'never',
        json: 'always',
        ts: 'never',
        vue: 'always',
      },
    ],
    // webpack エイリアスで警告を出さない
    'import/no-extraneous-dependencies': [
      'off',
      {
        devDependencies: false, // devDependenciesのimportを禁止
        optionalDependencies: false,
      },
    ],
    // default export を強制すると複数 export するインターフェース変更時に修正箇所が増えるので無効化
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': 'webpack',
  },
};
