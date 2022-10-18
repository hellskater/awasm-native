module.exports = {
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['simple-import-sort', 'prettier'],
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:security/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',
    'prettier',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'no-console': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-vars': 'off',
    'react/display-name': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'jsx-a11y/alt-text': 'off',
    'security/detect-non-literal-fs-filename': 'off',
    '@next/next/no-img-element': 'off',
    'security/detect-object-injection': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off'
  }
};
