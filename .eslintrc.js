module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-debugger': 'error',
    'no-dupe-keys': 'error',
    'no-dupe-args': 'error',
    'no-duplicate-case': 'error',
    'no-empty': 'error',
    'no-extra-semi': 'error',
    'no-func-assign': 'error',
    'no-obj-calls': 'error',
    'no-sparse-arrays': 'error',
    'no-unreachable': 'error',
    'valid-typeof': 'warn',
    'no-multi-spaces': 'warn',
    'no-with': 'warn',
    'curly': 'warn',
    'no-unused-expressions': 'warn',
    'no-shadow-restricted-names': 'error',
    'no-undefined': 'off',
    'camelcase': 'error',

    'indent': ['error', 2, {
      // continuation indent
      MemberExpression: 'off',
    }],

    'array-bracket-spacing': ['error', 'never'],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': 'error',
    'func-call-spacing': 'error',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'linebreak-style': ['error', 'unix'], // we can check this in git as well
    'new-cap': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'one-var': ['error', {
      var: 'never',
      let: 'never',
      const: 'never'
    }],
    'quotes': ['error', 'single', {allowTemplateLiterals: true}],
    'semi': 'error',
    'space-in-parens': ['error', 'never'],
    'space-before-blocks': 'error',
    'unicode-bom': 'warn',
    'new-parens': 'error',
    'no-nested-ternary': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': ['error', {words: true, nonwords: false}],

    // ES2015
    'constructor-super': 'error',
    'no-this-before-super': 'error',
    'no-var': 'error',
  },
};
