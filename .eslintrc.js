module.exports = {
  root: true,
  "env": {
    "node": true,
    "mocha": true
  },
  "globals": {
    "web3": true,
    "assert": true,
    "contract": true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}