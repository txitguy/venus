module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  plugins: ['import', 'promise', 'compat', 'node'],
  extends: [
    'plugin:promise/recommended',
    'standard'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVestion: 8,
    ecmaFeatures: {
      sourceType: 'module',
      jsx: true
    },
    allowImportExportEverywhere: true
  },
  rules: {
    'promise/always-return': 0,
    'promise/avoid-new': 0,
    'compat/compat': 1,
    'node/no-deprecated-api': 2,
    'node/no-extraneous-require': 0, // Disabling due to node-fs-extra being included as fs-extra
    'node/no-missing-require': 2,
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'curly': 0,
    'space-before-function-paren': 0
  }
}
