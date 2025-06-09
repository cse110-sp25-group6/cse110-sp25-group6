// eslint.config.js
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import jest from 'eslint-plugin-jest';

export default [
  js.configs.recommended,
  prettier,
  {
    files: ['**/*.js'],
    plugins: {
      jest,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...jest.environments.globals.globals,
        page: 'readonly',
        TrackJS: 'readonly',
      },
    },
    rules: {
      // Add custom rules here
      'no-unused-vars': 'warn',
      'no-console': 'off',
      ...jest.configs.recommended.rules,
    },
  },
];
