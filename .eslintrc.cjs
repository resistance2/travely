module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'import'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^/'],
      },
    ],
  },
  ignorePatterns: ['node_modules/', 'build/', 'dist/', '.github', '.tmp', 'index.html', 'server'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.ts', '.tsx'],
        paths: ['src'],
      },
      alias: {
        map: [
          ['@', './src'],
          ['/', './public'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.svg'],
      },
    },
  },
};
