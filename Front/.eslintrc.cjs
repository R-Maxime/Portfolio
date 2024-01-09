module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "airbnb-base/legacy",
  ],
  env: {
    browser: true,
    es2020: true
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true
      },
    ],
  },
}
