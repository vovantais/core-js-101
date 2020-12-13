module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    // 'no-plusplus': 0,
    // "array-callback-return": "off",
    // "no-compare-neg-zero": "off",
    // "no-useless-escape": "off",
    // "no-param-reassign": "off",
    // "no-cond-assign": "off",
    // "no-return-assign": "off",
    // "no-tabs": "off",
    // "prefer-spread": "off",
  },
};
