module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'no-array-constructor': 0,
    'require-await': 'off',
    'vue/valid-v-slot': 'off',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }]
  }
}
