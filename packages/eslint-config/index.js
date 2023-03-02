const { readFileSync } = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8')
);

module.exports = {
  // article followed : https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: ['prettier'],
  extends: [
    'plugin:jest-formatting/recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    // 'turbo', recommended if you want remote caching
  ],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': 'warn',
    'no-await-in-loop': 'error',
    'import/no-named-as-default-member': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '(req|res|next)' },
    ],
    'prettier/prettier': ['error', prettierOptions],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@chatty/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        warnOnUnassignedImports: true,
        alphabetize: {
          order:
            'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
      },
    ],
  },
};
