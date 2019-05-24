module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-declaration-use-variable'],
  rules: {
    indentation: 4,
    'color-no-hex': true,
    'no-descending-specificity': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['range-thumb', 'range-track'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export', 'import', 'global', 'local'],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes', 'compose-with', 'text-remove-gap'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['value', 'for', 'mixin', 'define-mixin', 'mixin-content'],
      },
    ],
    'sh-waqar/declaration-use-variable': [['/color/', { ignoreValues: ['currentColor'] }]],
  },
};
