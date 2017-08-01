module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  parser: "babel-eslint",
  extends: 'eslint:recommended',
  env: {
    es6: true,
    browser: true
  },
  rules: {
  },
  globals: {
    'Framework7': false,
    'f7App': false,
    'BMap': false,
    'Promise': true
  }
};
