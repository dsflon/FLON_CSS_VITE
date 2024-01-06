module.exports = {
  extends: [
    /**
     * stylelint-config-standard を基本ルールとする
     * @see https://github.com/stylelint/stylelint-config-recommended/blob/master/index.js
     * @see https://github.com/stylelint/stylelint-config-standard/blob/master/index.js
     */
    'stylelint-config-standard',
    /**
     * CSS Modules 対応ルール拡張
     * @see https://github.com/pascalduez/stylelint-config-css-modules
     */
    'stylelint-config-css-modules',
  ],
  rules: {
    /**
     * Possible errors
     * @see https://stylelint.io/user-guide/rules/#possible-errors
     */
    'no-empty-source': null,

    /**
     * Limit language features
     * @see https://stylelint.io/user-guide/rules/#limit-language-features
     */
    'unit-allowed-list': [
      '%',
      'deg',
      'em',
      'fr',
      'px',
      'rem',
      's',
      'vh',
      'vmin',
      'vmax',
      'vw',
    ],
    // base.cssの兼ね合いでトップレベルの要素型セレクターを許可
    'selector-max-type': [
      1,
      {
        // セレクタの直接の子要素としてのみ要素型セレクターを許可
        ignore: ['child'],
        // Custom Property Sets を要素型セレクタと誤判定しないように無視対象に指定
        ignoreTypes: ['/^--.+/'],
      },
    ],
    // ネストは読み手より書き手都合で深くなりがちなので 2 階層までに制限
    'max-nesting-depth': 2,

    /**
     * Stylistic issues
     * @see https://stylelint.io/user-guide/rules/#stylistic-issues
     */
    'font-family-name-quotes': 'always-unless-keyword',
    'function-url-quotes': 'always',
    'string-quotes': 'double',
    'selector-attribute-quotes': 'always',

    'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'define-mixin'] }],

    "selector-id-pattern": null, // idでkebab-case以外も許容
    "selector-class-pattern": null, // classでkebab-case以外も許容
    "keyframes-name-pattern": null, // keyframesでkebab-case以外も許容
  },
};
