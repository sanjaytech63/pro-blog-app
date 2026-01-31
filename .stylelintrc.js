module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
  rules: {
    /* Tailwind / modern CSS */
    'at-rule-no-unknown': null,
    'at-rule-empty-line-before': null,

    /* OKLCH support */
    'color-function-notation': null,
    'lightness-notation': null,
    'hue-degree-notation': null,

    /* CSS variables & Tailwind layers */
    'custom-property-empty-line-before': null,
  },
}
