module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  plugins: [],
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    project: ['./tsconfig.json'],
  },
  rules: {},
}
