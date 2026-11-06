import { defineConfig } from 'react-doctor/api';

export default defineConfig({
  rules: {
    'react-doctor/no-fetch-in-effect': 'warn',
    'react-doctor/no-derived-state': 'warn',
    'react-doctor/react-compiler-no-manual-memoization': 'warn',
    'react-doctor/circular-dependency': 'warn',
    'react-doctor/require-pnpm-hardening': 'warn',
  },
});
