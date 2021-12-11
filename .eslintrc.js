module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  plugins: ['react', 'react-perf', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'comma-dangle': ['warn', 'never'],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }]
  },
  globals: {
    React: 'writable'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
