import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'

/**
 * Built from the individual plugins rather than `compat.extends('next/core-web-vitals')`.
 * `eslint-config-next@15.5.x` is a legacy (eslintrc) config that loads `@rushstack/eslint-patch`,
 * and that patch does not recognise ESLint 9.39 — it throws "Failed to patch ESLint because the
 * calling module was not recognized" before any file is linted. Same rule set, no patch.
 */
const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'web-design/**'],
  },
  js.configs.recommended,
  // Registered unscoped as well: `next build` probes the flat config for `@next/next` and warns
  // "The Next.js plugin was not detected" when it only appears inside a `files`-scoped block.
  { plugins: { '@next/next': nextPlugin } },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        React: 'readonly',
        JSX: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      // Next's JSX transform — no React import needed, and prop types come from TypeScript.
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-undef': 'off',

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'react/no-unescaped-entities': 'error',
    },
  },
]

export default eslintConfig
