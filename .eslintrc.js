module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  parser: 'vue-eslint-parser',
  rules: {
    'no-array-constructor': 1,
    'require-await': 'off',
    'vue/valid-v-slot': 'off',
    'space-before-function-paren': ['error', 'always']
  }
}
