module.exports = {
  root: true,
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      env: {
        browser: true,
        es2021: true,
        jest: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      settings: {
        'import/resolver': {
          typescript: true,
          node: true,
        },
      },
      plugins: ['@typescript-eslint', 'eslint-plugin-import'],
      rules: {
        '@typescript-eslint/lines-between-class-members': 0,
        'react/react-in-jsx-scope': 0,
        'import/no-named-as-default': 0,
      },
    },
  ],
};
