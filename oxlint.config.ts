import { defineConfig } from 'oxlint';
import { NEXTJS_RULES, REACT_COMPILER_RULES, RECOMMENDED_RULES } from 'oxlint-plugin-react-doctor';

// React Doctor skips these when the project has the React Compiler.
// Oxlint does not read `disabledWhen` by itself, so the preset is turned off here.
const offWithReactCompiler = {
  'react-doctor/context-provider-value-from-unmemoized-local-literal': 'off',
  'react-doctor/jsx-no-constructed-context-values': 'off',
  'react-doctor/jsx-no-jsx-as-prop': 'off',
  'react-doctor/jsx-no-new-array-as-prop': 'off',
  'react-doctor/jsx-no-new-function-as-prop': 'off',
  'react-doctor/jsx-no-new-object-as-prop': 'off',
  'react-doctor/no-effect-with-fresh-deps': 'off',
  'react-doctor/no-inline-prop-on-memo-component': 'off',
  'react-doctor/prefer-module-scope-pure-function': 'off',
  'react-doctor/prefer-module-scope-static-value': 'off',
  'react-doctor/prefer-stable-empty-fallback': 'off',
  'react-doctor/rendering-hoist-jsx': 'off',
  'react-doctor/rerender-dependencies': 'off',
  'react-doctor/rerender-memo-with-default-value': 'off',
} as const;

export default defineConfig({
  plugins: ['eslint', 'react', 'unicorn', 'typescript', 'nextjs', 'oxc', 'jsx-a11y', 'vitest'],
  jsPlugins: [
    { name: 'react-doctor', specifier: 'oxlint-plugin-react-doctor' },
    { name: 'react-hooks-js', specifier: 'eslint-plugin-react-hooks' },
  ],
  rules: {
    ...RECOMMENDED_RULES,
    ...NEXTJS_RULES,
    ...REACT_COMPILER_RULES,
    ...offWithReactCompiler,
    // create-next-app enables eslint-config-next/core-web-vitals, which promotes these two to errors.
    'nextjs/no-html-link-for-pages': 'error',
    'nextjs/no-sync-scripts': 'error',
    'react-doctor/no-fetch-in-effect': 'warn',
    'react-doctor/no-derived-state': 'warn',
    'react-doctor/react-compiler-no-manual-memoization': 'warn',
    'react-hooks-js/immutability': 'error',
    'react-hooks-js/refs': 'error',
    // Oxlint 1.79+ runs these in the react plugin under the default correctness category.
    // React Doctor reports the same diagnostics through react-hooks-js.
    'react/error-boundaries': 'off',
    'react/globals': 'off',
    'react/immutability': 'off',
    'react/incompatible-library': 'off',
    'react/preserve-manual-memoization': 'off',
    'react/purity': 'off',
    'react/refs': 'off',
    'react/set-state-in-effect': 'off',
    'react/set-state-in-render': 'off',
    'react/static-components': 'off',
    'react/use-memo': 'off',
    'react/void-use-memo': 'off',
  },
  ignorePatterns: ['node_modules/**', '.next/**', 'dist/**', 'build/**', 'out/**', 'next-env.d.ts'],
  options: {
    typeAware: true,
  },
  settings: {
    'react-doctor': {
      capabilities: ['react-compiler'],
      portedRuleMode: 'curated',
    },
    'jsx-a11y': {
      components: {
        Link: 'a',
      },
    },
  },
});
