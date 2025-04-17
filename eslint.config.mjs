import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import json from '@eslint/json';
import { defineConfig, globalIgnores } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  globalIgnores(['package-lock.json', '.expo/*', '.expo-shared/*']),
  { files: ['**/*.{js,mjs,cjs,jsx}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,jsx}'], languageOptions: { globals: globals.browser } },
  { files: ['**/*.{js,mjs,cjs,jsx}'], ...pluginReact.configs.flat.recommended },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    ...stylistic.configs.customize({
      semi: true,
      quoteProps: 'as-needed',
    }),
  },
  { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  {
    rules: {
      'react/prop-types': 'off',
    },
  },
]);
